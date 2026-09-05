// Jeu 4 — "Jeu de canne" (Nim)
// Contenu et paramètres de difficulté. La logique (coupOptimal,
// coupVolontairementRate) est dans games/jeu-4-jeu-de-canne/nim.js, pas
// ici : ce fichier ne contient que les données modifiables sans risque.

export const JEU_4 = {
  NOMBRE_CANNES_DEPART: 17,
  RETRAIT_MIN: 1,
  RETRAIT_MAX: 3,
  JOUEUR_COMMENCE: true,
  TOUR_ERREUR_VOLONTAIRE: 2, // 0 pour désactiver (IA parfaite, imbattable)
  PARTIE_DEBUT_INDICES: 2, // première partie où l'indice de stratégie s'affiche
  DELAI_REFLEXION_MIN: 1000, // ms
  DELAI_REFLEXION_MAX: 2000, // ms
  SEUIL_ABANDON: 5,
};

export const COMMENTAIRES_PENDANT_PARTIE = [
  "J'en prends deux. Comme ça. Sans réfléchir.",
  "Hop.",
  "Tu vois, moi je calcule.",
  "Prends ton temps, j'ai l'éternité et un foie en verre.",
  "Intéressant, ce que tu viens de faire. Vraiment intéressant.",
];

// Réplique unique au tour de l'erreur volontaire : ne jamais laisser
// deviner que c'est fait exprès.
export const COMMENTAIRE_ERREUR_VOLONTAIRE = "Allez, j'en prends… celle-là.";

export const COMMENTAIRES_JOUEUR_GAGNANT = ["Hmm.", "Attends. Attends attends attends."];

export const COMMENTAIRE_VICTOIRE_MIXAPERO =
  "Ha ! La dernière est pour toi. Je te l'avais dit, je joue à ça depuis longtemps.";

// Indice de stratégie progressif : une seule formulation par partie, dans
// l'ordre, à partir de PARTIE_DEBUT_INDICES. La dernière ligne se répète
// pour la partie 5 et toutes les suivantes.
export const INDICES_STRATEGIE = [
  "Tu veux savoir mon secret ? Je compte. Tout le temps. Je regarde combien il en reste et je fais mon petit calcul.",
  "Allez, je suis bon prince. Ce qui compte, c'est pas combien j'en prends. C'est combien j'en laisse.",
  "Bon. Puisque tu insistes. Les nombres que j'aime bien laisser sur la table, c'est 13, 9, 5… tu vois la logique ?",
  "Un, cinq, neuf, treize, dix-sept. Laisse-moi un de ces nombres-là et je suis coincé. Voilà, je t'ai tout dit, t'es content ?",
];
