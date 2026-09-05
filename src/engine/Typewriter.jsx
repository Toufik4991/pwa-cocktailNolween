import { useEffect, useMemo, useRef, useState } from "react";

const VITESSE_MS_PAR_CARACTERE = 28;

// Découpe "texte\n\nsuite **gras**" en paragraphes de segments {text, bold},
// pour typer lettre par lettre tout en gérant les paragraphes et le gras.
function parseParagraphes(texte) {
  return texte.split("\n\n").map((paragraphe) => {
    const segments = [];
    const regex = /\*\*(.+?)\*\*/g;
    let curseur = 0;
    let m;
    while ((m = regex.exec(paragraphe))) {
      if (m.index > curseur) segments.push({ text: paragraphe.slice(curseur, m.index), bold: false });
      segments.push({ text: m[1], bold: true });
      curseur = regex.lastIndex;
    }
    if (curseur < paragraphe.length) segments.push({ text: paragraphe.slice(curseur), bold: false });
    return segments;
  });
}

function aplatirEnCaracteres(paragraphes) {
  const chars = [];
  paragraphes.forEach((segments, pIndex) => {
    segments.forEach((segment) => {
      for (const c of segment.text) chars.push({ char: c, bold: segment.bold, pIndex });
    });
  });
  return chars;
}

/**
 * Texte "machine à écrire". Le parent déclenche la complétion immédiate
 * (tap n'importe où) en incrémentant `skipSignal`.
 */
export default function Typewriter({ texte, skipSignal, onTermine }) {
  const chars = useMemo(() => aplatirEnCaracteres(parseParagraphes(texte)), [texte]);
  const [compte, setCompte] = useState(0);
  const termineRef = useRef(false);
  const dernierSkip = useRef(skipSignal);

  useEffect(() => {
    setCompte(0);
    termineRef.current = false;
    if (chars.length === 0) {
      termineRef.current = true;
      onTermine?.();
      return;
    }
    const id = setInterval(() => {
      setCompte((c) => {
        const suivant = c + 1;
        if (suivant >= chars.length) {
          clearInterval(id);
          if (!termineRef.current) {
            termineRef.current = true;
            onTermine?.();
          }
        }
        return suivant;
      });
    }, VITESSE_MS_PAR_CARACTERE);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars]);

  useEffect(() => {
    if (skipSignal !== dernierSkip.current) {
      dernierSkip.current = skipSignal;
      if (!termineRef.current) {
        setCompte(chars.length);
        termineRef.current = true;
        onTermine?.();
      }
    }
  }, [skipSignal, chars.length, onTermine]);

  const visibles = chars.slice(0, compte);
  const paragraphesVisibles = [];
  for (const c of visibles) {
    if (!paragraphesVisibles[c.pIndex]) paragraphesVisibles[c.pIndex] = [];
    const runs = paragraphesVisibles[c.pIndex];
    const dernier = runs[runs.length - 1];
    if (dernier && dernier.bold === c.bold) {
      dernier.text += c.char;
    } else {
      runs.push({ text: c.char, bold: c.bold });
    }
  }

  return (
    <>
      {paragraphesVisibles.map((runs, i) => (
        <p key={i}>
          {runs.map((r, j) => (r.bold ? <strong key={j}>{r.text}</strong> : <span key={j}>{r.text}</span>))}
        </p>
      ))}
    </>
  );
}
