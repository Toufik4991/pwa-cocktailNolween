// Jeu 2 — "Des bulles ?" (Simon)
// Contenu et paramètres de difficulté. Modifiable sans risque.

export const JEU_2 = {
  LONGUEUR_DEPART: 3,
  LONGUEUR_VICTOIRE: 6,
  DUREE_ALLUMAGE_DEPART: 600, // ms
  DUREE_ALLUMAGE_MIN: 360, // ms
  PAUSE_DEPART: 300, // ms
  PAUSE_MIN: 210, // ms
  REPRISE_APRES_ERREUR: "meme_tour", // ou "tour_precedent"
  SEUIL_ABANDON: 5,
};

// Un tour par ligne : longueur de la séquence à ce tour, durée d'allumage
// de chaque bulle, pause entre deux bulles.
export const TOURS = [
  { longueur: 3, dureeAllumage: 600, pause: 300 },
  { longueur: 4, dureeAllumage: 520, pause: 270 },
  { longueur: 5, dureeAllumage: 440, pause: 240 },
  { longueur: 6, dureeAllumage: 360, pause: 210 },
];

export const REPLIQUES_ERREUR = [
  "Nan. Écoute mieux.",
  "C'était pas celle-là. Je recommence, mais je soupire.",
  "Tes oreilles sont en vacances ?",
  "Allez, encore une fois. Concentre-toi.",
];

export const MESSAGE_SON_COUPE = {
  texte: "Euh. Tu comptes reconnaître des bulles sans le son ? Je te conseille de le rallumer.",
  boutonActiver: "Activer le son",
  boutonContinuer: "Continuer quand même",
};
