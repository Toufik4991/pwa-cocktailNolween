// Jeu 2 — "Des bulles ?" (Simon)
// Contenu et paramètres de difficulté. Modifiable sans risque.

export const JEU_2 = {
  LONGUEUR_DEPART: 3,
  LONGUEUR_VICTOIRE: 6,
  DUREE_ALLUMAGE_DEPART: 650, // ms (E1, 06/09/2026 : 600 -> 650)
  DUREE_ALLUMAGE_MIN: 450, // ms (E1 : 360 -> 450)
  PAUSE_DEPART: 550, // ms (E1 : 300 -> 550, les bulles s'entrechoquaient)
  PAUSE_MIN: 400, // ms (E1 : 210 -> 400)
  REPRISE_APRES_ERREUR: "meme_tour", // ou "tour_precedent"
  SEUIL_ABANDON: 5,
  // Pause entre la fin de la démonstration jouée par le jeu et le moment où
  // le joueur peut répondre, pour ne pas confondre la dernière bulle de la
  // démo avec sa propre première réponse (§E1).
  PAUSE_FIN_ECOUTE: 700,
};

const NB_TOURS = 4;

function interpoler(depart, min, i) {
  return Math.round(depart + (min - depart) * (i / (NB_TOURS - 1)));
}

// Un tour par ligne : longueur de la séquence à ce tour, durée d'allumage
// de chaque bulle, pause entre deux bulles. Dérivé de JEU_2 ci-dessus
// (interpolation linéaire entre le tour de départ et le tour minimum) pour
// que modifier les 4 constantes au-dessus change réellement le jeu — avant
// le §E1, ces constantes existaient mais n'étaient lues nulle part, seules
// ces 4 lignes codées en dur comptaient.
export const TOURS = Array.from({ length: NB_TOURS }, (_, i) => ({
  longueur: JEU_2.LONGUEUR_DEPART + i,
  dureeAllumage: interpoler(JEU_2.DUREE_ALLUMAGE_DEPART, JEU_2.DUREE_ALLUMAGE_MIN, i),
  pause: interpoler(JEU_2.PAUSE_DEPART, JEU_2.PAUSE_MIN, i),
}));

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
