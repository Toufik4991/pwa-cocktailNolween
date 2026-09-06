import { useEffect, useState } from "react";
import {
  JEU_4,
  COMMENTAIRES_PENDANT_PARTIE,
  COMMENTAIRE_ERREUR_VOLONTAIRE,
  COMMENTAIRES_JOUEUR_GAGNANT,
  COMMENTAIRE_VICTOIRE_MIXAPERO,
  INDICES_STRATEGIE,
} from "../../config/index.js";
import { jouerTourMixapero } from "./nim.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { asset } from "../../utils/assetUrl.js";
import "./jeu4.css";

const IMAGE_CANNE = asset("assets/images/img-jeu4-canne.png");

function auHasard(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

function indicePourPartie(numeroPartie) {
  if (numeroPartie < JEU_4.PARTIE_DEBUT_INDICES) return null;
  const i = Math.min(numeroPartie - JEU_4.PARTIE_DEBUT_INDICES, INDICES_STRATEGIE.length - 1);
  return INDICES_STRATEGIE[i];
}

export default function Jeu4({ partieDepart = 1, onVictoire, onEchec }) {
  const [numeroPartie, setNumeroPartie] = useState(partieDepart);
  const [cannes, setCannes] = useState(JEU_4.NOMBRE_CANNES_DEPART);
  const [tour, setTour] = useState(JEU_4.JOUEUR_COMMENCE ? "joueur" : "mixapero");
  const [tourMixapero, setTourMixapero] = useState(0);
  const [selection, setSelection] = useState([]);
  const [commentaire, setCommentaire] = useState(null);
  const [indiceVisible, setIndiceVisible] = useState(indicePourPartie(partieDepart) !== null);
  const [phase, setPhase] = useState("jeu"); // 'jeu' | 'victoire' | 'defaite'
  const [reflexion, setReflexion] = useState(false);

  useEffect(() => {
    precharger(["sfx-jeu4-canne.mp3", "sfx-victoire.mp3", "sfx-echec.mp3"]);
  }, []);

  useEffect(() => {
    if (tour !== "mixapero" || phase !== "jeu") return;
    setReflexion(true);
    const delai = JEU_4.DELAI_REFLEXION_MIN + Math.random() * (JEU_4.DELAI_REFLEXION_MAX - JEU_4.DELAI_REFLEXION_MIN);
    const t = setTimeout(() => {
      const numero = tourMixapero + 1;
      const coup = jouerTourMixapero(cannes, numero);
      const restant = cannes - coup;

      if (numero === JEU_4.TOUR_ERREUR_VOLONTAIRE) {
        setCommentaire(COMMENTAIRE_ERREUR_VOLONTAIRE);
      } else if ((cannes - 1) % 4 === 0) {
        setCommentaire(auHasard(COMMENTAIRES_JOUEUR_GAGNANT));
      } else {
        setCommentaire(auHasard(COMMENTAIRES_PENDANT_PARTIE));
      }

      setCannes(restant);
      setTourMixapero(numero);
      setReflexion(false);
      jouerSon("sfx-jeu4-canne.mp3");

      if (restant <= 0) {
        setPhase("victoire");
        jouerSon("sfx-victoire.mp3");
        setTimeout(() => onVictoire(), 1200);
      } else {
        setTour("joueur");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, delai);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour, phase]);

  const basculerSelection = (i) => {
    if (tour !== "joueur" || phase !== "jeu") return;
    setSelection((sel) => {
      if (sel.includes(i)) return sel.filter((x) => x !== i);
      if (sel.length >= JEU_4.RETRAIT_MAX) return sel;
      return [...sel, i];
    });
  };

  const retirer = () => {
    if (selection.length === 0) return;
    setIndiceVisible(false);
    const restant = cannes - selection.length;
    setCannes(restant);
    setSelection([]);
    jouerSon("sfx-jeu4-canne.mp3");
    if (restant <= 0) {
      setCommentaire(COMMENTAIRE_VICTOIRE_MIXAPERO);
      setPhase("defaite");
      jouerSon("sfx-echec.mp3");
      onEchec();
    } else {
      setTour("mixapero");
    }
  };

  const rejouer = () => {
    const nouvelleValeur = numeroPartie + 1;
    setNumeroPartie(nouvelleValeur);
    setCannes(JEU_4.NOMBRE_CANNES_DEPART);
    setTour(JEU_4.JOUEUR_COMMENCE ? "joueur" : "mixapero");
    setTourMixapero(0);
    setSelection([]);
    setCommentaire(null);
    setIndiceVisible(indicePourPartie(nouvelleValeur) !== null);
    setPhase("jeu");
  };

  const indiceTexte = indicePourPartie(numeroPartie);

  return (
    <div className="jeu4">
      <p className="jeu4__compteur">
        {phase === "jeu"
          ? `${cannes} canne${cannes > 1 ? "s" : ""} — ${tour === "joueur" ? "à toi de jouer" : "tour de Mixapéro"}`
          : phase === "victoire"
            ? "Mixapéro a pris la dernière !"
            : "Tu as pris la dernière…"}
      </p>

      {indiceVisible && indiceTexte && tour === "joueur" && phase === "jeu" && (
        <p className="jeu4__indice">{indiceTexte}</p>
      )}

      <div className="jeu4__cannes">
        {Array.from({ length: cannes }, (_, i) => (
          <button
            key={i}
            className={`jeu4__canne ${selection.includes(i) ? "jeu4__canne--selection" : ""}`}
            onClick={() => basculerSelection(i)}
            aria-label={`Canne ${i + 1}`}
          >
            <img src={IMAGE_CANNE} alt="" />
          </button>
        ))}
      </div>

      {reflexion && <p className="jeu4__reflexion">Mixapéro réfléchit…</p>}
      {commentaire && <p className="jeu4__commentaire">« {commentaire} »</p>}

      {phase === "jeu" && tour === "joueur" && (
        <button className="jeu4__retirer" onClick={retirer} disabled={selection.length === 0}>
          Retirer ({selection.length})
        </button>
      )}

      {phase === "defaite" && (
        <button className="jeu4__rejouer" onClick={rejouer}>
          Rejouer
        </button>
      )}

      <p className="jeu4__regle">1, 2 ou 3 cannes. Celui qui prend la dernière perd.</p>
    </div>
  );
}
