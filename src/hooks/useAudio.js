// Lecture de courts effets sonores depuis /assets/audio. Chaque fichier
// n'est chargé qu'une fois (cache), et clonNode() permet de le rejouer
// même si l'instance précédente n'est pas terminée (ex. clics rapides).
import { asset } from "../utils/assetUrl.js";

const cache = new Map();
let sonActif = true;

export function definirSonActif(actif) {
  sonActif = actif;
}

export function precharger(noms) {
  for (const nom of noms) {
    if (!cache.has(nom)) {
      const audio = new Audio(asset(`assets/audio/${nom}`));
      audio.preload = "auto";
      cache.set(nom, audio);
    }
  }
}

export function jouerSon(nom, { volume = 1 } = {}) {
  if (!sonActif) return null;
  let base = cache.get(nom);
  if (!base) {
    base = new Audio(asset(`assets/audio/${nom}`));
    cache.set(nom, base);
  }
  const instance = base.cloneNode();
  instance.volume = volume;
  instance.play().catch(() => {
    // Lecture bloquée (pas encore d'interaction utilisateur sur iOS, etc.) :
    // on ignore, le jeu reste jouable sans son.
  });
  // Retourné pour les cas où l'appelant doit pouvoir couper explicitement
  // ce son avant la fin de sa lecture (ex. bulles du jeu 2, §E1).
  return instance;
}
