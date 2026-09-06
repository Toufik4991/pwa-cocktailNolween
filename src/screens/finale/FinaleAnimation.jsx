import { useEffect, useRef, useState } from "react";
import { INGREDIENTS, SEQUENCES } from "../../config/index.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { asset } from "../../utils/assetUrl.js";
import { mouvementReduit } from "../../utils/reducedMotion.js";
import Typewriter from "../../engine/Typewriter.jsx";
import "./finale-animation.css";

const ORDRE = [0, 1, 2, 3, 4, 5];
const DELAI_ENTRE_CHUTES_MS = 550;

export default function FinaleAnimation({ pseudo, onRetourHub }) {
  const [nbTombes, setNbTombes] = useState(0);
  const [revele, setRevele] = useState(false);
  const [texteTermine, setTexteTermine] = useState(false);
  const [skipSignal, setSkipSignal] = useState(0);
  const [flashActif, setFlashActif] = useState(false);
  const [secousseCle, setSecousseCle] = useState(0);
  const [eclats, setEclats] = useState([]); // gerbes d'étincelles transitoires, une par impact
  const reduitRef = useRef(false);
  const idEclatRef = useRef(0);

  const texte = SEQUENCES["finale-ecran"][0].texte.replaceAll("{pseudo}", pseudo || "");

  useEffect(() => {
    reduitRef.current = mouvementReduit();
  }, []);

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
      // L'intensité monte avec chaque ingrédient : discret au 1er,
      // éclatant au 6e (§I, 06/09/2026).
      const intensite = (nbTombes + 1) / ORDRE.length;
      if (!reduitRef.current) {
        setFlashActif(true);
        setTimeout(() => setFlashActif(false), 150);
        setSecousseCle((k) => k + 1);
      }
      const id = idEclatRef.current++;
      setEclats((liste) => [
        ...liste,
        { id, gauche: 20 + Math.random() * 60, intensite, cle: `${id}-${nbTombes}` },
      ]);
      setTimeout(() => setEclats((liste) => liste.filter((e) => e.id !== id)), 700);
      setNbTombes((n) => n + 1);
    }, DELAI_ENTRE_CHUTES_MS);
    return () => clearTimeout(t);
  }, [nbTombes]);

  return (
    <div className="finale-animation">
      {flashActif && <div className="finale-animation__flash" aria-hidden="true" />}

      <div key={secousseCle} className={`finale-animation__secousse ${secousseCle > 0 ? "finale-animation__secousse--active" : ""}`}>
        <div className="finale-animation__verre">
          {revele && (
            <>
              <div className="finale-animation__halo" aria-hidden="true" />
              <div className="finale-animation__rayons" aria-hidden="true" />
            </>
          )}
          <img
            src={asset(`assets/images/${revele ? "img-final-cocktail.png" : "img-final-verre-vide.png"}`)}
            alt=""
            className="finale-animation__verre-image"
          />
          {revele && (
            <>
              <div className="finale-animation__eclat" aria-hidden="true" />
              <img
                src={asset("assets/images/img-final-etincelles.png")}
                alt=""
                className="finale-animation__etincelles"
              />
              <img
                src={asset("assets/images/img-final-etincelles.png")}
                alt=""
                className="finale-animation__etincelles finale-animation__etincelles--2"
              />
              <div className="finale-animation__pluie" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="finale-animation__goutte" style={{ "--i": i }} />
                ))}
              </div>
            </>
          )}
        </div>

        {eclats.map((e) => (
          <span
            key={e.cle}
            className="finale-animation__impact-eclats"
            style={{ left: `${e.gauche}%`, "--intensite": e.intensite }}
          />
        ))}
      </div>

      <div className="finale-animation__ingredients">
        {ORDRE.map((numero, i) => (
          <img
            key={numero}
            src={asset(`assets/images/${INGREDIENTS[numero].image}`)}
            alt=""
            className={`finale-animation__ingredient ${i < nbTombes ? "finale-animation__ingredient--tombe" : ""}`}
            style={{ animationDelay: `${i * DELAI_ENTRE_CHUTES_MS}ms`, left: `${4 + i * 17}%` }}
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
