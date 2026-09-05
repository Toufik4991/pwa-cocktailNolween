import { useEffect, useMemo, useState } from "react";
import { JEU_3 } from "../../config/index.js";
import { genererMelange, estResolu } from "./puzzle-logic.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { vibrer } from "../../hooks/useVibration.js";
import "./jeu3.css";

const IMAGE = "/assets/images/img-jeu3-puzzle.webp";

export default function Jeu3({ onVictoire, onAbandon }) {
  const taille = JEU_3.GRILLE_TAILLE;
  const [pieces, setPieces] = useState(() => genererMelange(taille, JEU_3.MELANGE_MIN_ECHANGES));
  const [selection, setSelection] = useState(null);
  const [coups, setCoups] = useState(0);
  const [gagne, setGagne] = useState(false);
  const [voirModele, setVoirModele] = useState(false);
  const [peutAbandonner, setPeutAbandonner] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPeutAbandonner(true), JEU_3.DELAI_BOUTON_ABANDON * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    precharger(["sfx-jeu3-piece.mp3", "sfx-victoire.mp3"]);
  }, []);

  const cliquerPiece = (index) => {
    if (gagne) return;
    if (selection === null) {
      setSelection(index);
      return;
    }
    if (selection === index) {
      setSelection(null);
      return;
    }
    const suivant = pieces.slice();
    [suivant[selection], suivant[index]] = [suivant[index], suivant[selection]];
    setPieces(suivant);
    setSelection(null);
    setCoups((c) => c + 1);
    jouerSon("sfx-jeu3-piece.mp3");
    vibrer(15);
    if (estResolu(suivant)) {
      setGagne(true);
      jouerSon("sfx-victoire.mp3");
      setTimeout(() => onVictoire(), 900);
    }
  };

  const positionFond = (slice) => {
    const col = slice % taille;
    const row = Math.floor(slice / taille);
    const pas = 100 / (taille - 1);
    return `${col * pas}% ${row * pas}%`;
  };

  return (
    <div className="jeu3">
      <div className="jeu3__entete">
        <span>Échanges : {coups}</span>
        <button
          onMouseDown={() => setVoirModele(true)}
          onMouseUp={() => setVoirModele(false)}
          onMouseLeave={() => setVoirModele(false)}
          onTouchStart={() => setVoirModele(true)}
          onTouchEnd={() => setVoirModele(false)}
        >
          Voir le modèle
        </button>
      </div>

      <div className={`jeu3__grille ${gagne ? "jeu3__grille--gagne" : ""}`} style={{ "--taille": taille }}>
        {pieces.map((slice, index) => (
          <button
            key={index}
            className={`jeu3__piece ${selection === index ? "jeu3__piece--selection" : ""}`}
            style={{
              backgroundImage: `url(${IMAGE})`,
              backgroundSize: `${taille * 100}% ${taille * 100}%`,
              backgroundPosition: positionFond(slice),
            }}
            onClick={() => cliquerPiece(index)}
            aria-label={`Pièce en position ${index + 1}`}
          />
        ))}
      </div>

      {voirModele && (
        <div className="jeu3__modele">
          <img src={IMAGE} alt="Image complète du puzzle" />
        </div>
      )}

      {peutAbandonner && !gagne && (
        <button className="jeu3__abandon" onClick={onAbandon}>
          J'abandonne
        </button>
      )}
    </div>
  );
}
