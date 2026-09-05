import { useEffect, useMemo, useState } from "react";
import { JEU_0, COCKTAILS, REPLIQUES_MAUVAISE_REPONSE } from "../../config/index.js";
import { reponsesCorrespondent } from "../../utils/textNormalize.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import "./jeu0.css";

function auHasard(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

export default function Jeu0({ onVictoire, onEchec }) {
  const cocktail = useMemo(() => auHasard(COCKTAILS), []);
  const [indexIndice, setIndexIndice] = useState(0);
  const [saisie, setSaisie] = useState("");
  const [message, setMessage] = useState(null);
  const [gagne, setGagne] = useState(false);
  const [voileLeve, setVoileLeve] = useState(false);
  const [voileUtilisee, setVoileUtilisee] = useState(false);

  useEffect(() => {
    precharger(["sfx-clic.mp3", "sfx-code-faux.mp3", "sfx-victoire.mp3", "sfx-jeu5-indice.mp3"]);
  }, []);

  const indicesVisibles = cocktail.indices.slice(0, indexIndice + 1);
  const dernierIndice = indexIndice >= cocktail.indices.length - 1;

  const leverLeVoile = () => {
    if (voileUtilisee || gagne) return;
    setVoileUtilisee(true);
    setVoileLeve(true);
    jouerSon("sfx-jeu5-indice.mp3");
    setMessage(JEU_0.REPLIQUE_LEVEE_VOILE);
    setTimeout(() => setVoileLeve(false), JEU_0.DUREE_LEVEE_VOILE * 1000);
  };

  const repondre = (e) => {
    e.preventDefault();
    if (gagne || !saisie.trim()) return;

    if (reponsesCorrespondent(saisie, cocktail.reponse, cocktail.alias)) {
      setGagne(true);
      setMessage(null);
      jouerSon("sfx-victoire.mp3");
      setTimeout(() => onVictoire(), 1500);
      return;
    }

    onEchec();
    jouerSon("sfx-code-faux.mp3");
    const pool = dernierIndice ? REPLIQUES_MAUVAISE_REPONSE.sansIndice : REPLIQUES_MAUVAISE_REPONSE.avecIndices;
    setMessage(auHasard(pool));
    setSaisie("");
    if (!dernierIndice) setIndexIndice((i) => i + 1);
  };

  return (
    <div className="jeu0">
      <p className="jeu0__compteur">
        Indice {indexIndice + 1} / {cocktail.indices.length}
      </p>

      <div className="jeu0__silhouette-zone">
        <img
          className="jeu0__silhouette"
          src={
            gagne || voileLeve
              ? `/assets/images/img-jeu0-${cocktail.id.replace("-", "")}.png`
              : "/assets/images/img-jeu0-silhouette.png"
          }
          alt=""
        />
        {!gagne && (
          <button className="jeu0__coup-oeil" onClick={leverLeVoile} disabled={voileUtilisee}>
            Un coup d'œil
          </button>
        )}
      </div>

      <div className="jeu0__indices">
        {[...indicesVisibles].reverse().map((texte, i) => (
          <p key={indicesVisibles.length - i} className={i === 0 ? "jeu0__indice--recent" : "jeu0__indice--ancien"}>
            {texte}
          </p>
        ))}
      </div>

      {message && <p className="jeu0__message">{message}</p>}

      {!gagne && (
        <form className="jeu0__form" onSubmit={repondre}>
          <input
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            placeholder="Le nom du cocktail…"
            autoCapitalize="none"
          />
          <button type="submit">Répondre</button>
        </form>
      )}
    </div>
  );
}
