import { asset } from "../utils/assetUrl.js";
import "./etape-button.css";

const LIBELLES_ETAT = {
  verrouille: "Verrouillé",
  disponible: "Disponible",
  complete: "Terminé",
};

export default function EtapeButton({ numero, statut, nom, onClick }) {
  return (
    <button
      type="button"
      className={`etape-bouton etape-bouton--${statut}`}
      onClick={onClick}
      aria-label={`Étape ${numero} — ${nom} — ${LIBELLES_ETAT[statut]}`}
    >
      <img src={asset(`assets/images/img-bouton-jeu${numero}.png`)} alt="" />
      <span className="etape-bouton__numero">{numero}</span>
      {statut === "complete" && <span className="etape-bouton__badge">✓</span>}
      {statut === "verrouille" && <span className="etape-bouton__badge">🔒</span>}
    </button>
  );
}
