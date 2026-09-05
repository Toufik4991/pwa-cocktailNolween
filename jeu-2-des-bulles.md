# Sans titre

- Jeu 2 — "Des bulles ?"
    
    # Jeu 2 — "Des bulles ?"
    
    **Ingrédient débloqué :** bulles de Prosecco
    **Dossier :** `/games/jeu-2-des-bulles`**Code d'entrée :** `L3M8`
    
    ---
    
    ## Objectif du joueur
    
    Mémoriser et reproduire une séquence de bulles qui s'allonge à chaque tour, jusqu'à atteindre une longueur de **6**.
    
    ---
    
    ## Principe
    
    Quatre bulles à l'écran, chacune associée à un son différent. Le jeu joue une séquence, le joueur la répète en touchant les bulles dans le même ordre. C'est un **Simon** classique, habillé prosecco.
    
    ---
    
    ## Disposition
    
    Les 4 bulles, en losange ou en carré, bien espacées (cibles tactiles d'au moins 80 × 80 px) :
    
    | Bulle | Asset | Son |
    | --- | --- | --- |
    | 1 | `img-jeu2-bulle-01.png` | `sfx-bulle-01.mp3` (grave) |
    | 2 | `img-jeu2-bulle-02.png` | `sfx-bulle-02.mp3` |
    | 3 | `img-jeu2-bulle-03.png` | `sfx-bulle-03.mp3` |
    | 4 | `img-jeu2-bulle-04.png` | `sfx-bulle-04.mp3` (aiguë) |
    
    L'état "allumé" est généré en **CSS** : luminosité augmentée + agrandissement (scale 1.1). Aucun asset supplémentaire.
    
    Une flûte décorative (`img-jeu2-verre.png`) peut habiller le bas ou le côté.
    
    ---
    
    ## Déroulé d'un tour
    
    1. **Phase d'écoute** — les bulles s'allument une par une dans l'ordre. Les contrôles sont désactivés.
    2. **Phase de répétition** — au joueur de rejouer la séquence. Chaque appui allume la bulle et joue son son.
    3. Séquence reproduite entièrement → **pause de 0,8 s**, puis nouveau tour avec **une bulle de plus**.
    4. Erreur → voir plus bas.
    
    ---
    
    ## Progression et vitesse
    
    La séquence commence à **3 bulles** et s'allonge d'une par tour jusqu'à **6**. Quatre tours au total.
    
    | Tour | Longueur | Durée d'allumage | Pause entre bulles |
    | --- | --- | --- | --- |
    | 1 | 3 | 600 ms | 300 ms |
    | 2 | 4 | 520 ms | 270 ms |
    | 3 | 5 | 440 ms | 240 ms |
    | 4 | 6 | 360 ms | 210 ms |
    
    > **La séquence est cumulative** : on reprend la même et on y ajoute une bulle, comme dans le Simon original. C'est ce qui rend la mémorisation possible. Ne pas générer une séquence entièrement nouvelle à chaque tour.
    > 
    
    ---
    
    ## En cas d'erreur
    
    - Toutes les bulles clignotent en rouge, son `sfx-echec.mp3`
    - Réplique de Mixapéro
    - **Le joueur reprend au même tour, avec la même séquence** — il ne repart pas à zéro
    - Le compteur d'échecs s'incrémente
    
    ### Répliques
    
    - « Nan. Écoute mieux. »
    - « C'était pas celle-là. Je recommence, mais je soupire. »
    - « Tes oreilles sont en vacances ? »
    - « Allez, encore une fois. Concentre-toi. »
    
    ---
    
    ## Condition de victoire
    
    Le tour de longueur **6** reproduit correctement.
    
    ## Échecs
    
    Au **5ᵉ échec**, la proposition d'abandon apparaît (« Je réessaie » / « Passe à la suite »). Le joueur peut refuser et continuer indéfiniment.
    
    ---
    
    ## Cas particulier : son coupé
    
    ⚠️ **Point important.** Si le joueur a désactivé le son, ce jeu devient **injouable** — c'est le seul des six dans ce cas.
    
    Deux protections :
    
    1. Au lancement, si le son est coupé, afficher :
        
        > « Euh. Tu comptes reconnaître des bulles sans le son ? Je te conseille de le rallumer. »
        avec un bouton **"Activer le son"** et un bouton **"Continuer quand même"**.
        > 
    2. Le retour visuel doit être assez net pour que le jeu reste faisable à l'œil seul.
    
    ---
    
    ## Musique de fond : silence total *(ajouté le 05/09/2026)*
    
    Contrairement aux autres jeux (où la musique unique `mus-hub` continue à volume réduit), le jeu 2 la coupe **complètement** : la moindre musique en fond gênerait la distinction des 4 hauteurs à mémoriser.
    
    - À l'entrée dans le jeu : fondu de sortie de 400 ms jusqu'au silence total
    - À la sortie du jeu : fondu de retour de 800 ms vers le volume normal
    - La piste continue de tourner en silence entre-temps, elle n'est jamais mise en pause ni redémarrée
    
    ---
    
    ## Paramètres configurables
    
    ```
    LONGUEUR_DEPART        = 3
    LONGUEUR_VICTOIRE      = 6
    DUREE_ALLUMAGE_DEPART  = 600   // ms
    DUREE_ALLUMAGE_MIN     = 360   // ms
    PAUSE_DEPART           = 300   // ms
    PAUSE_MIN              = 210   // ms
    REPRISE_APRES_ERREUR   = "meme_tour"   // ou "tour_precedent"
    SEUIL_ABANDON          = 5
    ```
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu2.webp` | Fond |
    | `img-jeu2-bulle-01.png` → `-04.png` | Les 4 bulles |
    | `img-jeu2-verre.png` | Décor |
    | `sfx-bulle-01.mp3` → `-04.mp3` | Sons des bulles |
    | `sfx-echec.mp3` | Erreur |
    | `sfx-victoire.mp3` | Victoire |
    
    ---
    
    ## Notes techniques
    
    - **Précharger les 4 sons** au lancement. Un son chargé à la volée arrive en retard et casse la mémorisation.
    - Sur iOS, l'audio ne démarre qu'après une **première interaction utilisateur**. Prévoir un bouton "Commencer" qui déclenche l'initialisation audio.
    - Le joueur ne doit **pas** pouvoir appuyer pendant la phase d'écoute — désactiver les contrôles.
    
    ---
    
    ## Points à trancher
    
    Aucun — la longueur de victoire à 6 et la reprise au même tour sont actées.