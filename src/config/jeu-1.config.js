// Jeu 1 — "Zeste Ninja"
// Contenu et paramètres de difficulté. Modifiable sans risque : les
// ratios doivent rester une répartition qui totalise 1 (100%).

export const JEU_1 = {
  POIDS_PAR_FRUIT: 5, // grammes, identique pour les 3 agrumes
  OBJECTIF_TOTAL: 150, // grammes
  INTERVALLE_APPARITION: 0.8, // secondes, au départ
  ACCELERATION: 0.02, // réduction de l'intervalle par fruit apparu
  INTERVALLE_MINIMUM: 0.4, // secondes
  RATIO_BON_FRUIT: 0.55,
  RATIO_MAUVAIS_AGRUME: 0.25,
  RATIO_LEURRE: 0.2,
  MAX_FRUITS_ECRAN: 6,
  DELAI_MIN_REPLIQUE: 1.5, // secondes entre deux répliques
  DELAI_BOUTON_ABANDON: 180, // secondes (pas de condition d'échec dans ce jeu)
};

// Agrumes : les seuls qui rapportent des grammes.
export const AGRUMES = ["citronvert", "citronjaune", "orange"];

// Leurres : jamais demandés, ne rapportent jamais rien.
export const LEURRES = ["kiwi", "banane"];

// Les 6 consignes jouées dans l'ordre, pour un total de 150g.
// "annonce" est la réplique de Mixapéro au démarrage de la consigne :
// seules les 3 premières sont écrites dans le scénario, les 3 suivantes
// n'ont pas de réplique dédiée (l'affichage permanent "FRUIT — X/Yg"
// suffit, voir la spec du jeu).
export const CONSIGNES = [
  { fruit: "citronvert", grammes: 20, annonce: "Citron vert. Vingt grammes. Vas-y." },
  { fruit: "citronjaune", grammes: 20, annonce: "Change ! Citron jaune maintenant." },
  { fruit: "orange", grammes: 15, annonce: "Orange. Quinze grammes, pas plus." },
  { fruit: "citronvert", grammes: 25, annonce: null },
  { fruit: "orange", grammes: 30, annonce: null },
  { fruit: "citronjaune", grammes: 40, annonce: null },
];

export const REPLIQUES_MAUVAIS_AGRUME = [
  "Un citron vert j'ai dit… t'es sûrement pas mixologue toi !",
  "Eh nan, ça c'est une orange !",
  "Alors ça, c'est jaune. Le vert, c'est l'autre couleur.",
  "Tu tranches au hasard ou tu as un plan que je ne comprends pas ?",
  "Chaque fois que tu fais ça, un barman pleure quelque part.",
  "Non. Non. Toujours non.",
];

export const REPLIQUES_LEURRE = [
  "Une banane. Tu as tranché une banane. Dans un cocktail.",
  "Un kiwi ?! Mais on te demande du ZESTE !",
  "Ça n'a pas de zeste. Ça n'a jamais eu de zeste.",
  "Je vais faire semblant de pas avoir vu.",
  "Qui t'a appris à faire des cocktails ? Je veux un nom.",
];
