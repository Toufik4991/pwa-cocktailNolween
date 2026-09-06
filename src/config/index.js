// Point d'entrée unique de la configuration : tout s'importe depuis
// "config" (voir src/config/index.js), même si le contenu est réparti en
// plusieurs fichiers par thème pour rester lisible (40 écrans + grille de
// mots cachés + 5 cocktails dans un seul fichier auraient été illisibles).
//
// Fichiers que le maître du jeu peut modifier sans rien casser :
// codes.js, textes-courts.js, sequences.js, jeu-0..5.config.js, theme.js
// (et son miroir src/theme/theme.css).

export { CODES } from "./codes.js";
export * from "./textes-courts.js";
export { SEQUENCES, BOUTON_SUIVANT_PAR_DEFAUT } from "./sequences.js";
export { DECORS, COULEUR_TEXTE, COULEUR_ACCENT } from "./theme.js";

export {
  JEU_0,
  COCKTAILS,
  REPLIQUES_MAUVAISE_REPONSE,
  REPLIQUES_TRANSITION_COCKTAIL,
} from "./jeu-0.config.js";
export {
  JEU_1,
  AGRUMES,
  LEURRES,
  NOMS_FRUITS,
  CONSIGNES,
  REPLIQUES_MAUVAIS_AGRUME,
  REPLIQUES_LEURRE,
} from "./jeu-1.config.js";
export { JEU_2, TOURS, REPLIQUES_ERREUR, MESSAGE_SON_COUPE } from "./jeu-2.config.js";
export { JEU_3 } from "./jeu-3.config.js";
export {
  JEU_4,
  COMMENTAIRES_PENDANT_PARTIE,
  COMMENTAIRE_ERREUR_VOLONTAIRE,
  COMMENTAIRES_JOUEUR_GAGNANT,
  COMMENTAIRE_VICTOIRE_MIXAPERO,
  INDICES_STRATEGIE,
} from "./jeu-4.config.js";
export {
  JEU_5,
  VECTEURS_DIRECTION,
  GRILLE,
  MOTS,
  MOT_PIEGE,
  DEFINITIONS,
} from "./jeu-5.config.js";

// Réglages globaux non spécifiques à un jeu (audio, ordre des jeux...).
// 3 musiques (mise à jour du 05/09/2026, soir) : mus-hub (accueil, pseudo,
// hub, séquences texte, Réponses), mus-jeu (pendant les 6 mini-jeux),
// mus-final (animation finale uniquement). Les 3 pistes tournent en fondu
// enchaîné, jamais de coupure nette ni de redémarrage — sauf mus-final qui
// repart du début à chaque lancement de l'animation (effet dramatique).
// Vitesse de l'effet machine à écrire des séquences narratives, en ms par
// caractère (plus grand = plus lent). Ralenti de 25% le 06/09/2026 (§B2) :
// 28 -> 35.
export const VITESSE_ECRITURE = 35;

export const AUDIO = {
  VOLUME_MUSIQUE_NORMAL: 0.6, // accueil, pseudo, hub, séquences texte, Réponses
  VOLUME_MUSIQUE_JEU: 0.35, // pendant les mini-jeux (hors jeu 2), plus discret que le hub
  VOLUME_MUSIQUE_JEU2: 0, // silence total pendant le jeu 2 (mémorisation de sons)
  FONDU_VOLUME_MS: 800, // fondu croisé par défaut entre deux pistes (06/09/2026)
  FONDU_SORTIE_JEU2_MS: 400, // fondu à l'entrée du jeu 2 (silence rapide)
  FONDU_ENTREE_JEU2_MS: 800, // fondu à la sortie du jeu 2 (retour plus doux)
};

// Apparitions furtives du Glaçant pendant certains mini-jeux (§H, 06/09/2026).
export const GLACANT = {
  ACTIF_SUR: [0, 1, 2, 3], // jamais jeu 4 (canne) ni jeu 5 (secret)
  DELAI_MIN: 8, // secondes après le début du jeu
  DELAI_MAX: 25,
  APPARITIONS_MAX: 1, // par partie
  DUREE_YEUX: 1000, // ms, superposition de img-glacant-02
};

export const ORDRE_JEUX = [0, 1, 2, 3, 4, 5];

export const NOMS_JEUX = {
  0: "Cocktail, qui suis-je ?",
  1: "Zeste Ninja",
  2: "Des bulles ?",
  3: "Fait frisquet ici nn ?",
  4: "Jeu de canne",
  5: "L'ingrédient secret",
};

export const INGREDIENTS = {
  0: { nom: "Sirop de fruit", image: "img-ingredient-sirop.png" },
  1: { nom: "Zestes d'agrumes", image: "img-ingredient-zeste.png" },
  2: { nom: "Bulles de Prosecco", image: "img-ingredient-prosecco.png" },
  3: { nom: "Glaçon", image: "img-ingredient-glacon.png" },
  4: { nom: "Canne à sucre", image: "img-ingredient-canne.png" },
  5: { nom: "Ingrédient secret", image: "img-ingredient-secret.png" },
};
