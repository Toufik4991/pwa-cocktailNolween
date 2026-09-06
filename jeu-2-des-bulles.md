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
    
    Les 4 bulles, en losange ou en carré, bien espacées (cibles tactiles d'au moins 80 × 80 px). **Dessinées entièrement en CSS** *(décidé le 06/09/2026 — aucun asset image n'a jamais été fourni pour elles, placeholders quasi invisibles retirés)* : cercle en dégradé radial (volume), reflet blanc décalé façon bulle de savon, légère transparence, chacune avec sa propre teinte :
    
    | Bulle | Teinte CSS | Son |
    | --- | --- | --- |
    | 1 | rose | `sfx-bulle-01.mp3` (grave) |
    | 2 | or champagne | `sfx-bulle-02.mp3` |
    | 3 | aqua | `sfx-bulle-03.mp3` |
    | 4 | lilas | `sfx-bulle-04.mp3` (aiguë) |
    
    L'état "allumé" : luminosité augmentée + agrandissement (`scale(1.1)`).
    
    Une flûte décorative habille le bas de l'écran, également dessinée en CSS (même raison : aucun asset fourni).
    
    ---
    
    ## Déroulé d'un tour
    
    1. **Phase d'écoute** — les bulles s'allument une par une dans l'ordre. Les contrôles sont désactivés.
    2. **Phase de répétition** — au joueur de rejouer la séquence. Chaque appui allume la bulle et joue son son.
    3. Séquence reproduite entièrement → **pause de 0,8 s**, puis nouveau tour avec **une bulle de plus**.
    4. Erreur → voir plus bas.
    
    ---
    
    ## Progression et vitesse
    
    La séquence commence à **3 bulles** et s'allonge d'une par tour jusqu'à **6**. Quatre tours au total.
    
    *(§E1, 06/09/2026 : pauses et allumages allongés — les bulles s'entrechoquaient et rendaient la séquence impossible à mémoriser. Table dérivée par interpolation linéaire des 4 constantes de la section "Paramètres configurables" ci-dessous, qui pilotent désormais réellement le jeu.)*
    
    | Tour | Longueur | Durée d'allumage | Pause entre bulles |
    | --- | --- | --- | --- |
    | 1 | 3 | 650 ms | 550 ms |
    | 2 | 4 | 583 ms | 500 ms |
    | 3 | 5 | 517 ms | 450 ms |
    | 4 | 6 | 450 ms | 400 ms |
    
    > **La séquence est cumulative** : on reprend la même et on y ajoute une bulle, comme dans le Simon original. C'est ce qui rend la mémorisation possible. Ne pas générer une séquence entièrement nouvelle à chaque tour.
    > 
    
    Une pause supplémentaire de **700 ms** (`PAUSE_FIN_ECOUTE`) sépare la fin de la démonstration jouée par le jeu du moment où le joueur peut répondre, pour ne pas confondre la dernière bulle de la démo avec sa propre première réponse.
    
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
    
    ## Musique de fond : silence total *(ajouté le 05/09/2026, précisé le soir même — 3 pistes)*
    
    Contrairement aux autres jeux (où `mus-jeu` joue normalement), le jeu 2 la coupe **complètement** : la moindre musique en fond gênerait la distinction des 4 hauteurs à mémoriser.
    
    - À l'entrée dans le jeu : fondu de sortie de 400 ms jusqu'au silence total
    - À la sortie du jeu : fondu de retour de 800 ms vers le volume normal
    - La piste continue de tourner en silence entre-temps, elle n'est jamais mise en pause ni redémarrée
    
    ---
    
    ## Paramètres configurables
    
    ```
    LONGUEUR_DEPART        = 3
    LONGUEUR_VICTOIRE      = 6
    DUREE_ALLUMAGE_DEPART  = 650   // ms  (§E1, 06/09/2026 : 600 -> 650)
    DUREE_ALLUMAGE_MIN     = 450   // ms  (§E1 : 360 -> 450)
    PAUSE_DEPART           = 550   // ms  (§E1 : 300 -> 550)
    PAUSE_MIN              = 400   // ms  (§E1 : 210 -> 400)
    PAUSE_FIN_ECOUTE       = 700   // ms  (§E1, nouveau)
    REPRISE_APRES_ERREUR   = "meme_tour"   // ou "tour_precedent"
    SEUIL_ABANDON          = 5
    ```
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | *(aucun — décor en aplat de couleur `--decor-bulles`)* | Fond, depuis le 06/09/2026 : même couleur que les séquences texte de ce jeu, plus de `bg-jeu2.webp` (voir cahier des charges §2 bis) |
    | *(aucun — CSS)* | Les 4 bulles et la flûte décorative, voir §Disposition |
    | `sfx-bulle-01.mp3` → `-04.mp3` | Sons des bulles |
    | `sfx-echec.mp3` | Erreur |
    | `sfx-victoire.mp3` | Victoire |
    
    ---
    
    ## Notes techniques
    
    - **Précharger les 4 sons** au lancement. Un son chargé à la volée arrive en retard et casse la mémorisation.
    - Sur iOS, l'audio ne démarre qu'après une **première interaction utilisateur**. Prévoir un bouton "Commencer" qui déclenche l'initialisation audio.
    - Le joueur ne doit **pas** pouvoir appuyer pendant la phase d'écoute — désactiver les contrôles.
    - **Couper explicitement le son de bulle précédent avant d'en jouer un nouveau** *(§E1, 06/09/2026)* : chaque son est un clone audio indépendant, mais si le timing devient serré (par ex. une pause raccourcie manuellement dans les paramètres ci-dessus), rien n'empêchait auparavant deux sons de se chevaucher. Le code garde une référence au dernier son de bulle joué et le met en pause avant de lancer le suivant.
    - Durée réelle mesurée des 4 fichiers (06/09/2026) : `sfx-bulle-01.mp3` **3,74 s**, `sfx-bulle-02.mp3` **0,72 s**, `sfx-bulle-03.mp3` **0,82 s**, `sfx-bulle-04.mp3` **0,67 s**. Les 4 dépassent les 500 ms visés — `sfx-bulle-01` de très loin (presque 4 secondes). Tant qu'un fichier dépasse la pause qui le suit, sa fin est coupée nette par le son suivant (cf. point ci-dessus) plutôt que de se superposer, mais pour un rendu propre ces 4 fichiers gagneraient à être raccourcis à la source.
    
    ---
    
    ## Points à trancher
    
    Aucun côté logique — la longueur de victoire à 6 et la reprise au même tour sont actées. Reste ouvert : raccourcir les 4 fichiers `sfx-bulle-*.mp3` à la source (voir Notes techniques).