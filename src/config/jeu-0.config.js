// Jeu 0 — "Cocktail, qui suis-je ?"
// Contenu et paramètres de difficulté. Modifiable sans risque.

export const JEU_0 = {
  SEUIL_ABANDON: 5,

  // Bouton "Un coup d'œil" (§C3, 06/09/2026 : la silhouette a été retirée,
  // le bouton montre maintenant la vraie image du cocktail en cours
  // pendant DUREE_LEVEE_VOILE secondes). Une utilisation par cocktail.
  DUREE_LEVEE_VOILE: 2, // secondes
  FONDU_VOILE: 300, // ms
  REPLIQUE_LEVEE_VOILE: "Deux secondes. Pas une de plus.",
};

// Les 5 cocktails sont tous à trouver, un par un, dans un ordre tiré au
// sort à chaque partie (§C1, 06/09/2026 — annule l'ancienne consigne d'un
// seul cocktail tiré au sort). Le nombre d'indices dépend de la longueur
// de la liste "indices" de chaque cocktail (le Pornstar Martini n'en a
// volontairement qu'un seul).
export const COCKTAILS = [
  {
    id: "mojito",
    reponse: "mojito",
    alias: ["le mojito"],
    image: "img-jeu0-mojito.png",
    indices: [
      "Je suis né à Cuba, et je sens le jardin après la pluie.",
      "On me pile, on me froisse, on me martyrise — et c'est comme ça que je donne le meilleur.",
      "Il me faut du blanc, du vert, du sucre et des bulles.",
      "Mon herbe préférée, c'est la menthe.",
      "Hemingway m'a beaucoup aimé. Peut-être trop.",
    ],
  },
  {
    id: "pina-colada",
    reponse: "pina colada",
    alias: ["piña colada", "pinacolada", "pina-colada"],
    image: "img-jeu0-pinacolada.png",
    indices: [
      "Je suis crémeux, sucré, et je sens les vacances.",
      "Porto Rico me revendique comme boisson nationale.",
      "Il me faut de la noix de coco.",
      "Et de l'ananas. Beaucoup d'ananas.",
      'Mon nom veut littéralement dire "ananas filtré".',
    ],
  },
  {
    id: "daiquiri",
    reponse: "daiquiri",
    alias: [],
    image: "img-jeu0-daiquiri.png",
    indices: [
      "Trois ingrédients. Pas un de plus. Je suis la simplicité même.",
      "Je porte le nom d'une plage cubaine.",
      "Du rhum blanc.",
      "Du citron vert, et un peu de sucre. C'est tout.",
      "Si tu me mets au blender avec des fraises, je deviens beaucoup moins sérieux.",
    ],
  },
  {
    id: "margarita",
    reponse: "margarita",
    alias: ["la margarita"],
    image: "img-jeu0-margarita.png",
    indices: [
      "Je porte une couronne de sel, et j'en suis très fier.",
      "Je viens du Mexique, quelque part entre Tijuana et la légende.",
      "Ma base, c'est la tequila.",
      "J'y ajoute du citron vert et une liqueur d'orange.",
      "Mon nom, c'est un prénom de femme. Personne ne sait vraiment laquelle.",
    ],
  },
  {
    id: "pornstar-martini",
    reponse: "pornstar martini",
    alias: ["pornstar", "porn star martini", "pornstarmartini"],
    image: "img-jeu0-pornstarmartini.png",
    // Volontairement un seul indice : blague personnelle. Le moteur doit
    // gérer un nombre d'indices variable, pas fixe à 5.
    indices: ["Ton top 3 cocktail !!!!"],
  },
];

// Réplique de Mixapéro affichée pendant la courte transition entre deux
// cocktails trouvés (§C1, 06/09/2026).
export const REPLIQUES_TRANSITION_COCKTAIL = [
  "Un de plus. File, le suivant t'attend.",
  "Pas mal. On enchaîne.",
  "Bien joué. Suivant !",
  "Encore un qui est démasqué. Au tour du prochain.",
  "Tu progresses. Ça me dérange un peu, mais bon.",
];

export const REPLIQUES_MAUVAISE_REPONSE = {
  avecIndices: [
    "Non. Voilà un indice de plus, puisque visiblement il en faut.",
    "Alors ça, c'est même pas un cocktail.",
    "Tu chauffes. Enfin non. Tu refroidis.",
    "Je te donne un coup de main, mais je le fais à contrecœur.",
    "Essaie encore. J'ai toute la soirée, je suis liquide.",
  ],
  sansIndice: [
    "J'ai plus rien à te dire. Débrouille-toi.",
    "Réfléchis. Vraiment. Je peux pas t'aider plus.",
    "Tu es la seule personne à pouvoir trouver ça, je te le promets.",
  ],
};
