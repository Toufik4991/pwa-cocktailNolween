// Jeu 5 — "L'ingrédient secret"
// La grille est GÉNÉRÉE UNE FOIS puis figée ici (voir
// scripts/generate_grille_jeu5.py) : ne pas la régénérer à la volée, une
// grille aléatoire pourrait accidentellement contenir un mot lisible non
// prévu. Modifier une définition ou un paramètre est sans risque ; changer
// la grille ou les positions demande de relancer le script et de tout
// recopier ici.

export const JEU_5 = {
  GRILLE_LARGEUR: 12,
  GRILLE_HAUTEUR: 12,
  NOMBRE_CHARGES_INDICE: 5,
  DUREE_AFFICHAGE_INDICE: 10, // secondes
  DIRECTIONS_AUTORISEES: ["horizontale", "verticale", "diagonale_bas"],
  AFFICHER_LONGUEURS: true,
  DELAI_ANTI_SPAM_PIEGE: 3, // secondes
  DELAI_BOUTON_ABANDON: 300, // secondes (pas de condition d'échec dans ce jeu)
};

// Vecteurs (delta ligne, delta colonne) associés à chaque direction autorisée.
export const VECTEURS_DIRECTION = {
  horizontale: [0, 1],
  verticale: [1, 0],
  diagonale_bas: [1, 1],
};

// Grille figée 12x12, générée puis vérifiée sans mot français accidentel
// de 4+ lettres dans les 3 directions autorisées.
export const GRILLE = [
  "AAALUMAKUPQT",
  "RTUGNOLWEENS",
  "AMEOSERZMZOS",
  "NQZDAFTCMEOL",
  "VERMOUTHLPEP",
  "SHRUBXEIYIDL",
  "JAHASDIIZCTA",
  "BITTERSOTECX",
  "RLGNADXEYSUM",
  "AFLOZCJLMRAW",
  "RGATOOETAEEA",
  "BANHERBESTNE",
];

// Les 5 mots à trouver + le mot piège NOLWEEN (ne compte jamais comme
// trouvaille). "depart" = [ligne, colonne] de la première lettre.
export const MOTS = {
  VERMOUTH: { depart: [4, 0], direction: "horizontale" },
  BITTERS: { depart: [7, 0], direction: "horizontale" },
  EPICES: { depart: [3, 9], direction: "verticale" },
  HERBES: { depart: [11, 3], direction: "horizontale" },
  SHRUB: { depart: [5, 0], direction: "horizontale" },
};

export const MOT_PIEGE = {
  mot: "NOLWEEN",
  depart: [1, 4],
  direction: "horizontale",
  message: "Non c'est pas ça qu'on recherche ahah ! T'es pas un ingrédient mystère enfin !",
};

export const DEFINITIONS = {
  VERMOUTH:
    "Vin blanc aromatisé aux plantes et à l'absinthe. Il y en a du rouge, du blanc, du sec. Sans lui, pas de Martini.",
  EPICES: "Cannelle, cardamome, poivre, badiane. Ce qui réchauffe un verre sans le chauffer.",
  BITTERS:
    "Concentré très amer d'écorces et de racines. Quelques gouttes suffisent, et pourtant tout le cocktail en dépend.",
  HERBES:
    "Menthe, basilic, romarin, thym. On les froisse, on les claque dans la main, et le parfum se libère.",
  SHRUB: "Sirop de fruits au vinaigre, une vieille méthode de conservation devenue ingrédient de bar.",
};
