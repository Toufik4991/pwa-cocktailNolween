// 3 musiques (05/09/2026, soir) : mus-hub (accueil/pseudo/hub/séquences
// texte/Réponses), mus-jeu (les 6 mini-jeux), mus-final (animation finale
// uniquement). Une seule piste audible à la fois, crossfade entre elles.
// mus-hub et mus-jeu tournent en continu en arrière-plan et ne redémarrent
// jamais ; mus-final repart du début à chaque lancement de l'animation.
import { useEffect, useRef } from "react";
import { asset } from "../utils/assetUrl.js";
import { AUDIO } from "../config/index.js";

const FICHIERS = {
  hub: "assets/audio/mus-hub.mp3",
  jeu: "assets/audio/mus-jeu.mp3",
  final: "assets/audio/mus-final.mp3",
};

const elements = {};
const volumesCibles = { hub: 0, jeu: 0, final: 0 };
const idsAnimation = {};
let sonActif = true;

function obtenirElement(nom) {
  if (!elements[nom]) {
    const el = new Audio(asset(FICHIERS[nom]));
    el.loop = true;
    el.volume = 0;
    elements[nom] = el;
    // new Audio() ne s'insère pas dans le DOM (normal) : ce crochet ne sert
    // qu'à inspecter l'état réel depuis les tests automatisés.
    if (import.meta.env.DEV) {
      window.__musiqueDebug = () =>
        Object.fromEntries(
          Object.entries(elements).map(([n, e]) => [n, { volume: e.volume, paused: e.paused, currentTime: e.currentTime }])
        );
    }
  }
  return elements[nom];
}

function appliquerVolume(nom, dureeMs) {
  const el = obtenirElement(nom);
  const cibleEffective = sonActif ? volumesCibles[nom] : 0;
  const depart = el.volume;
  const debut = performance.now();
  if (idsAnimation[nom]) cancelAnimationFrame(idsAnimation[nom]);

  if (dureeMs <= 0) {
    el.volume = Math.min(1, Math.max(0, cibleEffective));
    return;
  }

  function etape(t) {
    const progres = Math.min(1, (t - debut) / dureeMs);
    // HTMLMediaElement.volume lève une erreur si la valeur sort de [0, 1] :
    // l'arrondi flottant de l'interpolation peut légèrement déborder.
    const valeur = depart + (cibleEffective - depart) * progres;
    el.volume = Math.min(1, Math.max(0, valeur));
    idsAnimation[nom] = progres < 1 ? requestAnimationFrame(etape) : null;
  }
  idsAnimation[nom] = requestAnimationFrame(etape);
}

/** Démarre les 3 pistes en silence, prêtes à être révélées par fondu. */
export function demarrerMusiques() {
  const lancerToutes = () => {
    for (const nom of Object.keys(FICHIERS)) obtenirElement(nom).play().catch(() => {});
  };
  lancerToutes();
  window.addEventListener(
    "pointerdown",
    () => {
      lancerToutes();
    },
    { once: true }
  );
  volumesCibles.hub = AUDIO.VOLUME_MUSIQUE_NORMAL;
  appliquerVolume("hub", 0);
}

export function definirSonActifMusique(actif) {
  sonActif = actif;
  for (const nom of Object.keys(FICHIERS)) appliquerVolume(nom, 300);
}

/**
 * Rend une piste seule audible (les 2 autres redescendent à 0 en même
 * temps). `redemarrer` remet la piste à 0:00 avant de la faire remonter
 * (utilisé pour mus-final à chaque lancement de l'animation).
 */
function activerPisteSeule(nom, volume, dureeMs, redemarrer = false) {
  if (redemarrer) {
    const el = obtenirElement(nom);
    el.currentTime = 0;
  }
  for (const autre of Object.keys(FICHIERS)) {
    volumesCibles[autre] = autre === nom ? volume : 0;
    appliquerVolume(autre, dureeMs);
  }
}

/**
 * `numeroJeuActif` = numéro du mini-jeu en cours (phase "jeu"), sinon
 * null. `enAnimationFinale` = true seulement pendant l'animation finale
 * elle-même (pas pendant les 2 écrans de dialogue qui la précèdent, qui
 * restent sur mus-hub comme toute séquence texte).
 */
export function useMusiqueSelonEcran(numeroJeuActif, enAnimationFinale) {
  const derniereCible = useRef(null); // 'hub' | 'jeu' | 'final'
  const etaitJeu2 = useRef(false);

  useEffect(() => {
    if (enAnimationFinale) {
      const redemarrer = derniereCible.current !== "final";
      activerPisteSeule("final", AUDIO.VOLUME_MUSIQUE_NORMAL, AUDIO.FONDU_VOLUME_MS, redemarrer);
      derniereCible.current = "final";
      etaitJeu2.current = false;
      return;
    }

    if (numeroJeuActif === 2) {
      activerPisteSeule("jeu", AUDIO.VOLUME_MUSIQUE_JEU2, AUDIO.FONDU_SORTIE_JEU2_MS);
      derniereCible.current = "jeu";
      etaitJeu2.current = true;
      return;
    }

    if (numeroJeuActif != null) {
      const duree = etaitJeu2.current ? AUDIO.FONDU_ENTREE_JEU2_MS : AUDIO.FONDU_VOLUME_MS;
      activerPisteSeule("jeu", AUDIO.VOLUME_MUSIQUE_JEU, duree);
      derniereCible.current = "jeu";
      etaitJeu2.current = false;
      return;
    }

    // Hub, séquences texte, Réponses, accueil, pseudo.
    activerPisteSeule("hub", AUDIO.VOLUME_MUSIQUE_NORMAL, AUDIO.FONDU_VOLUME_MS);
    derniereCible.current = "hub";
    etaitJeu2.current = false;
  }, [numeroJeuActif, enAnimationFinale]);
}
