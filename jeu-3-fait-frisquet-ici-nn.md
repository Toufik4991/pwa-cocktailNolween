# Sans titre

- Jeu 3 — "Fait frisquet ici nn ?”
    
    # Jeu 3 — "Fait frisquet ici nn ?"
    
    **Ingrédient débloqué :** glaçon
    **Dossier :** `/games/jeu-3-fait-frisquet-ici-nn`**Code d'entrée :** `Q6P1`
    
    ---
    
    ## Objectif du joueur
    
    Reconstituer une image découpée en pièces, en échangeant les pièces deux à deux.
    
    ---
    
    ## Principe
    
    L'image `img-jeu3-puzzle.webp` est découpée automatiquement par le code en une grille de **4 × 4 = 16 pièces**. Les pièces sont mélangées. Le joueur touche deux pièces pour les **échanger de place**, jusqu'à reconstituer l'image.
    
    > **Mécanique "tap to swap", pas glisser-déposer.** Bien plus fiable au doigt sur mobile, et ça évite le scroll accidentel.
    > 
    
    ---
    
    ## Découpage
    
    - Grille **4 × 4** (16 pièces)
    - L'image source doit être **carrée**, 1024 × 1024 px minimum
    - Découpage fait par le code : `background-position` décalé par pièce, ou découpage canvas. Aucun asset découpé à fournir.
    - Espacement de 2-3 px entre les pièces pour distinguer la grille
    
    ---
    
    ## Mélange initial
    
    ⚠️ **Deux règles à respecter :**
    
    1. **Aucune pièce à sa place** au démarrage. Un mélange purement aléatoire peut en laisser plusieurs bien placées.
    2. **Minimum 8 échanges nécessaires** pour résoudre (contre 4 en 3×3). Vérifier après mélange, remélanger sinon.
    
    > Contrairement au taquin, **tous les mélanges sont résolubles** ici puisqu'on échange librement deux pièces quelconques. Pas de problème de parité.
    > 
    
    ---
    
    ## Interaction
    
    1. Le joueur touche une première pièce → **sélectionnée** : contour lumineux + léger agrandissement.
    2. Il touche une deuxième pièce → **échange** avec animation de 250 ms, son `sfx-jeu3-piece.mp3`.
    3. Il retouche la pièce sélectionnée → **désélection**, aucun échange.
    4. Le compteur de coups s'incrémente à chaque échange.
    
    ---
    
    ## Interface
    
    - **En haut :** compteur de coups (`Échanges : 7`)
    - **En haut à droite :** bouton **"Voir le modèle"** — maintenir appuyé affiche l'image complète en surimpression, relâcher la fait disparaître
    - **Au centre :** la grille, occupant la largeur de l'écran moins une marge
    - Pas de liseré d'aide sur les pièces bien placées
    
    ---
    
    ## Condition de victoire
    
    Les 16 pièces à leur position d'origine.
    
    À la victoire :
    
    - Les espacements disparaissent en fondu, l'image devient continue
    - Effet de brillance qui balaie l'image
    - Son `sfx-victoire.mp3`
    
    ---
    
    ## Condition d'échec
    
    **Aucune.** Ni chronomètre, ni limite de coups. Le joueur ne peut pas perdre.
    
    > **Conséquence :** la mécanique d'abandon au 5ᵉ échec ne s'applique pas. À la place, un bouton **"J'abandonne"** discret, accessible après **4 minutes** (le 4×4 est nettement plus long que le 3×3).
    > 
    
    ---
    
    ## Paramètres configurables
    
    ```
    GRILLE_TAILLE          = 4     // 4 = 4x4 (16 pièces)
    ESPACEMENT_PIECES      = 3     // px
    DUREE_ANIMATION_SWAP   = 250   // ms
    MELANGE_MIN_ECHANGES   = 8
    AIDE_PIECE_PLACEE      = false
    DELAI_BOUTON_ABANDON   = 240   // secondes
    ```
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu3.webp` | Fond |
    | `img-jeu3-puzzle.webp` | **L'image à découper** — la seule indispensable |
    | `sfx-jeu3-piece.mp3` | Échange de pièces |
    | `sfx-victoire.mp3` | Puzzle résolu |
    
    ---
    
    ## Notes techniques
    
    - Si `img-jeu3-puzzle.webp` n'est pas fournie, générer un **placeholder numéroté** (chaque pièce affiche son numéro) : le jeu reste testable.
    - La grille s'adapte à la largeur d'écran en restant carrée.
    - **Zones tactiles :** en 4×4 sur un écran de 380 px de large avec marges, chaque pièce fait environ **85 px**. C'est acceptable mais serré — ne pas réduire les marges davantage.
    - ⚠️ **L'image choisie doit avoir du détail réparti sur toute sa surface.** Un glaçon blanc sur fond blanc donne 16 pièces identiques et un puzzle impossible. Prévoir des variations de couleur, des reflets, un décor autour.
    
    ---
    
    ## Points à trancher
    
    Aucun — le 4×4 est acté.