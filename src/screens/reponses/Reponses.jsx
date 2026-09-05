import { useGameState } from "../../store/GameContext.jsx";
import { NOMS_JEUX, INGREDIENTS, REPONSES_ETAPE_NON_RESOLUE } from "../../config/index.js";
import "./reponses.css";

function lieuSuivant(numero) {
  // Étape 5 mène directement à la finale : pas de nouveau lieu.
  if (numero >= 5) return null;
  const n = String(numero + 1).padStart(2, "0");
  return `/assets/images/img-lieu-${n}-a.webp`;
}

export default function Reponses({ onRetour }) {
  const { etapes } = useGameState();

  return (
    <div className="reponses">
      <header className="reponses__entete">
        <button onClick={onRetour}>← Retour</button>
        <h1>Réponses</h1>
      </header>

      <div className="reponses__liste">
        {[0, 1, 2, 3, 4, 5].map((numero) => {
          const etape = etapes[numero];
          const resolue = etape.statut === "complete";
          const lieu = lieuSuivant(numero);

          return (
            <div key={numero} className={`reponses__carte ${resolue ? "" : "reponses__carte--verrouillee"}`}>
              {resolue ? (
                <>
                  <h2>
                    {numero}. {NOMS_JEUX[numero]}
                  </h2>
                  {etape.passe && <p className="reponses__mention">Étape passée</p>}
                  <div className="reponses__ingredient">
                    <img src={`/assets/images/${INGREDIENTS[numero].image}`} alt="" />
                    <span>{INGREDIENTS[numero].nom}</span>
                  </div>
                  {lieu && (
                    <div className="reponses__lieu">
                      <img src={lieu} alt={`Lieu à retrouver pour l'étape ${numero + 1}`} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span className="reponses__cadenas">🔒</span>
                  <p>{REPONSES_ETAPE_NON_RESOLUE}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
