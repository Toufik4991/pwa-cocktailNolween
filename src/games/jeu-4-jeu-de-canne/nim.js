// Stratégie du jeu de Nim (variante misère, retrait 1 à 3, qui prend la
// dernière canne perd). Isolé ici pour rester facilement ajustable.
//
// Les noms coupOptimal() et coupVolontairementRate() sont fixés par la
// spec (4-jeu-4-jeu-de-canne.md) : ne pas les renommer.

import { JEU_4 } from "../../config/index.js";

// Coup mathématiquement parfait : laisse à l'adversaire un multiple de 4
// plus 1 (1, 5, 9, 13, 17...), la position perdante en jeu misère 1-2-3.
export function coupOptimal(cannesRestantes) {
  const max = Math.min(JEU_4.RETRAIT_MAX, cannesRestantes);
  const reste = (cannesRestantes - 1) % 4;
  if (reste === 0) {
    // Déjà en position perdue : aucun coup n'est meilleur qu'un autre,
    // on joue au hasard parmi les coups légaux.
    return 1 + Math.floor(Math.random() * max);
  }
  return Math.min(reste, max);
}

// Choisit volontairement un coup SOUS-optimal qui laisse au joueur une
// position gagnante (un multiple de 4 plus 1), sans jamais le signaler.
export function coupVolontairementRate(cannesRestantes) {
  const optimal = coupOptimal(cannesRestantes);
  const max = Math.min(JEU_4.RETRAIT_MAX, cannesRestantes);
  const coupsPossibles = [1, 2, 3].filter((c) => c !== optimal && c <= max);

  if (coupsPossibles.length === 0) {
    // Aucune alternative légale (ex. il ne reste qu'une canne) : impossible
    // de mal jouer délibérément, on retombe sur le coup optimal.
    return optimal;
  }

  const gagnant = coupsPossibles.find((c) => (cannesRestantes - c - 1) % 4 === 0);
  if (gagnant !== undefined) return gagnant;
  return coupsPossibles[Math.floor(Math.random() * coupsPossibles.length)];
}

// Point d'entrée utilisé par le composant : applique l'erreur volontaire
// uniquement au tour configuré (JEU_4.TOUR_ERREUR_VOLONTAIRE), 0 pour la
// désactiver (IA parfaite, imbattable).
export function jouerTourMixapero(cannesRestantes, numeroDuTour) {
  if (numeroDuTour === JEU_4.TOUR_ERREUR_VOLONTAIRE) {
    return coupVolontairementRate(cannesRestantes);
  }
  return coupOptimal(cannesRestantes);
}
