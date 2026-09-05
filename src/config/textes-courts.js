// Répliques courtes de Mixapéro, communes à plusieurs écrans (pas propres
// à un jeu en particulier — celles-ci sont dans jeu-X.config.js).
// Modifiable sans risque : ajouter/retirer une ligne, changer un texte.

export const CODE_INCORRECT = [
  "C'est pas ça. Regarde mieux.",
  "Non. Et je le prends personnellement.",
  "Tu inventes des codes maintenant ?",
];

export const CODE_CORRECT = ["Ah ! Voilà.", "Bien. Enfin."];

export const ETAPE_VERROUILLEE = [
  "Chaque chose en son temps.",
  "Tu veux sauter des étapes ? Moi aussi. Ça marche pas.",
];

export const REPONSES_ETAPE_NON_RESOLUE = "Rien à voir ici. Va la gagner d'abord.";

// Utilisé par défaut au 1er-4e échec, pour les jeux qui ont une condition
// d'échec (jeux 0, 2, 4). Les jeux 1/3/5 n'ont pas d'échec, voir leur config.
export const MINI_JEU_PERDU = [
  "Recommence. J'ai tout mon temps, je suis un cocktail.",
  "Bon. On refait ça proprement.",
  "Presque. Presque. Enfin… non, pas vraiment.",
  "Encore un coup et je commence à m'inquiéter.",
];

export const PROPOSITION_ABANDON = {
  texte:
    "Bon. Cinq fois. On va dire que c'est de ma faute, j'ai mal expliqué.\nTu veux qu'on passe à la suite ? Je te donne l'ingrédient, mais on en parle plus jamais.",
  boutonReessaie: "Je réessaie",
  boutonPasser: "Passe à la suite",
};

export const CONFIRMATION_RESET =
  "Tu veux tout effacer ? Six ingrédients, à la poubelle ? Confirme, si tu oses.";
