// Module audio unique pour toute l'app (réécriture complète, §A 06/09/2026
// soir — les superpositions de musiques et le son persistant du jeu 2
// venaient d'un système à 3 lecteurs toujours actifs en parallèle, corrigé
// à plusieurs reprises sans jamais éliminer la cause structurelle).
//
// Règle absolue : AUCUN composant ne crée d'Audio(), n'appelle .play()/.pause()
// lui-même, ni n'importe autre chose que les fonctions exportées ci-dessous.
// Toute la gestion audio de l'app passe par ce fichier, et par lui seul.
import { asset } from "../utils/assetUrl.js";

const PISTES = {
  hub: { fichier: "mus-hub.mp3", volume: 0.6 },
  jeu: { fichier: "mus-jeu.mp3", volume: 0.35 },
  final: { fichier: "mus-final.mp3", volume: 0.6 },
};

const DUREE_FONDU_MS = 800;

// ---- Musique : un seul <audio>, jamais deux — la superposition est ----
// ---- structurellement impossible avec un seul lecteur.               ----
const elementMusique = new Audio();
elementMusique.loop = true;

let musiqueActuelle = null; // 'hub' | 'jeu' | 'final' | null
let sonActif = true;
let generationFondu = 0;
let idAnimationFondu = null;

function fonduVers(cible, dureeMs, onTermine) {
  if (idAnimationFondu) {
    cancelAnimationFrame(idAnimationFondu);
    idAnimationFondu = null;
  }
  const depart = elementMusique.volume;
  const debut = performance.now();
  const borne = (v) => Math.min(1, Math.max(0, v));

  if (dureeMs <= 0) {
    elementMusique.volume = borne(cible);
    onTermine?.();
    return;
  }
  function etape(t) {
    const progres = Math.min(1, (t - debut) / dureeMs);
    elementMusique.volume = borne(depart + (cible - depart) * progres);
    if (progres < 1) {
      idAnimationFondu = requestAnimationFrame(etape);
    } else {
      idAnimationFondu = null;
      onTermine?.();
    }
  }
  idAnimationFondu = requestAnimationFrame(etape);
}

/**
 * Déclare la musique voulue pour l'écran courant. Fonction unique pour tout
 * changement de musique dans l'app.
 *
 * - Si `nom` est déjà la piste en cours : ne fait rien (pas de redémarrage).
 * - Sinon : fondu de la piste en cours vers 0 (1ʳᵉ moitié des 800 ms), PUIS
 *   seulement ensuite la piste demandée démarre et monte (2ᵉ moitié) — un
 *   seul lecteur, donc jamais 2 pistes audibles en même temps.
 * - `nom === null` : silence total (utilisé par le jeu 2), le lecteur est
 *   mis en pause une fois le fondu terminé.
 */
export function jouerMusique(nom) {
  if (nom === musiqueActuelle) return;
  musiqueActuelle = nom;
  const generation = ++generationFondu;
  const demiDuree = DUREE_FONDU_MS / 2;

  const demarrerPisteDemandee = () => {
    if (generation !== generationFondu) return; // une déclaration plus récente a pris le relais
    if (nom === null) {
      elementMusique.pause();
      return;
    }
    const piste = PISTES[nom];
    elementMusique.src = asset(`assets/audio/${piste.fichier}`);
    elementMusique.currentTime = 0;
    elementMusique.volume = 0;
    if (sonActif) elementMusique.play().catch(() => {});
    fonduVers(sonActif ? piste.volume : 0, demiDuree);
  };

  // Rien à éteindre en douceur si le lecteur est déjà silencieux/à l'arrêt.
  if (elementMusique.paused || elementMusique.volume === 0) {
    demarrerPisteDemandee();
  } else {
    fonduVers(0, demiDuree, demarrerPisteDemandee);
  }
}

/** Coupe/réactive à la fois la musique et les effets sonores. */
export function definirSonActif(actif) {
  sonActif = actif;
  if (!actif) {
    fonduVers(0, 200, () => elementMusique.pause());
    return;
  }
  if (musiqueActuelle) {
    const piste = PISTES[musiqueActuelle];
    if (elementMusique.paused) elementMusique.play().catch(() => {});
    fonduVers(piste.volume, 200);
  }
}

// De nombreux navigateurs bloquent toute lecture audio avant une première
// interaction de la joueuse (iOS, Chrome...) : le tout premier appel à
// jouerMusique() peut donc échouer silencieusement (`.catch(() => {})`
// ci-dessus). On retente une seule fois au premier geste.
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    () => {
      if (sonActif && musiqueActuelle && elementMusique.paused) {
        elementMusique.play().catch(() => {});
      }
    },
    { once: true }
  );
}

// ---- Effets sonores : canal indépendant du volume de la musique ----
const cacheSons = new Map();

export function precharger(noms) {
  for (const nom of noms) {
    if (!cacheSons.has(nom)) {
      const audio = new Audio(asset(`assets/audio/${nom}`));
      audio.preload = "auto";
      cacheSons.set(nom, audio);
    }
  }
}

/** Retourne l'instance jouée (utile pour la couper explicitement avant la fin). */
export function jouerSon(nom, { volume = 1 } = {}) {
  if (!sonActif) return null;
  let base = cacheSons.get(nom);
  if (!base) {
    base = new Audio(asset(`assets/audio/${nom}`));
    cacheSons.set(nom, base);
  }
  const instance = base.cloneNode();
  instance.volume = volume;
  instance.play().catch(() => {
    // Lecture bloquée (pas encore d'interaction utilisateur, etc.) : on
    // ignore, le jeu reste jouable sans son.
  });
  return instance;
}

// Hook d'inspection pour les tests automatisés (dev uniquement).
if (import.meta.env.DEV) {
  window.__audioDebug = () => ({
    musiqueActuelle,
    volume: elementMusique.volume,
    paused: elementMusique.paused,
    currentTime: elementMusique.currentTime,
    sonActif,
  });
}
