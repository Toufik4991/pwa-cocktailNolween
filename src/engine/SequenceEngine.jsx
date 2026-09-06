import { useEffect, useMemo, useState } from "react";
import { DECORS } from "../config/index.js";
import { asset } from "../utils/assetUrl.js";
import { jouerMusique } from "../audio/audio.js";
import Typewriter from "./Typewriter.jsx";
import "./sequence-engine.css";

function substituerPseudo(texte, pseudo) {
  return texte.replaceAll("{pseudo}", pseudo || "");
}

/**
 * Rejoue un tableau d'écrans {decor, expression, texte}. Le dernier écran
 * affiche `libelleBoutonFinal` au lieu de "Suivant" et appelle
 * `onTerminee` plutôt que d'avancer. `onQuitter` ramène au hub à tout
 * moment sans compter la séquence comme terminée.
 */
export default function SequenceEngine({ ecrans, pseudo, libelleBoutonFinal = "Suivant", onTerminee, onQuitter }) {
  const [index, setIndex] = useState(0);
  const [texteTermine, setTexteTermine] = useState(false);
  const [skipSignal, setSkipSignal] = useState(0);

  useEffect(() => {
    jouerMusique("hub");
  }, []);

  const ecran = ecrans[index];
  const dernierEcran = index === ecrans.length - 1;
  const texte = useMemo(() => substituerPseudo(ecran.texte, pseudo), [ecran.texte, pseudo]);

  const completerOuAvancer = () => {
    if (!texteTermine) {
      setSkipSignal((s) => s + 1);
      return;
    }
    if (dernierEcran) {
      onTerminee();
    } else {
      setIndex((i) => i + 1);
      setTexteTermine(false);
    }
  };

  const passerToutLaSequence = () => {
    onTerminee();
  };

  return (
    <div
      className="sequence"
      style={{ backgroundColor: DECORS[ecran.decor] }}
      onClick={() => !texteTermine && setSkipSignal((s) => s + 1)}
    >
      <button className="sequence__quitter" onClick={(e) => { e.stopPropagation(); onQuitter(); }}>
        Quitter
      </button>
      <button className="sequence__passer" onClick={(e) => { e.stopPropagation(); passerToutLaSequence(); }} aria-label="Passer toute la séquence">
        »
      </button>

      <img
        key={ecran.expression}
        className="sequence__mixapero"
        src={asset(`assets/images/img-mixapero-${ecran.expression}.png`)}
        alt="Mixapéro"
      />

      <div className="sequence__bloc-texte">
        <Typewriter texte={texte} skipSignal={skipSignal} onTermine={() => setTexteTermine(true)} />
      </div>

      <button
        className="sequence__suivant"
        onClick={(e) => {
          e.stopPropagation();
          completerOuAvancer();
        }}
      >
        {dernierEcran ? libelleBoutonFinal : "Suivant"}
      </button>
    </div>
  );
}
