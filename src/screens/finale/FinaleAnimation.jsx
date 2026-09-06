import { useEffect, useRef, useState } from "react";
import { INGREDIENTS, SEQUENCES } from "../../config/index.js";
import { precharger, jouerSon, jouerMusique } from "../../audio/audio.js";
import { asset } from "../../utils/assetUrl.js";
import { mouvementReduit } from "../../utils/reducedMotion.js";
import Typewriter from "../../engine/Typewriter.jsx";
import "./finale-animation.css";

// Réécriture complète (§D, 06/09/2026 soir) selon le déroulé en 3 phases
// imposé : chute lente des 6 ingrédients un par un avec impact/secousse/
// niveau qui monte, puis transformation (grossissement + flashs + gerbe
// d'étincelles + flash plein écran), puis le texte seul sur fond calme.
const ORDRE = [0, 1, 2, 3, 4, 5];
const DUREE_CHUTE_MS = 1200;
const PAUSE_ENTRE_INGREDIENTS_MS = 400;
const DUREE_CROISSANCE_MS = 2000;
const FLASH_DELAI_INITIAL_MS = 420;
const FLASH_DELAI_MIN_MS = 90;
const FLASH_FACTEUR_ACCELERATION = 0.72;

export default function FinaleAnimation({ pseudo, onRetourHub }) {
  const [phase, setPhase] = useState("chute"); // 'chute' | 'transformation' | 'texte'
  const [rondeActuelle, setRondeActuelle] = useState(0); // quel ingrédient tombe (0-5), 6 = tous tombés
  const [niveauImpacts, setNiveauImpacts] = useState(0); // nb d'impacts déjà survenus (niveau du liquide + intensité)
  const [secousseCle, setSecousseCle] = useState(0);
  const [amplitudeSecousse, setAmplitudeSecousse] = useState(0);
  const [eclats, setEclats] = useState([]); // gerbes d'étincelles transitoires, une par impact
  const [flashActif, setFlashActif] = useState(false);
  const [flashPlein, setFlashPlein] = useState(false);
  const [verreVisible, setVerreVisible] = useState(true);
  const [grandit, setGrandit] = useState(false);
  const [texteTermine, setTexteTermine] = useState(false);
  const [skipSignal, setSkipSignal] = useState(0);
  const reduitRef = useRef(false);
  const idEclatRef = useRef(0);

  const texte = SEQUENCES["finale-ecran"][0].texte.replaceAll("{pseudo}", pseudo || "");
  const niveauLiquide = Math.min(1, niveauImpacts / ORDRE.length);

  useEffect(() => {
    jouerMusique("final");
  }, []);

  useEffect(() => {
    reduitRef.current = mouvementReduit();
  }, []);

  useEffect(() => {
    precharger(["sfx-deblocage.mp3", "sfx-final.mp3"]);
  }, []);

  const declencherFlash = () => {
    if (reduitRef.current) return;
    setFlashActif(true);
    setTimeout(() => setFlashActif(false), 160);
  };

  // ---- Phase 1 : les 6 ingrédients tombent un par un ----
  useEffect(() => {
    if (phase !== "chute" || rondeActuelle >= ORDRE.length) return;

    const tImpact = setTimeout(() => {
      jouerSon("sfx-deblocage.mp3");
      // L'intensité (secousse + étincelles) monte avec chaque ingrédient :
      // discret au 1er, éclatant au 6e.
      const intensite = (rondeActuelle + 1) / ORDRE.length;
      if (!reduitRef.current) {
        setAmplitudeSecousse(intensite);
        setSecousseCle((k) => k + 1);
      }
      const id = idEclatRef.current++;
      setEclats((liste) => [...liste, { id, gauche: 42 + Math.random() * 16, intensite }]);
      setTimeout(() => setEclats((liste) => liste.filter((e) => e.id !== id)), 700);
      setNiveauImpacts((n) => n + 1);
    }, DUREE_CHUTE_MS);

    const tSuivant = setTimeout(() => {
      setRondeActuelle((r) => r + 1);
    }, DUREE_CHUTE_MS + PAUSE_ENTRE_INGREDIENTS_MS);

    return () => {
      clearTimeout(tImpact);
      clearTimeout(tSuivant);
    };
  }, [phase, rondeActuelle]);

  useEffect(() => {
    if (phase === "chute" && rondeActuelle >= ORDRE.length) {
      setPhase("transformation");
    }
  }, [phase, rondeActuelle]);

  // ---- Phase 2 : grossissement + flashs de plus en plus rapprochés ----
  useEffect(() => {
    if (phase !== "transformation") return;
    setGrandit(true);

    if (reduitRef.current) {
      // prefers-reduced-motion : garde l'enchaînement, retire flashs/secousses.
      const t = setTimeout(() => {
        setVerreVisible(false);
        setPhase("texte");
      }, DUREE_CROISSANCE_MS);
      return () => clearTimeout(t);
    }

    let annule = false;
    const timeouts = [];
    let delai = FLASH_DELAI_INITIAL_MS;
    let ecoule = 0;

    function prochainFlash() {
      if (annule) return;
      declencherFlash();
      ecoule += delai;
      delai = Math.max(FLASH_DELAI_MIN_MS, delai * FLASH_FACTEUR_ACCELERATION);
      if (ecoule < DUREE_CROISSANCE_MS) {
        timeouts.push(setTimeout(prochainFlash, delai));
      } else {
        // Pic d'intensité : flash plein écran, le verre disparaît.
        timeouts.push(
          setTimeout(() => {
            jouerSon("sfx-final.mp3");
            setFlashPlein(true);
            setVerreVisible(false);
            // Le flash plein écran doit disparaître avec son animation
            // (500ms) : sans ce reset, il reste opaque à l'écran pour
            // toujours et masque le texte de fin qui arrive juste après.
            timeouts.push(setTimeout(() => setFlashPlein(false), 500));
            timeouts.push(setTimeout(() => setPhase("texte"), 500));
          }, 150)
        );
      }
    }
    timeouts.push(setTimeout(prochainFlash, delai));

    return () => {
      annule = true;
      timeouts.forEach(clearTimeout);
    };
  }, [phase]);

  return (
    <div className="finale-animation">
      {flashActif && <div className="finale-animation__flash" aria-hidden="true" />}
      {flashPlein && <div className="finale-animation__flash finale-animation__flash--plein" aria-hidden="true" />}

      {phase !== "texte" && (
        <div key={secousseCle} className={`finale-animation__secousse ${secousseCle > 0 ? "finale-animation__secousse--active" : ""}`} style={{ "--amplitude": amplitudeSecousse }}>
          {verreVisible && (
            <div className={`finale-animation__verre ${grandit ? "finale-animation__verre--grandit" : ""}`}>
              <img
                src={asset("assets/images/img-final-verre-vide.png")}
                alt=""
                className="finale-animation__verre-image"
              />
              <img
                src={asset("assets/images/img-final-cocktail.png")}
                alt=""
                className="finale-animation__verre-image finale-animation__verre-image--plein"
                style={{ clipPath: `inset(${(1 - niveauLiquide) * 100}% 0 0 0)` }}
              />
            </div>
          )}

          {phase === "transformation" && (
            <div className="finale-animation__pluie" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className="finale-animation__goutte" style={{ "--i": i }} />
              ))}
            </div>
          )}

          {eclats.map((e) => (
            <span
              key={e.id}
              className="finale-animation__impact-eclats"
              style={{ left: `${e.gauche}%`, "--intensite": e.intensite }}
            />
          ))}

          {phase === "chute" && rondeActuelle < ORDRE.length && (
            <img
              key={rondeActuelle}
              src={asset(`assets/images/${INGREDIENTS[rondeActuelle].image}`)}
              alt=""
              className="finale-animation__ingredient-tombant"
            />
          )}
        </div>
      )}

      {phase === "texte" && (
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
