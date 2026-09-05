import { useEffect, useRef, useState } from "react";
import { JEU_2, TOURS, REPLIQUES_ERREUR, MESSAGE_SON_COUPE } from "../../config/index.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { asset, styleFondImage } from "../../utils/assetUrl.js";
import "./jeu2.css";

const SONS = ["sfx-bulle-01.mp3", "sfx-bulle-02.mp3", "sfx-bulle-03.mp3", "sfx-bulle-04.mp3"];
const IMAGES_BULLES = [1, 2, 3, 4].map((n) => asset(`assets/images/img-jeu2-bulle-0${n}.png`));

function attendre(ms, enregistrerAnnulation) {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    enregistrerAnnulation(() => clearTimeout(t));
  });
}

export default function Jeu2({ sonActif = true, onActiverSon, onVictoire, onEchec }) {
  const [pretMemeSansSon, setPretMemeSansSon] = useState(sonActif);
  const [sequence] = useState(() =>
    Array.from({ length: JEU_2.LONGUEUR_VICTOIRE }, () => Math.floor(Math.random() * 4))
  );
  const [tourIndex, setTourIndex] = useState(0);
  // 'ecoute' | 'repetition' | 'erreur' | 'pause' | 'victoire'
  const [phase, setPhase] = useState("ecoute");
  const [positionRepetition, setPositionRepetition] = useState(0);
  const [bulleAllumee, setBulleAllumee] = useState(null);
  const [message, setMessage] = useState(null);
  const generationRef = useRef(0);

  useEffect(() => {
    precharger(SONS.concat(["sfx-echec.mp3", "sfx-victoire.mp3"]));
  }, []);

  // Phase d'ecoute : rejoue sequence[0..longueur-1] avec le timing du tour.
  useEffect(() => {
    if (!pretMemeSansSon || phase !== "ecoute") return;
    generationRef.current += 1;
    const gen = generationRef.current;
    let annule = false;
    const nettoyeurs = [];
    const enregistrer = (fn) => nettoyeurs.push(fn);

    (async () => {
      const tour = TOURS[tourIndex];
      await attendre(500, enregistrer);
      for (let i = 0; i < tour.longueur; i++) {
        if (annule || generationRef.current !== gen) return;
        const b = sequence[i];
        setBulleAllumee(b);
        jouerSon(SONS[b]);
        await attendre(tour.dureeAllumage, enregistrer);
        if (annule || generationRef.current !== gen) return;
        setBulleAllumee(null);
        await attendre(tour.pause, enregistrer);
      }
      if (annule || generationRef.current !== gen) return;
      setPositionRepetition(0);
      setPhase("repetition");
    })();

    return () => {
      annule = true;
      nettoyeurs.forEach((fn) => fn());
    };
  }, [tourIndex, phase, pretMemeSansSon, sequence]);

  const taperBulle = (b) => {
    if (phase !== "repetition") return;

    setBulleAllumee(b);
    jouerSon(SONS[b]);
    setTimeout(() => setBulleAllumee(null), 200);

    if (b !== sequence[positionRepetition]) {
      onEchec();
      setMessage(REPLIQUES_ERREUR[Math.floor(Math.random() * REPLIQUES_ERREUR.length)]);
      setPhase("erreur");
      jouerSon("sfx-echec.mp3");
      setTimeout(() => {
        setMessage(null);
        setPhase("ecoute"); // reprise au même tour, même séquence
      }, 1500);
      return;
    }

    const suivant = positionRepetition + 1;
    if (suivant >= TOURS[tourIndex].longueur) {
      if (tourIndex >= TOURS.length - 1) {
        setPhase("victoire");
        jouerSon("sfx-victoire.mp3");
        setTimeout(() => onVictoire(), 1200);
      } else {
        setPhase("pause");
        setTimeout(() => {
          setTourIndex((t) => t + 1);
          setPhase("ecoute");
        }, 800);
      }
    } else {
      setPositionRepetition(suivant);
    }
  };

  if (!pretMemeSansSon) {
    return (
      <div className="jeu2 jeu2--avertissement">
        <p>{MESSAGE_SON_COUPE.texte}</p>
        <div className="jeu2__avertissement-actions">
          <button
            onClick={() => {
              onActiverSon?.();
              setPretMemeSansSon(true);
            }}
          >
            {MESSAGE_SON_COUPE.boutonActiver}
          </button>
          <button className="jeu2__continuer-sans-son" onClick={() => setPretMemeSansSon(true)}>
            {MESSAGE_SON_COUPE.boutonContinuer}
          </button>
        </div>
      </div>
    );
  }

  const controlesActifs = phase === "repetition";

  return (
    <div className="jeu2" style={styleFondImage("assets/images/bg-jeu2.webp")}>
      <p className="jeu2__tour">Tour {tourIndex + 1} / {TOURS.length}</p>

      <div className={`jeu2__bulles ${phase === "erreur" ? "jeu2__bulles--erreur" : ""}`}>
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            className={`jeu2__bulle ${bulleAllumee === i ? "jeu2__bulle--allumee" : ""}`}
            onClick={() => taperBulle(i)}
            disabled={!controlesActifs}
            aria-label={`Bulle ${i + 1}`}
          >
            <img src={IMAGES_BULLES[i]} alt="" />
          </button>
        ))}
      </div>

      {message && <p className="jeu2__message">« {message} »</p>}
      {phase === "ecoute" && <p className="jeu2__indication">Écoute…</p>}
      {phase === "repetition" && <p className="jeu2__indication">À toi</p>}

      <img className="jeu2__verre" src={asset("assets/images/img-jeu2-verre.png")} alt="" />
    </div>
  );
}
