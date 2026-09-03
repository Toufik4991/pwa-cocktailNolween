# Sans titre

- Jeu 4 — "Jeu de canne"
    
    # Jeu 4 — "Jeu de canne"
    
    **Ingrédient débloqué :** canne à sucre
    **Dossier :** `/games/jeu-4-jeu-de-canne`**Code d'entrée :** `Z9F2`
    
    ---
    
    ## Objectif du joueur
    
    Battre Mixapéro au jeu des bâtonnets. **Celui qui retire la dernière canne a perdu.**
    
    ---
    
    ## Règles
    
    - **17 cannes à sucre** sur la table au départ
    - Le joueur et Mixapéro jouent chacun leur tour
    - À son tour, on retire **1, 2 ou 3 cannes**
    - Celui qui prend **la dernière** a perdu
    - **Le joueur commence**
    
    ---
    
    ## ⚠️ La théorie du jeu — à lire avant de coder
    
    C'est un jeu de Nim (variante misère), avec une **stratégie gagnante mathématiquement parfaite**. Implémenté sans précaution, **le joueur ne peut jamais gagner**.
    
    ### La règle
    
    Avec 17 cannes, en retirant 1 à 3, le perdant étant celui qui prend la dernière :
    
    **Le coup gagnant consiste toujours à laisser à l'adversaire un nombre de cannes égal à 4n + 1.**
    Soit : **1, 5, 9, 13, 17.**
    
    Comme il y a 17 cannes au départ et que **le joueur commence**, le joueur est déjà en position perdante face à un adversaire parfait. C'est exactement pour ça que Mixapéro doit se tromper.
    
    ### Fonction utilitaire
    
    ```
    coupOptimal(cannesRestantes):
        reste = (cannesRestantes - 1) mod 4
        si reste == 0 :
            retourner aléatoire(1, 2, 3)   // position perdue, on joue au hasard
        sinon :
            retourner reste                 // coup gagnant
    ```
    
    ---
    
    ## Le comportement de Mixapéro
    
    **Il joue optimalement à tous ses tours, SAUF à son 2ᵉ tour, où il se trompe volontairement.**
    
    ```
    jouerTourMixapero(cannesRestantes, numeroDuTour):
    
        si numeroDuTour == 2 :
            retourner coupVolontairementRate(cannesRestantes)
    
        retourner coupOptimal(cannesRestantes)
    ```
    
    ```
    coupVolontairementRate(cannesRestantes):
        // Choisit un coup qui laisse au joueur une position GAGNANTE (4n+1)
        optimal = coupOptimal(cannesRestantes)
        coupsPossibles = [1, 2, 3] sauf optimal
        // Préférer le coup qui donne au joueur la position gagnante la plus nette
        retourner celui des coupsPossibles qui laisse (cannesRestantes - coup - 1) mod 4 == 0
                 sinon aléatoire parmi coupsPossibles
    ```
    
    > **Ces deux fonctions doivent porter exactement ces noms**, être isolées dans un fichier dédié et commentées en français. Ce sont elles qu'on ajustera si le jeu se révèle trop facile ou trop dur.
    > 
    
    ### Conséquence
    
    Après l'erreur volontaire du 2ᵉ tour, le joueur est en position gagnante. **Mais il doit encore jouer correctement pour l'exploiter** — s'il se trompe, Mixapéro reprend l'avantage et gagne. La victoire reste méritée.
    
    ---
    
    ## ⭐ L'indice de stratégie
    
    **À partir de la 2ᵉ partie** (c'est-à-dire après une première défaite), Mixapéro « se vante » et lâche un indice sur la stratégie. Il ne le fait **jamais pendant la première partie** : la joueuse doit d'abord perdre pour que l'aide ait du sens.
    
    L'indice s'affiche **une fois par partie**, au début du tour de la joueuse, à partir de la partie 2.
    
    ### Formulations possibles (une seule par partie, dans l'ordre)
    
    **Partie 2 :**
    
    > « Tu veux savoir mon secret ? Je compte. Tout le temps. Je regarde combien il en reste et je fais mon petit calcul. »
    > 
    
    **Partie 3 :**
    
    > « Allez, je suis bon prince. Ce qui compte, c'est pas combien j'en prends. C'est combien j'en laisse. »
    > 
    
    **Partie 4 :**
    
    > « Bon. Puisque tu insistes. Les nombres que j'aime bien laisser sur la table, c'est 13, 9, 5… tu vois la logique ? »
    > 
    
    **Partie 5 et suivantes :**
    
    > « Un, cinq, neuf, treize, dix-sept. Laisse-moi un de ces nombres-là et je suis coincé. Voilà, je t'ai tout dit, t'es content ? »
    > 
    
    > L'indice devient de plus en plus explicite. À la partie 5, la stratégie est donnée en clair — c'est voulu, ça évite le blocage définitif juste avant l'abandon proposé au 5ᵉ échec.
    > 
    
    Le compteur de parties est **le même que le compteur d'échecs**, sauvegardé en local.
    
    ---
    
    ## Déroulé d'un tour
    
    ### Tour du joueur
    
    1. Les cannes restantes sont affichées
    2. Il touche **1, 2 ou 3 cannes** pour les sélectionner (surbrillance CSS)
    3. Il retouche une canne sélectionnée pour la désélectionner
    4. Un bouton **"Retirer"** valide le coup — désactivé si aucune sélection
    5. Les cannes disparaissent avec une animation, son `sfx-jeu4-canne.mp3`
    
    ### Tour de Mixapéro
    
    1. **Délai de réflexion de 1 à 2 secondes** (aléatoire) — sinon il joue instantanément et ça casse l'illusion
    2. Une bulle de dialogue affiche un commentaire
    3. Ses cannes disparaissent avec la même animation
    
    ---
    
    ## Commentaires de Mixapéro
    
    ### Pendant la partie (piochés au hasard)
    
    - « J'en prends deux. Comme ça. Sans réfléchir. »
    - « Hop. »
    - « Tu vois, moi je calcule. »
    - « Prends ton temps, j'ai l'éternité et un foie en verre. »
    - « Intéressant, ce que tu viens de faire. Vraiment intéressant. »
    
    ### À son 2ᵉ tour, quand il se trompe volontairement
    
    > « Allez, j'en prends… celle-là. »
    > 
    > 
    > ⚠️ *Ne surtout pas signaler que c'est une erreur. La joueuse ne doit pas savoir qu'on lui laisse une ouverture.*
    > 
    
    ### Quand la joueuse est en position gagnante
    
    - « Hmm. »
    - « Attends. Attends attends attends. »
    
    ### Quand Mixapéro gagne
    
    > « Ha ! La dernière est pour toi. Je te l'avais dit, je joue à ça depuis longtemps. »
    > 
    
    ---
    
    ## Interface
    
    - **En haut :** nombre de cannes restantes (`17 cannes`) et à qui est le tour
    - **Au centre :** les cannes alignées, cliquables. Sur 2 rangées si l'écran est trop étroit.
    - **En bas :** bouton **"Retirer"** + rappel permanent de la règle : *« 1, 2 ou 3 cannes. Celui qui prend la dernière perd. »*
    
    > Le rappel de la règle doit rester visible **en permanence** — c'est un jeu dont on oublie la règle en cours de partie.
    > 
    
    ---
    
    ## Condition de victoire
    
    Mixapéro est obligé de prendre la dernière canne.
    
    ## Condition de défaite
    
    La joueuse prend la dernière canne. La partie se relance, compteur d'échecs incrémenté, et l'indice de stratégie de la partie suivante s'affiche.
    
    ## Échecs
    
    Au **5ᵉ échec**, la proposition d'abandon apparaît. La joueuse peut refuser et continuer.
    
    > C'est le jeu où le seuil de 5 échecs a le plus de chances d'être atteint. Avec les indices progressifs, elle devrait avoir compris la stratégie avant d'en arriver là.
    > 
    
    ---
    
    ## Paramètres configurables
    
    ```
    NOMBRE_CANNES_DEPART   = 17
    RETRAIT_MIN            = 1
    RETRAIT_MAX            = 3
    JOUEUR_COMMENCE        = true
    TOUR_ERREUR_VOLONTAIRE = 2      // 0 pour désactiver (IA parfaite, imbattable)
    PARTIE_DEBUT_INDICES   = 2      // première partie où l'indice s'affiche
    DELAI_REFLEXION_MIN    = 1000   // ms
    DELAI_REFLEXION_MAX    = 2000   // ms
    SEUIL_ABANDON          = 5
    ```
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu4.webp` | Fond |
    | `img-jeu4-canne.png` | Une canne à sucre |
    | `img-jeu4-table.png` | Support *(optionnel)* |
    | `sfx-jeu4-canne.mp3` | Canne retirée |
    | `sfx-victoire.mp3` | Victoire |
    | `sfx-echec.mp3` | Défaite |
    
    > L'état "sélectionnée" est généré en CSS, pas besoin d'un second asset.
    > 
    
    ---
    
    ## Notes techniques
    
    - Toute la logique est **synchrone et déterministe**, sauf le hasard des coups perdants. C'est le jeu le plus simple à tester : quelques tests unitaires sur `coupOptimal()` évitent les bugs de stratégie.
    - Vérifier que la joueuse ne peut jamais retirer plus de cannes qu'il n'en reste.
    - Après la victoire, ne pas relancer automatiquement : afficher l'écran de fin.
    
    ---
    
    ## Points à trancher
    
    Aucun — tout est acté.