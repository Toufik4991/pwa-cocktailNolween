// Les 40 écrans narratifs du scénario, transcrits depuis scenario.md.
// {pseudo} est remplacé automatiquement par le pseudo du joueur.
// Modifiable sans risque : changer un texte, une expression (neutre /
// content / moqueur) ou un décor (bar / agrumes / bulles / givre / sucre
// / secret — voir theme.js pour les couleurs).
//
// Chaque séquence est un tableau d'écrans {decor, expression, texte}.

export const SEQUENCES = {
  ouverture: [
    {
      decor: "bar",
      expression: "neutre",
      texte: "Salut ! Moi c'est **Mixapéro**. Mixologue de légende, charme naturel, et accessoirement… moitié cocktail.\n\nNe me demande pas comment.",
    },
    {
      decor: "bar",
      expression: "neutre",
      texte: "Ce matin je me réveille, et ma recette : envolée. Six ingrédients. Volés.\n\nCe sont **Les Glaçants**. Une bande de glaçons aigris qui trouvent que la vie est trop sucrée.",
    },
    {
      decor: "bar",
      expression: "moqueur",
      texte: "Moi je peux pas y aller, j'ai des jambes en verre. Donc ce sera toi.\n\nOui, toi, {pseudo}.",
    },
    {
      decor: "bar",
      expression: "content",
      texte: "Six ingrédients. Six lieux. Six épreuves.\n\nAllez. Bouge-toi.",
    },
  ],

  "jeu-0-intro": [
    {
      decor: "bar",
      expression: "moqueur",
      texte: "Avant de te confier quoi que ce soit, petite vérification. Parce que si tu sais même pas ce qu'est un cocktail, autant que j'arrête tout de suite.",
    },
    {
      decor: "bar",
      expression: "neutre",
      texte: "Je te donne des indices. Toi tu me donnes le nom. Simple.\n\nEnfin… simple pour moi. 🌝🍹",
    },
  ],
  "jeu-0-fin": [
    {
      decor: "bar",
      expression: "content",
      texte: "Pas mal ! Vraiment. J'étais prêt à être déçu et tu m'as privé de ce plaisir.\n\nTiens, premier ingrédient récupéré : **le sirop de fruit**.",
    },
    {
      decor: "bar",
      expression: "neutre",
      texte: "Bon. Le suivant est plus loin. Regarde bien l'image que je te laisse, va sur place, et cherche le code.\n\nIl y est. Quelque part.",
    },
  ],

  "jeu-1-intro": [
    {
      decor: "agrumes",
      expression: "content",
      texte: "Ah, les agrumes. Mes petits chéris acides.\n\nIls les ont éparpillés en vrac. Citron vert, citron jaune, orange — tout mélangé. Des barbares.",
    },
    {
      decor: "agrumes",
      expression: "neutre",
      texte: "Je vais te dire quoi trancher, et **quand**. Tu écoutes, tu tranches, tu récoltes.\n\nCent cinquante grammes de zeste. Pas un de moins.",
    },
    {
      decor: "agrumes",
      expression: "moqueur",
      texte: "Et je te préviens tout de suite : si tu tranches le mauvais fruit, je vais le dire.\n\nFort. Plusieurs fois.",
    },
  ],
  "jeu-1-fin": [
    {
      decor: "agrumes",
      expression: "moqueur",
      texte: "Bon. T'as la main. Un peu tremblante, mais t'as la main.",
    },
    {
      decor: "agrumes",
      expression: "content",
      texte: "**Les zestes**, deuxième ingrédient. C'est ça qui donne le parfum. Sans zeste, un cocktail c'est juste de l'alcool avec des prétentions.\n\nProchaine étape. Et là, écoute bien : ça va faire du bruit.",
    },
  ],

  "jeu-2-intro": [
    {
      decor: "bulles",
      expression: "neutre",
      texte: "Chut. Chuuuut.\n\nTu entends ? Ça. Ce petit \"ploc\". C'est mon Prosecco qui appelle à l'aide.",
    },
    {
      decor: "bulles",
      expression: "neutre",
      texte: "Ils ont dispersé mes bulles, il faut les rappeler dans l'ordre. Une mélodie. Tu écoutes, tu répètes.",
    },
    {
      decor: "bulles",
      expression: "content",
      texte: "C'est un jeu de mémoire. Mais tkt, je vais commencer doucement.",
    },
  ],
  "jeu-2-fin": [
    {
      decor: "bulles",
      expression: "content",
      texte: "Et hop ! Voilà les bulles ! Écoute-moi ça… ahhh, cette musique si élégante…",
    },
    {
      decor: "bulles",
      expression: "neutre",
      texte: "Troisième ingrédient : **les bulles**. La fête en suspension. Sans elles, on boit. Avec elles, on célèbre.\n\nBon. Prochaine étape, et là, prends une veste. Je crois qu'ils nous attendent.",
    },
  ],

  "jeu-3-intro": [
    {
      decor: "givre",
      expression: "neutre",
      texte: "Voilà. On y est. Le territoire des Glaçants.\n\nIls ont pris un de leurs propres frères et ils l'ont brisé en morceaux, juste pour m'embêter. Ce sont des gens compliqués.",
    },
    {
      decor: "givre",
      expression: "neutre",
      texte: "Il faut le reconstituer. Pièce par pièce. Tu touches deux morceaux, ils s'échangent. C'est tout.",
    },
    {
      decor: "givre",
      expression: "moqueur",
      texte: "Et fais vite, parce que moi, j'ai froid…",
    },
  ],
  "jeu-3-fin": [
    {
      decor: "givre",
      expression: "content",
      texte: "Ha ha ! Reconstitué ! Regarde-moi ce glaçon. Parfait. Transparent. Innocent.\n\nAllez, la suite !",
    },
  ],

  "jeu-4-intro": [
    {
      decor: "sucre",
      expression: "neutre",
      texte: "La douceur. Il en faut. Sinon c'est juste amer, et l'amertume sans sucre, c'est de la rancune.",
    },
    {
      decor: "sucre",
      expression: "neutre",
      texte: "Mais je vais pas te la donner comme ça. On va jouer.\n\nDes cannes à sucre sur la table. Chacun son tour, on en retire une, deux ou trois. Celui qui prend la dernière a perdu.",
    },
    {
      decor: "sucre",
      expression: "moqueur",
      texte: "Je te préviens : je joue à ça depuis très, très longtemps.\n\nEt je triche uniquement quand je perds.",
    },
  ],
  "jeu-4-fin": [
    {
      decor: "sucre",
      expression: "moqueur",
      texte: "…\n\nBon. Bien joué.",
    },
    {
      decor: "sucre",
      expression: "content",
      texte: "Non, vraiment. Bien joué. Ça me coûte de le dire, mais tu m'as eu.\n\nCinquième ingrédient : **la canne à sucre**. La douceur. Prends-en soin.",
    },
    {
      decor: "sucre",
      expression: "neutre",
      texte: "Il en reste un. Le dernier. Et c'est là que ça devient bizarre, parce que…\n\nJe sais plus ce que c'est.",
    },
    {
      decor: "sucre",
      expression: "neutre",
      texte: "Le sixième ingrédient. Ma propre recette. Je l'ai oublié.\n\nDernière étape. Va falloir aller le chercher dans ma tête.",
    },
  ],

  "jeu-5-intro": [
    {
      decor: "secret",
      expression: "neutre",
      texte: "Le dernier ingrédient, je l'ai sur le bout de la langue depuis ce matin. Impossible de le retrouver.",
    },
    {
      decor: "secret",
      expression: "neutre",
      texte: "Tout ce qui me reste, c'est ça : une vieille grille griffonnée au dos d'une carte. Cinq mots cachés dedans.\n\nJe sais même plus lesquels.",
    },
    {
      decor: "secret",
      expression: "moqueur",
      texte: "Cinq indices à ta disposition. Cinq. Pas six. Utilise-les bien.\n\nTrouve les mots, et ma mémoire reviendra toute seule.",
    },
  ],
  "jeu-5-fin": [
    {
      decor: "secret",
      expression: "neutre",
      texte: "Vermouth. Épices. Bitters. Herbes. Shrub.\n\n…",
    },
    {
      decor: "secret",
      expression: "content",
      texte: "Mais oui ! **L'amertume.** Voilà ce que j'avais oublié.\n\nPersonne la réclame jamais, alors elle finit par disparaître des recettes. Et pourtant c'est elle qui tient tout le reste debout.",
    },
    {
      decor: "secret",
      expression: "content",
      texte: "Six sur six, {pseudo}. On a tout.\n\nViens. On va faire ce cocktail.",
    },
  ],

  finale: [
    {
      decor: "bar",
      expression: "content",
      texte: "Le sirop. Les zestes. Les bulles. La glace. Le sucre. Et l'amertume.",
    },
    {
      decor: "bar",
      expression: "content",
      texte: "Regarde bien. C'est la seule partie que je peux faire tout seul.",
    },
  ],

  // Affiché par-dessus l'image du cocktail, après l'animation.
  "finale-ecran": [
    {
      decor: "bar",
      expression: "content",
      texte: "Bravo. À toi, {pseudo}.\n\nMerci, pour tout ! À bientôt. Peut-être.\n\n**Pina Tresolada.**",
    },
  ],
};

// Bouton de fin de séquence par défaut ; certaines séquences le
// surchargent (voir la logique de navigation).
export const BOUTON_SUIVANT_PAR_DEFAUT = "Suivant";
