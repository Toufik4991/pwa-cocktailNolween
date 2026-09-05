# Sans titre

- Liste des assets à créer
    
    # Liste des assets à créer — "Pina Tresolada"
    
    *Version 3 — 6 décors + 3 expressions, sans vidéos*
    
    Dépose tout **en vrac dans le dossier `ici/`**. Claude Code trie, renomme, convertit et range automatiquement.
    
    ---
    
    ## Règles de nommage
    
    - **Tout en minuscules**, sans accents, sans espaces, sans caractères spéciaux
    - Mots séparés par des **tirets** ()
    - Préfixes : `sfx-` (sons), `mus-` (musiques), `img-` (images), `bg-` (fonds), `ico-` (icônes), `ui-` (interface), `font-` (polices)
    - Numérotation sur **2 chiffres** : `01`, `02`… (pas `1`, `2`)
    
    **Formats**
    
    | Type | Format | Note |
    | --- | --- | --- |
    | Images avec transparence | `.png` | Personnages, objets, icônes |
    | Fonds et photos | `.webp` | Bien plus léger, important pour une PWA mobile |
    | Sons | `.mp3` | Léger, compatible partout |
    | Icônes PWA | `.png` | Carré, fond opaque |
    | Polices | `.woff2` |  |
    
    ---
    
    ## 1. ⭐ Les 6 décors — mise à jour du 05/09/2026 : ce ne sont plus des images
    
    **Aucun fichier `bg-decor-*` n'est plus attendu.** Les décors des séquences texte sont désormais des **aplats de couleur** définis en variables CSS directement dans le code :
    
    | Univers | Couleur | Utilisé pour |
    | --- | --- | --- |
    | `bar` | `#FFF0C4` | Ouverture, jeu 0, finale |
    | `agrumes` | `#E4F2BE` | Jeu 1 |
    | `bulles` | `#FFDCE3` | Jeu 2 |
    | `givre` | `#D8ECF6` | Jeu 3 |
    | `sucre` | `#FFD6AE` | Jeu 4 |
    | `secret` | `#E2DCC2` | Jeu 5 |
    
    Couleur de texte : `#3A2415`. Couleur d'accent : `#FF6A45`.
    
    > Conséquence : Mixapéro porte tout l'écran (au moins 60 % de hauteur) et reçoit une ombre portée douce pour se détacher du fond.
    >
    
    ---
    
    ## 2. ⭐ Les 3 expressions de Mixapéro
    
    En PNG transparent, superposées sur les décors. **C'est le cœur de l'effet vivant.**
    
    | Fichier | Expression | Quand |
    | --- | --- | --- |
    | `img-mixapero-neutre.png` | Il parle, il explique | Par défaut |
    | `img-mixapero-content.png` | Ravi, fier, ému | Victoires, moments chaleureux |
    | `img-mixapero-moqueur.png` | Sourire en coin, taquin | Piques et provocations |
    
    > PNG transparent, hauteur ~1400 px.
    **⚠️ Point critique : garde exactement le même cadrage, la même taille et la même position du corps sur les trois images.** Seuls le visage et éventuellement les bras changent. C'est ce décalage minimal qui crée l'illusion d'animation ; si la position change, ça fait un saut désagréable.
    > 
    
    ---
    
    ## 3. Sons — effets
    
    ### 3.1 Bulles (Jeu 2)
    
    | Fichier | Description |
    | --- | --- |
    | `sfx-bulle-01.mp3` | Bulle 1 (grave) |
    | `sfx-bulle-02.mp3` | Bulle 2 |
    | `sfx-bulle-03.mp3` | Bulle 3 |
    | `sfx-bulle-04.mp3` | Bulle 4 (aiguë) |
    
    > Courts (< 1 s), de hauteurs différentes pour être mémorisables à l'oreille.
    > 
    
    ### 3.2 Interface
    
    | Fichier | Description |
    | --- | --- |
    | `sfx-clic.mp3` | Clic sur un bouton |
    | `sfx-texte.mp3` | Bip de la machine à écrire *(très court — il sera joué très souvent, évite un son agaçant)* |
    | `sfx-code-ok.mp3` | Code correct |
    | `sfx-code-faux.mp3` | Code incorrect |
    | `sfx-deblocage.mp3` | Déblocage d'une étape |
    | `sfx-victoire.mp3` | Mini-jeu réussi |
    | `sfx-echec.mp3` | Mini-jeu raté |
    | `sfx-final.mp3` | Fanfare de fin |
    
    ### 3.3 Jeux
    
    | Fichier | Jeu |
    | --- | --- |
    | `sfx-jeu1-tranche.mp3` | Fruit tranché |
    | `sfx-jeu1-erreur.mp3` | Mauvais fruit |
    | `sfx-jeu3-piece.mp3` | Pièce de puzzle échangée |
    | `sfx-jeu4-canne.mp3` | Canne à sucre retirée |
    | `sfx-jeu5-mot.mp3` | Mot caché trouvé |
    | `sfx-jeu5-piege.mp3` | **Mot piège "NOLWEEN" sélectionné** — petit son comique, bien distinct de celui d'un mot trouvé |
    | `sfx-jeu5-indice.mp3` | Charge d'indice utilisée |
    
    ---
    
    ## 4. Musiques — mise à jour du 05/09/2026 : deux fichiers seulement
    
    | Fichier | Où |
    | --- | --- |
    | `mus-narration.mp3` | Pendant les séquences de texte |
    | `mus-hub.mp3` | Partout ailleurs : accueil, saisie du pseudo, hub, page Réponses, les six mini-jeux et l'animation finale |
    
    Pendant un mini-jeu, `mus-hub` continue de jouer mais à volume fortement réduit (géré dans la config, pas un fichier séparé). `mus-accueil`, `mus-jeu` et `mus-final` ne sont plus nécessaires.
    
    > Doivent **boucler proprement** (pas de silence au raccord). 30 s à 2 min.
    > 
    
    ---
    
    ## 5. Fonds des écrans fixes
    
    | Fichier | Écran |
    | --- | --- |
    | `bg-accueil.webp` | Page de présentation |
    | `bg-pseudo.webp` | Saisie du pseudo |
    | `bg-hub.webp` | Hub |
    | `bg-reponses.webp` | Liste des réponses |
    | `bg-jeu0.webp` → `bg-jeu5.webp` | Fond pendant chaque mini-jeu (6 fichiers) |
    
    > Vertical 1080 × 1920 px.
    > 
    
    ---
    
    ## 6. Les Glaçants
    
    | Fichier | Description |
    | --- | --- |
    | `img-glacant-01.png` | Ennemi glaçant n°1 |
    | `img-glacant-02.png` | Ennemi glaçant n°2 |
    
    > Facultatif — pour décorer les décors `givre` et `bulles` si tu veux.
    > 
    
    ---
    
    ## 7. Boutons du hub
    
    Fichier
    
    ---
    
    ```
    img-bouton-jeu0.png
    ```
    
    ---
    
    ```
    img-bouton-jeu1.png
    ```
    
    ---
    
    ```
    img-bouton-jeu2.png
    ```
    
    ---
    
    ```
    img-bouton-jeu3.png
    ```
    
    ---
    
    ```
    img-bouton-jeu4.png
    ```
    
    ---
    
    ```
    img-bouton-jeu5.png
    ```
    
    ---
    
    ```
    img-bouton-reponses.png
    ```
    
    ---
    
    > Carré, 512 × 512 px, fond transparent.
    Les états grisé / brillant / validé sont générés en CSS — une seule image par bouton suffit.
    > 
    
    ---
    
    ## 8. Ingrédients
    
    | Fichier | Ingrédient |
    | --- | --- |
    | `img-ingredient-sirop.png` | Sirop de fruit (jeu 0) |
    | `img-ingredient-zeste.png` | Zestes d'agrumes (jeu 1) |
    | `img-ingredient-prosecco.png` | Bulles de Prosecco (jeu 2) |
    | `img-ingredient-glacon.png` | Glaçon (jeu 3) |
    | `img-ingredient-canne.png` | Canne à sucre (jeu 4) |
    | `img-ingredient-secret.png` | Ingrédient secret / amertume (jeu 5) |
    
    > PNG transparent, 512 × 512 px.
    La version verrouillée (silhouette grise) est générée en CSS à partir de la même image.
    > 
    
    ---
    
    ## 9. Assets des mini-jeux
    
    ### Jeu 0 — "Cocktail, qui suis-je ?"
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu0-carte-indice.png` | Cadre d'affichage des indices |
    | `img-jeu0-silhouette.png` | **Silhouette mystère générique** — un verre indéfini, sans forme reconnaissable |
    | `img-jeu0-mojito.png` | Mojito révélé |
    | `img-jeu0-pinacolada.png` | Piña Colada révélée |
    | `img-jeu0-daiquiri.png` | Daiquiri révélé |
    | `img-jeu0-margarita.png` | Margarita révélée |
    | `img-jeu0-pornstarmartini.png` | Pornstar Martini révélé |
    
    > ⚠️ **Une seule silhouette pour les cinq cocktails.** Si elle avait la forme du bon verre, elle donnerait la réponse.
    La silhouette occupe 40 % de la hauteur de l'écran : prévois-la en **1024 px de haut minimum**, PNG transparent.
    > 
    
    ### Jeu 1 — "Zeste Ninja"
    
    **Les agrumes** (ceux qui rapportent) :
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu1-citronvert-entier.png` | Citron vert entier |
    | `img-jeu1-citronvert-coupe.png` | Citron vert tranché |
    | `img-jeu1-citronjaune-entier.png` | Citron jaune entier |
    | `img-jeu1-citronjaune-coupe.png` | Citron jaune tranché |
    | `img-jeu1-orange-entier.png` | Orange entière |
    | `img-jeu1-orange-coupe.png` | Orange tranchée |
    
    **Les leurres** (jamais demandés, ils font perdre du temps) :
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu1-kiwi-entier.png` | Kiwi entier |
    | `img-jeu1-kiwi-coupe.png` | Kiwi tranché |
    | `img-jeu1-banane-entier.png` | Banane entière |
    | `img-jeu1-banane-coupe.png` | Banane tranchée |
    
    **Effets** :
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu1-trainee.png` | Traînée de lame |
    | `img-jeu1-eclaboussure.png` | Jus projeté |
    
    **Accessoire** *(ajouté le 05/09/2026)* :
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu1-zesteur.png` | L'arme de découpe — suit le doigt du joueur pendant le tranchage, 200 × 200 px |
    
    > PNG transparent, ~300 × 300 px par fruit.
    ⚠️ **Les 5 fruits doivent être très distincts en petit format et en mouvement.** Un citron jaune et une banane peuvent se confondre en pleine action : joue sur les formes autant que sur les couleurs.
    > 
    
    ### Jeu 2 — "Des bulles ?"
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu2-bulle-01.png` → `img-jeu2-bulle-04.png` | Les 4 bulles au repos |
    | `img-jeu2-verre.png` | Flûte décorative |
    
    > L'état illuminé est géré en CSS.
    > 
    
    ### Jeu 3 — "Fait frisquet ici nn ?"
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu3-puzzle.webp` | **L'image à découper** — carrée, 1024 × 1024 px minimum |
    
    > Une seule image entière : c'est le code qui la découpe en **4 × 4 = 16 pièces**.
    ⚠️ **L'image doit avoir du détail réparti partout.** Un glaçon blanc sur fond blanc donne 16 pièces identiques et un puzzle impossible. Prévois des reflets, des couleurs, un décor autour.
    > 
    
    ### Jeu 4 — "Jeu de canne"
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu4-canne.png` | Canne à sucre verticale |
    | `img-jeu4-table.png` | Support / table *(optionnel)* |
    
    > ~120 × 500 px pour une canne.
    > 
    
    ### Jeu 5 — "L'ingrédient secret"
    
    | Fichier | Description |
    | --- | --- |
    | `img-jeu5-grille-fond.png` | Texture de la grille |
    | `img-jeu5-charge-pleine.png` | Charge d'indice disponible |
    | `img-jeu5-charge-vide.png` | Charge d'indice consommée |
    
    ---
    
    ## 10. Photos des lieux IRL
    
    **5 photos** (la 6ᵉ n'existe pas : gagner l'étape 5 mène directement à la fin).
    
    | Fichier | Révélé après |
    | --- | --- |
    | `img-lieu-01-a.webp` / `img-lieu-01-b.webp` | Étape 0 |
    | `img-lieu-02-a.webp` / `img-lieu-02-b.webp` | Étape 1 |
    | `img-lieu-03-a.webp` / `img-lieu-03-b.webp` | Étape 2 |
    | `img-lieu-04-a.webp` / `img-lieu-04-b.webp` | Étape 3 |
    | `img-lieu-05-a.webp` / `img-lieu-05-b.webp` | Étape 4 |
    
    > La version `-b` est facultative (deuxième photo ou indice complémentaire).
    **Le code doit être visible sur la photo** — c'est comme ça que le joueur le récupère sur place.
    > 
    
    ---
    
    ## 11. Animation finale
    
    | Fichier | Description |
    | --- | --- |
    | `img-final-verre-vide.png` | Le verre vide |
    | `img-final-cocktail.png` | **Le cocktail terminé**, lumineux |
    | `img-final-halo.png` | Halo lumineux |
    | `img-final-etincelles.png` | Particules / paillettes |
    
    > Les ingrédients qui tombent réutilisent les `img-ingredient-*.png`.
    > 
    
    ---
    
    ## 12. Identité & PWA
    
    ### L'icône : un smiley cocktail 🍹
    
    L'icône de la PWA est un **smiley cocktail** : un verre de cocktail avec un visage souriant. C'est ce que la joueuse verra sur son écran d'accueil, c'est donc l'asset le plus vu de tout le projet.
    
    **Contraintes à respecter :**
    
    - **Carré**, avec un **fond opaque** (pas de transparence — iOS remplit le fond en noir sinon)
    - Le motif doit rester lisible à **48 × 48 px** : pas de détail fin, pas de texte
    - Contraste fort entre le verre et le fond
    - Le même visuel décliné en 3 tailles
    
    | Fichier | Taille | Description |
    | --- | --- | --- |
    | `ico-192.png` | 192 × 192 px | Icône PWA standard |
    | `ico-512.png` | 512 × 512 px | Icône PWA haute résolution |
    | `ico-maskable-512.png` | 512 × 512 px | Version "maskable" — même motif mais **réduit à 60 % au centre**, avec 20 % de marge de sécurité tout autour. Android rogne les icônes en cercle ou en carré arrondi selon le téléphone ; sans cette marge, le verre est amputé. |
    | `ico-favicon.png` | 64 × 64 px | Onglet du navigateur |
    
    ### Le reste
    
    | Fichier | Description |
    | --- | --- |
    | `img-logo-pinatresolada.png` | Logo / titre, PNG transparent |
    | `img-splash.webp` | Écran de démarrage, 1080 × 1920 |
    
    ---
    
    ## 13. Interface *(optionnel)*
    
    Si non fournis, Claude Code les génère en CSS.
    
    | Fichier | Description |
    | --- | --- |
    | `ui-cadre-modale.png` | Cadre des fenêtres |
    | `ui-cadre-texte.png` | Cadre du bloc de dialogue |
    | `ui-icone-son-on.png` / `ui-icone-son-off.png` | Son activé / coupé |
    | `ui-icone-menu.png` | Menu burger |
    | `ui-icone-suivant.png` | Flèche "Suivant" |
    | `ui-icone-passer.png` | Flèche "Passer la séquence" |
    | `ui-icone-quitter.png` | Quitter vers le hub |
    | `ui-icone-cadenas.png` | Étape verrouillée |
    | `ui-icone-valide.png` | Étape terminée |
    
    ---
    
    ## 14. Polices
    
    | Fichier | Usage |
    | --- | --- |
    | `font-titre.woff2` | Titres |
    | `font-texte.woff2` | Texte courant et dialogues |
    
    > Vérifie la licence pour un usage web. Google Fonts est le plus simple si tu n'as rien de précis en tête.
    > 
    
    ---
    
    ## Récapitulatif *(mis à jour le 05/09/2026)*
    
    | Catégorie | Nb de fichiers |
    | --- | --- |
    | Décors | 0 — remplacés par des couleurs CSS, voir section 1 |
    | Expressions de Mixapéro | 3 |
    | Sons SFX | 18 *(le total précédent de 19 comptait un fichier de trop)* |
    | Musiques | 2 *(réduites de 5 à 2, voir section 4)* |
    | Fonds d'écrans fixes | 10 |
    | Glaçants *(optionnel)* | 2 |
    | Boutons du hub | 7 |
    | Ingrédients | 6 |
    | Assets de jeux | 28 *(ajout de `img-jeu1-zesteur.png`)* |
    | Photos de lieux | 5 à 10 |
    | Animation finale | 4 |
    | Identité & PWA | 6 |
    | Interface *(optionnel, CSS sinon)* | 9 |
    | Polices *(Google Fonts sinon)* | 2 |
    | **TOTAL** | **~95** — dont **~75 vraiment nécessaires** |
    
    ---
    
    ## Style visuel
    
    **Solaire, minimaliste, coloré.** Palette chaude — jaunes, oranges, corail, avec une touche de vert agrume et de rose. Aplats de couleur franche plutôt que dégradés compliqués, formes simples, beaucoup de respiration.
    
    Garde cette direction cohérente sur l'ensemble des assets : c'est ce qui fera que l'app aura l'air d'un tout, même si les fichiers sont produits à des moments différents.
    
    ---
    
    ## Par où commencer
    
    Pour avoir une version jouable au plus vite :
    
    1. `ico-192.png`, `ico-512.png`, `ico-maskable-512.png` — le smiley cocktail, pour que la PWA existe sur l'écran d'accueil
    2. Les **3 expressions de Mixapéro** — sans elles, aucune séquence narrative (les décors sont désormais des couleurs CSS, rien à fournir)
    3. Les 4 `sfx-bulle-*.mp3` — le seul jeu qui ne fonctionne pas sans son
    4. `img-jeu3-puzzle.webp` — le seul jeu qui ne fonctionne pas sans image
    5. Les 6 `img-bouton-jeu*.png` — le cœur visuel du hub
    6. Les 5 `img-lieu-0*-a.webp` — sans elles, la chasse n'a pas d'indices
    7. `img-jeu0-silhouette.png` + les 5 cocktails révélés — le premier jeu que la joueuse verra
    
    Tout le reste peut rester en placeholder et être remplacé au fur et à mesure.
    
    ---
    
    ## Où déposer
    
    **Tout en vrac dans `ici/`** à la racine du projet. Claude Code range vers :
    
    ```
    /public/assets
      /audio    → sfx-*.mp3, mus-*.mp3
      /images   → img-*, bg-*
      /icons    → ico-*, ui-*
      /fonts    → font-*.woff2
    ```
    
    Puis produit `ASSETS-INVENTAIRE.md` listant ce qui a été trouvé, ce qui manque, et ce qui pose problème.