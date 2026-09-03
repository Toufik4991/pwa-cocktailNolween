# Sans titre

- Jeu 5 — "L'ingrédient secret"
    
    # Jeu 5 — "L'ingrédient secret"
    
    **Ingrédient débloqué :** l'ingrédient secret (l'amertume)
    **Dossier :** `/games/jeu-5-ingredient-secret`**Code d'entrée :** `V4H7`
    
    ---
    
    ## Objectif du joueur
    
    Trouver **5 mots cachés** dans une grille de lettres. **Les mots ne sont pas donnés** — c'est toute la difficulté.
    
    ---
    
    ## Les mots
    
    ### Les 5 mots à trouver
    
    | Mot | Longueur |
    | --- | --- |
    | VERMOUTH | 8 |
    | EPICES | 6 |
    | BITTERS | 7 |
    | HERBES | 6 |
    | SHRUB | 5 |
    
    ### ⭐ Le mot piège
    
    | Mot | Longueur |
    | --- | --- |
    | NOLWEEN | 7 |
    
    **NOLWEEN est également placé dans la grille**, mais il **ne compte pas** comme un mot à trouver.
    
    Quand la joueuse le sélectionne :
    
    - Le tracé **clignote brièvement puis disparaît** — il ne reste pas surligné
    - Un message de Mixapéro s'affiche :
        
        > « Non c'est pas ça qu'on recherche ahah ! T'es pas un ingrédient mystère enfin ! »
        > 
    - **Aucune pénalité**, aucun compteur incrémenté
    - Le compteur `Mots trouvés` reste inchangé
    - Son : `sfx-jeu5-piege.mp3` *(petit son comique, différent de celui d'un mot trouvé)*
    
    Le message ne peut apparaître **qu'une fois toutes les 3 secondes**, pour éviter le spam si la joueuse le sélectionne en boucle.
    
    > **Détail à soigner :** le mot piège doit rester détectable **même après avoir été trouvé une première fois**. Le message se rejoue à chaque sélection (avec le délai anti-spam), c'est le sel de la blague.
    > 
    
    > Les mots sont écrits **en majuscules et sans accents** dans la grille (`EPICES`, pas `ÉPICES`).
    > 
    
    ---
    
    ## La grille
    
    - Taille **12 × 12** *(décidé — nécessaire pour caser 6 mots dont un de 8 lettres)*
    - Les 6 mots (5 vrais + le piège) y sont placés, les cases restantes remplies de lettres aléatoires
    - **Directions autorisées :** horizontale (→), verticale (↓), diagonale descendante (↘)
    - **Pas de mots à l'envers.** Sans liste de mots à chercher, les lire à l'envers serait quasi impossible.
    - Les mots **peuvent se croiser** en partageant une lettre
    
    ### Génération
    
    ⚠️ **La grille est générée une seule fois et figée dans le fichier de configuration.**
    
    Raisons :
    
    - Une grille générée à la volée peut créer par hasard un mot lisible absent de la liste, et embrouiller la joueuse
    - Une grille figée est testable, vérifiable, modifiable à la main
    - Le système d'indices dépend de positions connues
    
    Claude Code doit donc générer une grille valide **une fois**, la vérifier, et l'écrire en dur dans la config avec les positions des 6 mots.
    
    ### Placement du mot piège
    
    NOLWEEN doit être **bien visible et facile à repérer** — idéalement à l'horizontale, dans la moitié haute de la grille. La blague ne fonctionne que si la joueuse tombe dessus rapidement.
    
    ### Remplissage
    
    Les lettres de remplissage doivent éviter de créer accidentellement d'autres mots français de 4 lettres ou plus. Un contrôle après génération suffit.
    
    ---
    
    ## Interaction
    
    1. La joueuse pose le doigt sur une lettre et **glisse** jusqu'à la dernière lettre du mot.
    2. Pendant le glissement, une **ligne de surbrillance** suit le tracé, contrainte aux 3 directions autorisées.
    3. Au relâchement :
        - **Mot correct** → tracé permanent coloré, son `sfx-jeu5-mot.mp3`, ajout à la liste des trouvés
        - **Mot piège (NOLWEEN)** → voir plus haut
        - **Mot incorrect** → tracé effacé en fondu, vibration légère si disponible, **aucune pénalité**
    
    > **Important :** une tentative ratée ne compte **pas** comme un échec. Sans liste de mots, la joueuse va essayer des dizaines de combinaisons.
    > 
    
    ---
    
    ## Le système d'indices
    
    - Bouton **"Indice"** avec **5 charges**, affichées en icônes (`img-jeu5-charge-pleine.png` / `img-jeu5-charge-vide.png`)
    - Chaque utilisation consomme une charge et affiche la **définition d'un mot non encore trouvé**, pendant **10 secondes**, puis elle disparaît
    - **Un seul indice par mot.** Une fois sa définition montrée, il ne ressort plus
    - Tirage : au hasard parmi les mots non trouvés dont l'indice n'a pas encore servi
    - **NOLWEEN n'a jamais d'indice** — il n'est pas dans le système
    - Charges épuisées → bouton grisé
    - Compte à rebours visible pendant les 10 secondes
    
    ### Les définitions
    
    | Mot | Définition affichée |
    | --- | --- |
    | VERMOUTH | Vin blanc aromatisé aux plantes et à l'absinthe. Il y en a du rouge, du blanc, du sec. Sans lui, pas de Martini. |
    | EPICES | Cannelle, cardamome, poivre, badiane. Ce qui réchauffe un verre sans le chauffer. |
    | BITTERS | Concentré très amer d'écorces et de racines. Quelques gouttes suffisent, et pourtant tout le cocktail en dépend. |
    | HERBES | Menthe, basilic, romarin, thym. On les froisse, on les claque dans la main, et le parfum se libère. |
    | SHRUB | Sirop de fruits au vinaigre, une vieille méthode de conservation devenue ingrédient de bar. |
    
    > Les définitions ne contiennent jamais le mot lui-même, mais donnent assez de contexte pour le deviner.
    > 
    
    ---
    
    ## Interface
    
    - **En haut :** progression `Mots trouvés : 2 / 5`
    - **Au centre :** la grille 12 × 12, occupant toute la largeur disponible
    - **En bas :** les mots trouvés s'affichent au fur et à mesure. Les non-trouvés apparaissent en tirets indiquant leur **longueur** : `_ _ _ _ _ _ _ _`
    - **En bas à droite :** bouton "Indice" et ses 5 charges
    
    > ⚠️ Les tirets de longueur affichent **5 emplacements**, pas 6. NOLWEEN ne doit pas y apparaître, sinon la blague est éventée avant même d'avoir eu lieu.
    > 
    
    ---
    
    ## Condition de victoire
    
    Les 5 vrais mots trouvés. NOLWEEN n'entre jamais dans le décompte. Enchaîne directement sur la séquence de fin du jeu 5.
    
    ---
    
    ## Condition d'échec
    
    **Aucune.** Pas de mécanique d'abandon au 5ᵉ échec. À la place, un bouton **"J'abandonne"** discret, accessible après **5 minutes**.
    
    ---
    
    ## Paramètres configurables
    
    ```
    GRILLE_LARGEUR         = 12
    GRILLE_HAUTEUR         = 12
    NOMBRE_CHARGES_INDICE  = 5
    DUREE_AFFICHAGE_INDICE = 10     // secondes
    DIRECTIONS_AUTORISEES  = ["horizontale", "verticale", "diagonale_bas"]
    AFFICHER_LONGUEURS     = true
    DELAI_ANTI_SPAM_PIEGE  = 3      // secondes
    DELAI_BOUTON_ABANDON   = 300    // secondes
    ```
    
    La grille figée, les 6 mots, leurs positions, les définitions et le message du piège sont aussi dans la config.
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu5.webp` | Fond |
    | `img-jeu5-grille-fond.png` | Texture de la grille |
    | `img-jeu5-charge-pleine.png` | Charge disponible |
    | `img-jeu5-charge-vide.png` | Charge consommée |
    | `sfx-jeu5-mot.mp3` | Mot trouvé |
    | `sfx-jeu5-piege.mp3` | **Mot piège sélectionné** — son comique |
    | `sfx-jeu5-indice.mp3` | Charge utilisée |
    | `sfx-victoire.mp3` | 5 mots trouvés |
    
    ---
    
    ## Notes techniques
    
    - Grille 12 × 12 sur un écran de 380 px → cases d'environ **28 px**. Petit, mais acceptable puisqu'on **glisse** au lieu de taper précisément. Prévoir une zone de détection un peu plus large que la case affichée.
    - Empêcher le **scroll de la page** pendant le glissement (`touch-action: none` sur la grille), sinon le geste fait défiler l'écran.
    - Le tracé se contraint aux directions autorisées : si la joueuse s'écarte, projeter sur la direction la plus proche plutôt qu'annuler.
    - La détection du mot piège doit se faire **avant** la vérification des vrais mots, pour éviter tout conflit si NOLWEEN croise un autre mot.
    
    ---
    
    ## Points à trancher
    
    Aucun — la grille 12 × 12, l'affichage des longueurs et le mot piège sont actés.