// Musique de fond unique (mus-hub), jouée en continu depuis le lancement
// de l'app : jamais redémarrée, jamais mise en pause. Seul son volume est
// animé en fondu selon l'écran (voir AUDIO dans src/config/index.js).
// Singleton volontaire : une seule piste pour toute l'app, pas une par
// composant.
import { useEffect, useRef } from "react";
import { asset } from "../utils/assetUrl.js";
import { AUDIO } from "../config/index.js";

let audioEl = null;
let sonActif = true;
let volumeCible = 0;
let idAnimation = null;

function obtenirAudio() {
  if (!audioEl) {
    audioEl = new Audio(asset("assets/audio/mus-hub.mp3"));
    audioEl.loop = true;
    audioEl.volume = 0;
    // new Audio() ne s'insère pas dans le DOM (comportement normal) : ce
    // crochet ne sert qu'à pouvoir inspecter l'état réel depuis les tests
    // (Playwright n'a sinon aucun moyen d'observer une variable de module).
    if (import.meta.env.DEV) {
      window.__musiqueDebug = () => ({ volume: audioEl.volume, paused: audioEl.paused, currentTime: audioEl.currentTime });
    }
  }
  return audioEl;
}

function appliquerVolume(dureeMs) {
  const el = obtenirAudio();
  const cibleEffective = sonActif ? volumeCible : 0;
  const depart = el.volume;
  const debut = performance.now();
  if (idAnimation) cancelAnimationFrame(idAnimation);

  if (dureeMs <= 0) {
    el.volume = cibleEffective;
    return;
  }

  function etape(t) {
    const progres = Math.min(1, (t - debut) / dureeMs);
    // HTMLMediaElement.volume lève une erreur si la valeur sort de [0, 1],
    // contrairement à CSS qui clamperait tout seul : l'arrondi flottant de
    // l'interpolation peut produire ex. -0.0058 juste avant la fin du fondu.
    const valeur = depart + (cibleEffective - depart) * progres;
    el.volume = Math.min(1, Math.max(0, valeur));
    idAnimation = progres < 1 ? requestAnimationFrame(etape) : null;
  }
  idAnimation = requestAnimationFrame(etape);
}

export function demarrerMusique() {
  const el = obtenirAudio();
  const lancer = () => el.play().catch(() => {});
  lancer();
  // iOS/Chrome bloquent la lecture avant toute interaction : on retente
  // au premier tap, sans jamais redémarrer la piste (currentTime intact).
  const relancerAuTap = () => {
    lancer();
    window.removeEventListener("pointerdown", relancerAuTap);
  };
  window.addEventListener("pointerdown", relancerAuTap, { once: true });

  volumeCible = AUDIO.VOLUME_MUSIQUE_NORMAL;
  appliquerVolume(AUDIO.FONDU_VOLUME_MS);
}

export function definirSonActifMusique(actif) {
  sonActif = actif;
  appliquerVolume(300);
}

/**
 * Applique le bon niveau de volume pour l'écran courant du hub.
 * `numeroJeuActif` = numéro du mini-jeu si on est en phase "jeu",
 * sinon null/undefined (hub, séquences, réponses, finale -> volume normal).
 * Le jeu 2 a des durées de fondu différentes (400 ms en entrant, 800 ms en
 * sortant) et un silence total, pas juste une baisse.
 */
export function useMusiqueSelonEcran(numeroJeuActif) {
  const etaitJeu2 = useRef(false);

  useEffect(() => {
    const estJeu2 = numeroJeuActif === 2;

    if (estJeu2) {
      volumeCible = AUDIO.VOLUME_MUSIQUE_JEU2;
      appliquerVolume(AUDIO.FONDU_SORTIE_JEU2_MS);
      etaitJeu2.current = true;
      return;
    }

    const niveau = numeroJeuActif != null ? AUDIO.VOLUME_MUSIQUE_JEU : AUDIO.VOLUME_MUSIQUE_NORMAL;
    const duree = etaitJeu2.current ? AUDIO.FONDU_ENTREE_JEU2_MS : AUDIO.FONDU_VOLUME_MS;
    volumeCible = niveau;
    appliquerVolume(duree);
    etaitJeu2.current = false;
  }, [numeroJeuActif]);
}
