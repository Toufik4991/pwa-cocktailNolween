import { useEffect, useState } from "react";
import {
  JEU_0,
  COCKTAILS,
  REPLIQUES_MAUVAISE_REPONSE,
  REPLIQUES_TRANSITION_COCKTAIL,
  REPLIQUE_VICTOIRE_JEU_0,
} from "../../config/index.js";
import { reponsesCorrespondent } from "../../utils/textNormalize.js";
import { precharger, jouerSon, jouerMusique } from "../../audio/audio.js";
import { asset } from "../../utils/assetUrl.js";
import "./jeu0.css";

function auHasard(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

function melanger(liste) {
  const copie = liste.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// §B4, 17/09/2026 : le cocktail à réponse libre (reponseLibre) ne doit
// jamais tomber en 1re position (la joueuse croirait le jeu cassé avant
// d'en avoir compris les règles) ni en dernière (l'étape se terminerait
// sur une réponse acceptée d'office au lieu d'une vraie victoire). Les
// autres cocktails se répartissent aléatoirement sur les positions
// restantes. Générique : ne dépend pas de l'ordre ou du nombre de
// cocktails marqués reponseLibre (aucun s'il n'y en a pas).
function construireOrdre(cocktails) {
  const indices = cocktails.map((_, i) => i);
  const indexContraint = cocktails.findIndex((c) => c.reponseLibre);
  if (indexContraint === -1 || cocktails.length < 3) return melanger(indices);

  const autres = melanger(indices.filter((i) => i !== indexContraint));
  const positionsAutorisees = [];
  for (let p = 1; p < cocktails.length - 1; p++) positionsAutorisees.push(p);
  const position = auHasard(positionsAutorisees);

  const ordre = autres;
  ordre.splice(position, 0, indexContraint);
  return ordre;
}

// §C1, 06/09/2026 : les 5 cocktails sont à trouver un par un, dans un
// ordre aléatoire tiré à chaque partie (annule l'ancienne règle "un seul
// cocktail suffit"). §C2 : la silhouette détourée a été retirée (rendu
// raté) et jamais remplacée. §C3 : le bouton "Un coup d'œil" montre
// maintenant la vraie image du cocktail en cours, brièvement, une fois
// par cocktail.
export default function Jeu0({ onVictoire, onEchec }) {
  const [ordre] = useState(() => construireOrdre(COCKTAILS));
  const [position, setPosition] = useState(0);
  const [indexIndice, setIndexIndice] = useState(0);
  const [saisie, setSaisie] = useState("");
  const [message, setMessage] = useState(null);
  const [phase, setPhase] = useState("jeu"); // 'jeu' | 'transition' | 'victoire'
  const [replique, setReplique] = useState(null);
  const [indiceUtilise, setIndiceUtilise] = useState(false);
  const [apercuMonte, setApercuMonte] = useState(false);
  const [apercuOpaque, setApercuOpaque] = useState(false);
  const [compteARebours, setCompteARebours] = useState(0);

  const cocktail = COCKTAILS[ordre[position]];
  const dernierCocktail = position >= ordre.length - 1;

  useEffect(() => {
    jouerMusique("jeu");
  }, []);

  useEffect(() => {
    precharger(["sfx-clic.mp3", "sfx-code-faux.mp3", "sfx-code-ok.mp3", "sfx-victoire.mp3", "sfx-jeu5-indice.mp3"]);
  }, []);

  // Fait défiler le compte à rebours de l'aperçu, puis le masque (fondu
  // géré en CSS via la classe --visible).
  useEffect(() => {
    if (!apercuMonte) return;
    if (compteARebours <= 0) {
      setApercuOpaque(false);
      const t = setTimeout(() => setApercuMonte(false), JEU_0.FONDU_VOILE);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCompteARebours((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [apercuMonte, compteARebours]);

  const indicesVisibles = cocktail.indices.slice(0, indexIndice + 1);
  const dernierIndice = indexIndice >= cocktail.indices.length - 1;

  const declencherApercu = () => {
    if (indiceUtilise || phase !== "jeu") return;
    setIndiceUtilise(true);
    jouerSon("sfx-jeu5-indice.mp3");
    setCompteARebours(JEU_0.DUREE_LEVEE_VOILE);
    setApercuMonte(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setApercuOpaque(true)));
  };

  const passerAuSuivant = () => {
    setPosition((p) => p + 1);
    setIndexIndice(0);
    setSaisie("");
    setMessage(null);
    setIndiceUtilise(false);
    setApercuMonte(false);
    setApercuOpaque(false);
    setPhase("jeu");
  };

  const repondre = (e) => {
    e.preventDefault();
    if (phase !== "jeu") return;
    if (!cocktail.reponseLibre && !saisie.trim()) return;

    // §B1, 17/09/2026 : reponseLibre accepte toute saisie, y compris vide,
    // comme correcte — il n'y a pas de vraie réponse à trouver ici.
    const correct = cocktail.reponseLibre || reponsesCorrespondent(saisie, cocktail.reponse, cocktail.alias);

    if (correct) {
      const texteReplique = cocktail.repliqueValidation ?? auHasard(REPLIQUES_TRANSITION_COCKTAIL);
      setMessage(null);
      if (dernierCocktail) {
        jouerSon("sfx-victoire.mp3");
        setReplique(REPLIQUE_VICTOIRE_JEU_0);
        setPhase("victoire");
      } else {
        jouerSon("sfx-code-ok.mp3");
        setReplique(texteReplique);
        setPhase("transition");
      }
      return;
    }

    onEchec();
    jouerSon("sfx-code-faux.mp3");
    const pool = dernierIndice ? REPLIQUES_MAUVAISE_REPONSE.sansIndice : REPLIQUES_MAUVAISE_REPONSE.avecIndices;
    setMessage(auHasard(pool));
    setSaisie("");
    if (!dernierIndice) setIndexIndice((i) => i + 1);
  };

  // §B3, 17/09/2026 : l'encart reste affiché jusqu'au clic de la joueuse,
  // pour les 5 cocktails (y compris le dernier) — plus d'enchaînement
  // automatique par minuteur, seul ce bouton déclenche la suite.
  if (phase === "transition" || phase === "victoire") {
    return (
      <div className="jeu0 jeu0--transition">
        <img className="jeu0__transition-mixapero" src={asset("assets/images/img-mixapero-content.png")} alt="Mixapéro" />
        <p className="jeu0__transition-texte">{replique}</p>
        <button className="jeu0__transition-suivant" onClick={phase === "victoire" ? onVictoire : passerAuSuivant}>
          {phase === "victoire" ? "Terminer" : "Suivant"}
        </button>
      </div>
    );
  }

  return (
    <div className="jeu0">
      <p className="jeu0__compteur">
        Cocktail {position + 1} / {ordre.length}
      </p>
      <p className="jeu0__sous-compteur">
        Indice {indexIndice + 1} / {cocktail.indices.length}
      </p>

      {!cocktail.sansApercu && (
        <button className="jeu0__coup-oeil" onClick={declencherApercu} disabled={indiceUtilise || phase !== "jeu"}>
          Un coup d'œil
        </button>
      )}

      <div className="jeu0__indices">
        {[...indicesVisibles].reverse().map((texte, i) => (
          <p key={indicesVisibles.length - i} className={i === 0 ? "jeu0__indice--recent" : "jeu0__indice--ancien"}>
            {texte}
          </p>
        ))}
      </div>

      {message && <p className="jeu0__message">{message}</p>}

      {phase === "jeu" && (
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

      {apercuMonte && (
        <div className={`jeu0__apercu ${apercuOpaque ? "jeu0__apercu--visible" : ""}`}>
          <img src={asset(`assets/images/${cocktail.image}`)} alt={cocktail.reponse} />
          <span className="jeu0__apercu-compte">{compteARebours}</span>
        </div>
      )}
    </div>
  );
}
