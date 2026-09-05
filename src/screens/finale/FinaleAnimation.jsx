import { useEffect, useState } from "react";
import { INGREDIENTS, SEQUENCES } from "../../config/index.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import Typewriter from "../../engine/Typewriter.jsx";
import "./finale-animation.css";

const ORDRE = [0, 1, 2, 3, 4, 5];
const DELAI_ENTRE_CHUTES_MS = 550;

export default function FinaleAnimation({ pseudo, onRetourHub }) {
  const [nbTombes, setNbTombes] = useState(0);
  const [revele, setRevele] = useState(false);
  const [texteTermine, setTexteTermine] = useState(false);
  const [skipSignal, setSkipSignal] = useState(0);

  const texte = SEQUENCES["finale-ecran"][0].texte.replaceAll("{pseudo}", pseudo || "");

  useEffect(() => {
    precharger(["sfx-deblocage.mp3", "sfx-final.mp3"]);
  }, []);

  useEffect(() => {
    if (nbTombes >= ORDRE.length) {
      const t = setTimeout(() => {
        setRevele(true);
        jouerSon("sfx-final.mp3");
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      jouerSon("sfx-deblocage.mp3");
      setNbTombes((n) => n + 1);
    }, DELAI_ENTRE_CHUTES_MS);
    return () => clearTimeout(t);
  }, [nbTombes]);

  return (
    <div className="finale-animation">
      <div className="finale-animation__verre">
        <img
          src={`/assets/images/${revele ? "img-final-cocktail.png" : "img-final-verre-vide.png"}`}
          alt=""
          className="finale-animation__verre-image"
        />
        {revele && (
          <>
            <img src="/assets/images/img-final-halo.png" alt="" className="finale-animation__halo" />
            <img src="/assets/images/img-final-etincelles.png" alt="" className="finale-animation__etincelles" />
          </>
        )}
      </div>

      <div className="finale-animation__ingredients">
        {ORDRE.map((numero, i) => (
          <img
            key={numero}
            src={`/assets/images/${INGREDIENTS[numero].image}`}
            alt=""
            className={`finale-animation__ingredient ${i < nbTombes ? "finale-animation__ingredient--tombe" : ""}`}
            style={{ animationDelay: `${i * DELAI_ENTRE_CHUTES_MS}ms`, left: `${12 + i * 13}%` }}
          />
        ))}
      </div>

      {revele && (
        <div className="finale-animation__message" onClick={() => setSkipSignal((s) => s + 1)}>
          <Typewriter texte={texte} skipSignal={skipSignal} onTermine={() => setTexteTermine(true)} />
          {texteTermine && (
            <button className="finale-animation__retour" onClick={onRetourHub}>
              Retour au hub
            </button>
          )}
        </div>
      )}
    </div>
  );
}
