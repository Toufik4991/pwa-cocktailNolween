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

export { JEU_0, COCKTAILS, REPLIQUES_MAUVAISE_REPONSE } from "./jeu-0.config.js";
export {
  JEU_1,
  AGRUMES,
  LEURRES,
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
// Une seule musique dans tout le projet (mus-hub), jouée en continu sans
// jamais redémarrer : seul son volume change selon l'écran.
export const AUDIO = {
  VOLUME_MUSIQUE_NORMAL: 0.6, // accueil, pseudo, hub, séquences texte, Réponses, finale
  VOLUME_MUSIQUE_JEU: 0.15, // pendant les jeux 0, 1, 3, 4 et 5
  VOLUME_MUSIQUE_JEU2: 0, // silence total pendant le jeu 2 (mémorisation de sons)
  FONDU_VOLUME_MS: 600, // fondu par défaut entre deux niveaux
  FONDU_SORTIE_JEU2_MS: 400, // fondu à l'entrée du jeu 2 (silence rapide)
  FONDU_ENTREE_JEU2_MS: 800, // fondu à la sortie du jeu 2 (retour plus doux)
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
