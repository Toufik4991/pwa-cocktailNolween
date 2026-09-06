import { useEffect, useRef, useState } from "react";
import { GLACANT } from "../config/index.js";
import { asset } from "../utils/assetUrl.js";
import { mouvementReduit } from "../utils/reducedMotion.js";
import "./glacant-cameo.css";

// Apparition furtive du Glaçant pendant les jeux 0/1/2/3 (§H, 06/09/2026).
// img-glacant-01 et 02 sont RIGOUREUSEMENT à la même taille/position (voir
// scripts/process_assets.py, process_glacant_pair) : les superposer et ne
// changer que l'opacité de la seconde crée l'animation "les yeux
// bougent" sans le moindre saut.
const COINS = ["haut-gauche", "haut-droite", "bas-gauche", "bas-droite"];

export default function GlacantCameo({ numeroJeu }) {
  const actif = GLACANT.ACTIF_SUR.includes(numeroJeu);
  const [phase, setPhase] = useState("attente"); // attente | depart | anime | retour | fini
  const [variante, setVariante] = useState(null); // 'coin' | 'balayage'
  const [coin, setCoin] = useState(null);
  const [yeuxVisibles, setYeuxVisibles] = useState(false);
  const reduitMouvementRef = useRef(false);

  useEffect(() => {
    reduitMouvementRef.current = mouvementReduit();
  }, []);

  // Pas de ref "déjà programmé" ici : en StrictMode (dev), React monte,
  // nettoie puis remonte les effets une fois pour détecter les bugs — un
  // tel garde-fou empêcherait alors TOUJOURS la 2e planification (le
  // useRef survit au cycle synthétique), et le Glaçant n'apparaîtrait
  // plus jamais en dev. Le retour de nettoyage ci-dessous suffit à garantir
  // une seule apparition par vrai montage (= une fois par partie).
  useEffect(() => {
    if (!actif) return;

    const timers = [];
    const programmer = (ms, fn) => timers.push(setTimeout(fn, ms));

    const delaiDepart = (GLACANT.DELAI_MIN + Math.random() * (GLACANT.DELAI_MAX - GLACANT.DELAI_MIN)) * 1000;

    programmer(delaiDepart, () => {
      const v = Math.random() < 0.5 ? "coin" : "balayage";
      setVariante(v);
      setCoin(COINS[Math.floor(Math.random() * COINS.length)]);
      setPhase("depart"); // monté hors-écran, sans transition

      // Double rAF : laisse le navigateur peindre la position "hors
      // écran" avant de déclencher la transition vers la position
      // suivante, sinon la 1ère frame est déjà animée (pas de saut visible).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("anime"));
      });

      if (reduitMouvementRef.current) {
        // Accessibilité : simple fondu, jamais de glissement.
        programmer(50, () => setYeuxVisibles(true));
        programmer(50 + GLACANT.DUREE_YEUX, () => setYeuxVisibles(false));
        programmer(50 + GLACANT.DUREE_YEUX + 50, () => setPhase("retour"));
        programmer(50 + GLACANT.DUREE_YEUX + 50 + 400, () => setPhase("fini"));
        return;
      }

      if (v === "balayage") {
        // Traversée unique de 900ms (gauche -> droite), yeux à mi-parcours.
        programmer(450, () => setYeuxVisibles(true));
        programmer(900, () => setPhase("fini"));
        return;
      }

      // Variante "coin" : entrée 600ms -> immobile -> yeux 1000ms ->
      // immobile 400ms -> sortie 800ms (séquence exacte du §H).
      const finEntree = 600;
      const debutYeux = finEntree + 150;
      const finYeux = debutYeux + GLACANT.DUREE_YEUX;
      const debutSortie = finYeux + 400;
      programmer(debutYeux, () => setYeuxVisibles(true));
      programmer(finYeux, () => setYeuxVisibles(false));
      programmer(debutSortie, () => setPhase("retour"));
      programmer(debutSortie + 800, () => setPhase("fini"));
    });

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actif]);

  if (!actif || phase === "attente" || phase === "fini") return null;

  const classes = [
    "glacant-cameo",
    `glacant-cameo--${variante}`,
    variante === "coin" ? `glacant-cameo--${coin}` : "",
    `glacant-cameo--phase-${phase}`,
    reduitMouvementRef.current ? "glacant-cameo--reduit" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <img className="glacant-cameo__image" src={asset("assets/images/img-glacant-01.png")} alt="" />
      <img
        className="glacant-cameo__image glacant-cameo__image--yeux"
        src={asset("assets/images/img-glacant-02.png")}
        alt=""
        style={{ opacity: yeuxVisibles ? 1 : 0 }}
      />
    </div>
  );
}
