import { useState } from "react";
import { CODES, NOMS_JEUX } from "../config/index.js";
import "./test-panel.css";

export default function TestPanel({
  etat,
  peutForcerVictoire,
  onFermer,
  onDebloquerTout,
  onSauterAuJeu,
  onForcerVictoire,
  onRejouerIntro,
  onRejouerFin,
  onRejouerOuverture,
  onReinitialiser,
}) {
  const [voirSauvegarde, setVoirSauvegarde] = useState(false);
  const [voirCodes, setVoirCodes] = useState(false);

  return (
    <div className="test-panel__fond">
      <div className="test-panel">
        <div className="test-panel__entete">
          <h2>🔧 Mode test</h2>
          <button onClick={onFermer}>Fermer</button>
        </div>

        <section>
          <button onClick={onDebloquerTout}>Débloquer toutes les étapes</button>
        </section>

        <section>
          <h3>Sauter à un mini-jeu</h3>
          <div className="test-panel__grille-jeux">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => onSauterAuJeu(n)}>
                {n}. {NOMS_JEUX[n]}
              </button>
            ))}
          </div>
        </section>

        <section>
          <button onClick={onForcerVictoire} disabled={!peutForcerVictoire}>
            Forcer la victoire du jeu en cours
          </button>
          {!peutForcerVictoire && <p className="test-panel__note">(aucun mini-jeu actif en ce moment)</p>}
        </section>

        <section>
          <h3>Rejouer une séquence texte</h3>
          <button onClick={onRejouerOuverture}>Ouverture</button>
          <div className="test-panel__grille-jeux">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="test-panel__paire-sequence">
                <button onClick={() => onRejouerIntro(n)}>Intro {n}</button>
                <button onClick={() => onRejouerFin(n)}>Fin {n}</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <button onClick={() => setVoirCodes((v) => !v)}>
            {voirCodes ? "Cacher" : "Afficher"} les 5 codes IRL
          </button>
          {voirCodes && (
            <ul className="test-panel__codes">
              {Object.entries(CODES).map(([n, code]) => (
                <li key={n}>
                  Étape {n} : <strong>{code}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <button onClick={() => setVoirSauvegarde((v) => !v)}>
            {voirSauvegarde ? "Cacher" : "Voir"} l'état complet de la sauvegarde
          </button>
          {voirSauvegarde && <pre className="test-panel__sauvegarde">{JSON.stringify(etat, null, 2)}</pre>}
        </section>

        <section>
          <button className="test-panel__danger" onClick={onReinitialiser}>
            Tout réinitialiser
          </button>
        </section>
      </div>
    </div>
  );
}
