import { useState } from "react";
import { CODES, CODE_INCORRECT } from "../config/index.js";
import { jouerSon } from "../audio/audio.js";
import { vibrer } from "../hooks/useVibration.js";
import "./code-entry.css";

export default function CodeEntry({ numero, onValide, onAnnuler }) {
  const [valeur, setValeur] = useState("");
  const [message, setMessage] = useState(null);

  const soumettre = (e) => {
    e.preventDefault();
    const propre = valeur.trim().toUpperCase();
    if (propre === CODES[numero]) {
      jouerSon("sfx-code-ok.mp3");
      vibrer(20);
      onValide();
      return;
    }
    jouerSon("sfx-code-faux.mp3");
    setMessage(CODE_INCORRECT[Math.floor(Math.random() * CODE_INCORRECT.length)]);
  };

  return (
    <div className="code-entry__fond" role="dialog" aria-modal="true">
      <form className="code-entry" onSubmit={soumettre}>
        <h2>Code de l'étape {numero}</h2>
        <input
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
          maxLength={4}
          autoFocus
          autoCapitalize="characters"
          placeholder="XXXX"
        />
        {message && <p className="code-entry__message">{message}</p>}
        <div className="code-entry__actions">
          <button type="submit">Valider</button>
          <button type="button" className="code-entry__annuler" onClick={onAnnuler}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
