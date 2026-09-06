# Sans titre

- Jeu 1 — "Zeste Ninja"
    
    # Jeu 1 — "Zeste Ninja"
    
    **Ingrédient débloqué :** zestes d'agrumes
    **Dossier :** `/games/jeu-1-zeste-ninja`**Code d'entrée :** `T7X4`
    
    ---
    
    ## Objectif du joueur
    
    Trancher les bons fruits, au bon moment, pour récolter **150 g de zeste au total**, en suivant les consignes que Mixapéro donne en direct.
    
    ---
    
    ## Principe
    
    Des fruits traversent l'écran en arc de cercle (façon Fruit Ninja). Le joueur les tranche en faisant glisser son doigt dessus.
    
    Une **consigne active** est affichée en permanence en haut de l'écran :
    
    > **Citron vert — 12 / 20 g**
    > 
    
    Le joueur doit trancher **uniquement** le fruit demandé jusqu'à atteindre la quantité. Dès que la consigne est remplie, la suivante démarre automatiquement.
    
    ---
    
    ## Les fruits
    
    ### Les agrumes — les seuls qui rapportent
    
    | Fruit | Poids | Asset entier | Asset tranché |
    | --- | --- | --- | --- |
    | Citron vert | 5 g | `img-jeu1-citronvert-entier.png` | `img-jeu1-citronvert-coupe.png` |
    | Citron jaune | 5 g | `img-jeu1-citronjaune-entier.png` | `img-jeu1-citronjaune-coupe.png` |
    | Orange | 5 g | `img-jeu1-orange-entier.png` | `img-jeu1-orange-coupe.png` |
    
    ### Les leurres — ils ne rapportent jamais rien
    
    | Fruit | Asset entier | Asset tranché |
    | --- | --- | --- |
    | Kiwi | `img-jeu1-kiwi-entier.png` | `img-jeu1-kiwi-coupe.png` |
    | Banane | `img-jeu1-banane-entier.png` | `img-jeu1-banane-coupe.png` |
    
    > ⚠️ **Le kiwi et la banane ne sont jamais demandés dans une consigne.** Ce ne sont pas des agrumes : ils n'ont pas de zeste. Ils existent uniquement comme **distracteurs**, pour que le joueur doive vraiment regarder ce qu'il tranche.
    > 
    > 
    > Les trancher déclenche une réplique taquine **spécifique**, différente de celle d'un mauvais agrume — se tromper de citron est une erreur d'inattention, trancher une banane est une faute professionnelle.
    > 
    
    Tous les agrumes valent **5 g**, ce qui garde le calcul simple et rend chaque consigne atteignable avec un nombre entier de fruits.
    
    ---
    
    ## Les consignes
    
    Six consignes jouées dans l'ordre, pour un total de **150 g** :
    
    | # | Consigne | Quantité | Nb de fruits |
    | --- | --- | --- | --- |
    | 1 | Citron vert | 20 g | 4 |
    | 2 | Citron jaune | 20 g | 4 |
    | 3 | Orange | 15 g | 3 |
    | 4 | Citron vert | 25 g | 5 |
    | 5 | Orange | 30 g | 6 |
    | 6 | Citron jaune | 40 g | 8 |
    |  | **Total** | **150 g** | **30** |
    
    Chaque consigne est annoncée par un message de Mixapéro :
    
    - « Citron vert. Vingt grammes. Vas-y. »
    - « Change ! Citron jaune maintenant. »
    - « Orange. Quinze grammes, pas plus. »
    
    ---
    
    ## Apparition des fruits
    
    - Les fruits montent depuis le bas, décrivent un arc et retombent (gravité simple) — vitesse verticale réduite de 25 % le 06/09/2026 (les fruits allaient trop vite), même hauteur d'arc visée
    - **Un nouveau fruit toutes les 1,1 s** au départ, accéléré progressivement *(était 0,8 s — ralenti le 06/09/2026)*
    - Répartition à chaque apparition :
        - **55 %** → le fruit demandé par la consigne active
        - **25 %** → un autre agrume (mauvais agrume)
        - **20 %** → un leurre (kiwi ou banane, à parts égales)
    
    > Ratio à ajuster au test. Trop de bons fruits et le jeu est trivial ; trop de leurres et il devient pénible.
    > 
    - Un fruit non tranché sort de l'écran, **sans pénalité**
    - Maximum **6 fruits simultanés** à l'écran
    
    ---
    
    ## Trancher
    
    - Le joueur glisse le doigt : une **traînée dessinée directement au canvas** suit le mouvement, segment par segment, épaisseur et opacité dégressives (du plus récent, épais et opaque, au plus ancien, fin et transparent). *(§C2, 06/09/2026 : un sprite "zesteur" censé suivre le doigt avait été tenté puis provoquait des bugs — remplacé définitivement par ce trait canvas pur, aucun asset image à fournir.)*
    - Un fruit est tranché si la traînée croise sa zone
    - **Bon agrume** → coupé en deux, les moitiés retombent, +5 g, son `sfx-jeu1-tranche.mp3`. *(§C3, 06/09/2026 : l'éclaboussure a été retirée — les deux moitiés qui s'écartent suffisent, aucun asset image à fournir.)*
    - **Mauvais agrume** → coupé aussi (plus satisfaisant visuellement), compteur inchangé, son `sfx-jeu1-erreur.mp3`, réplique taquine
    - **Leurre (kiwi/banane)** → coupé aussi, compteur inchangé, son `sfx-jeu1-erreur.mp3`, réplique **spécifique aux leurres**
    
    ---
    
    ## Répliques
    
    Piochées au hasard, **jamais deux fois la même d'affilée**, **au maximum une toutes les 1,5 s**.
    
    **Affichage** *(corrigé le 06/09/2026 : restaient affichées indéfiniment)* : la fenêtre qui montre la réplique est placée **sous le bandeau de consigne, en haut de l'écran**, hors de la zone où circulent les fruits et où passe le doigt — elle ne peut donc jamais recouvrir un fruit ni la consigne en cours. Elle disparaît automatiquement au bout de `DUREE_AFFICHAGE_REPLIQUE` (2,5 s), en fondu de `FONDU_REPLIQUE_MS` (300 ms). Si une nouvelle réplique arrive avant la fin de ce délai, elle remplace la précédente et le minuteur repart entièrement à zéro : jamais deux répliques empilées.
    
    ### Mauvais agrume
    
    - « Un citron vert j'ai dit… t'es sûrement pas mixologue toi ! »
    - « Eh nan, ça c'est une orange ! »
    - « Alors ça, c'est jaune. Le vert, c'est l'autre couleur. »
    - « Tu tranches au hasard ou tu as un plan que je ne comprends pas ? »
    - « Chaque fois que tu fais ça, un barman pleure quelque part. »
    - « Non. Non. Toujours non. »
    
    ### Leurre tranché
    
    - « Une banane. Tu as tranché une banane. Dans un cocktail. »
    - « Un kiwi ?! Mais on te demande du ZESTE ! »
    - « Ça n'a pas de zeste. Ça n'a jamais eu de zeste. »
    - « Je vais faire semblant de pas avoir vu. »
    - « Qui t'a appris à faire des cocktails ? Je veux un nom. »
    
    ---
    
    ## Interface *(revu le 06/09/2026 soir, §C1 — le cadre agrandi le matin même mangeait trop l'aire de jeu)*
    
    - **Tout en haut, hors cadre, en clair sur le fond :** la consigne active en toutes lettres (ex. « CITRON JAUNE — 24 / 40 g »), sans carte ni fond blanc derrière
    - **Juste en dessous, dans un cadre réduit de moitié :** la barre de progression, puis le total cumulé `X / 150 g au total`
    - **Au centre :** l'aire de jeu
    - **En bas :** rien — laisser l'espace libre pour le doigt
    
    ---
    
    ## Condition de victoire
    
    Les 6 consignes remplies, soit 150 g cumulés.
    
    ## Condition d'échec
    
    **Aucune.** Ni chronomètre, ni vies, ni pénalité. Le joueur ne peut pas perdre, seulement mettre plus ou moins de temps.
    
    > **Conséquence :** pas de mécanique d'abandon au 5ᵉ échec. À la place, un bouton **"J'abandonne"** discret, accessible après **3 minutes**.
    > 
    
    ---
    
    ## Paramètres configurables
    
    ```
    POIDS_PAR_FRUIT        = 5      // grammes
    OBJECTIF_TOTAL         = 150    // grammes
    INTERVALLE_APPARITION  = 1.1    // secondes (était 0.8, ralenti le 06/09/2026)
    ACCELERATION           = 0.012  // réduction de l'intervalle par fruit apparu (était 0.02)
    INTERVALLE_MINIMUM     = 0.65   // secondes (était 0.4)
    RATIO_BON_FRUIT        = 0.55
    RATIO_MAUVAIS_AGRUME   = 0.25
    RATIO_LEURRE           = 0.20
    MAX_FRUITS_ECRAN       = 6
    DELAI_MIN_REPLIQUE     = 1.5    // secondes
    DELAI_BOUTON_ABANDON   = 180    // secondes
    DUREE_AFFICHAGE_REPLIQUE = 2.5  // secondes avant disparition automatique (ajouté 06/09/2026)
    FONDU_REPLIQUE_MS        = 300  // ms, fondu de disparition (ajouté 06/09/2026)
    ```
    
    Les 6 consignes sont également dans la config, sous forme de liste modifiable.
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu1.webp` | Fond |
    | `img-jeu1-citronvert-entier.png` / `-coupe.png` | Citron vert |
    | `img-jeu1-citronjaune-entier.png` / `-coupe.png` | Citron jaune |
    | `img-jeu1-orange-entier.png` / `-coupe.png` | Orange |
    | `img-jeu1-kiwi-entier.png` / `-coupe.png` | **Kiwi (leurre)** |
    | `img-jeu1-banane-entier.png` / `-coupe.png` | **Banane (leurre)** |
    | *(aucun — canvas)* | Traînée du doigt et impact de coupe (§C2/§C3, 06/09/2026) |
    | `sfx-jeu1-tranche.mp3` | Bon fruit |
    | `sfx-jeu1-erreur.mp3` | Mauvais fruit ou leurre |
    | `sfx-victoire.mp3` | 150 g atteints |
    
    ---
    
    ## Notes techniques
    
    - Utiliser un **canvas** plutôt que du DOM : avec 30+ fruits et une traînée à suivre, le DOM ramerait sur mobile.
    - Gérer les événements **tactiles** (`touchmove`) en priorité, la souris seulement pour le test sur ordinateur.
    - C'est le jeu le plus lourd des six : le construire **en dernier**, quand tout le reste est stable.
    - Les 5 fruits doivent être **visuellement très distincts** en petit format et en mouvement. Un citron jaune et une banane risquent de se confondre en pleine action — soigner le contraste de forme.
    
    ---
    
    ## Points à trancher
    
    Aucun — tout est acté.