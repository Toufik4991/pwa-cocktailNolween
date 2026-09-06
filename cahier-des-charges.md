# Sans titre

- Cahier des charges
    
    # Cahier des charges — PWA "Pina Tresolada"
    
    *Version 3 — toutes les décisions tranchées*
    
    ---
    
    ## 0. Identité du projet
    
    - **Nom affiché :** Pina Tresolada
    - **Nom du dépôt / de la PWA :** `pwa-cocktailNolween`
        
        > ⚠️ Le mélange majuscules/minuscules dans un nom de dépôt peut provoquer des erreurs de chemin sur les serveurs Linux. Claude Code doit donc veiller à ce qu'**aucun chemin de fichier interne** au projet ne dépende de cette casse : tous les fichiers et dossiers créés à l'intérieur du projet restent en minuscules.
        > 
    
    ---
    
    ## 1. Contexte
    
    PWA de chasse au trésor en extérieur (IRL), utilisable sur mobile. Interface simple mais entièrement stylisable.
    
    **Personnage principal :** **Mixapéro** — mi-humain, mi-cocktail, moqueur.
    **Antagonistes :** Les Glaçants, qui lui ont volé cinq de ses six ingrédients et les ont scellés dans des blocs de glace, chacun gardé par une épreuve *(raison ajoutée le 06/09/2026, voir §3 ter — comblait un trou narratif)*.
    **Le sixième ingrédient** n'a pas été volé : Mixapéro l'a oublié, et le joueur le retrouve en fouillant sa mémoire (jeu 5).
    
    Le scénario complet et tous les dialogues sont dans le document **`scenario.md`** *(anciennement référencé `2-scenario.md` dans ce document — nom corrigé le 06/09/2026 pour correspondre au fichier réel)*.
    
    ---
    
    ## 2. Structure des pages
    
    ### 2.1 Page de présentation (accueil)
    
    - Titre **"Pina Tresolada"**
    - **Blocage de 5 secondes** avant de pouvoir continuer : le bouton de démarrage est inactif pendant 5 s puis s'active.
    - Afficher pendant ce temps un **indicateur visible** (cercle qui se remplit ou barre de progression), sinon le joueur croit que l'app est plantée.
    
    ### 2.2 Page d'inscription du pseudo
    
    - Champ de saisie, accroche : **"Ton pseudo... ou ton cocktail préféré ?"**
    - Pseudo sauvegardé en local, réutilisé dans les dialogues via `{pseudo}`
    
    ### 2.3 Page Hub
    
    - **Menu déroulant** :
        - Activer / désactiver le son
        - Affichage et modification du pseudo
        - Réinitialiser la partie (avec confirmation)
        - Progression : **X / 6**
    - **Zone centrale :** 6 boutons numérotés (0 à 5), illustrés
    - **Bouton central "Réponses" :** voir §2.4. Les étapes non résolues sont verrouillées et non consultables.
    
    ### 2.4 Page Réponses
    
    Pour chaque étape **résolue**, afficher :
    
    - Le numéro et le nom du jeu
    - L'ingrédient récupéré (image + nom)
    - La ou les **photos du lieu suivant** (zoomables, voir §9.5), chacune dans un **cadre** (fond blanc, coins arrondis, bordure fine, ombre douce, photo en `object-fit: contain` sans débordement — ajouté le 06/09/2026, la photo s'affichait nue auparavant)
    - Une mention discrète si l'étape a été **passée** plutôt que gagnée
    
    Pour chaque étape **non résolue** : une carte grisée avec un cadenas et le message « Rien à voir ici. Va la gagner d'abord. »
    
    ⚠️ **L'étape 5 n'a pas de photo de lieu** (elle mène à la fin). Sa carte affiche seulement l'ingrédient secret.
    
    ### États visuels des boutons
    
    - Verrouillé : grisé
    - Disponible : brillant
    - Complété : validé
    
    ---
    
    ## 2 bis. Direction artistique
    
    **Style validé : solaire, minimaliste, coloré.**
    
    Concrètement :
    
    - **Palette chaude et lumineuse** — jaunes, oranges, corail, avec une touche de vert agrume et de rose. Pas de fond sombre, pas d'ambiance nocturne.
    - **Minimalisme** — beaucoup d'espace vide, peu d'éléments à l'écran, hiérarchie claire. Pas de textures lourdes, pas de bordures ornementées, pas d'effets de relief.
    - **Aplats de couleur franche** plutôt que dégradés complexes. Un dégradé doux en fond est acceptable, pas plus.
    - **Coins arrondis** généreux sur les boutons et les cartes.
    - **Ombres douces et diffuses**, jamais dures ni marquées.
    - **Typographie** : une police ronde et lisible, en graisse épaisse (titres 800-900, texte courant 600 minimum — jamais un sans-serif fin). Texte courant confortable, base à 18,4 px *(+15 % le 06/09/2026, était 16 px)*, dialogues des séquences narratives et personnage à l'écran encore agrandis (×1,5) par-dessus cette base.
    - **Contraste élevé** entre texte et fond : l'app se joue dehors, en plein soleil.
    
    L'interface doit rester **discrète par rapport aux fonds d'écran fournis par le maître du jeu** : c'est eux qui portent l'identité visuelle, l'interface les habille sans les concurrencer. Les blocs de texte des séquences narratives sont donc semi-transparents ou en aplat clair léger, pas des cadres opaques et chargés.
    
    Toute la charte est centralisée dans des **variables CSS** en un seul fichier, pour pouvoir tout restyler sans toucher au reste.
    
    **Claude Code ne doit pas poser de questions supplémentaires sur le style** : cette direction suffit. En cas de doute sur un détail, choisir l'option la plus simple et la plus sobre.
    
    ### Mise à jour du 05/09/2026 — les décors deviennent des couleurs
    
    Les 6 décors des séquences texte ne sont plus des images mais des **aplats de couleur unis**, définis en variables CSS :
    
    | Univers | Couleur |
    | --- | --- |
    | `bar` | `#FFF0C4` |
    | `agrumes` | `#E4F2BE` |
    | `bulles` | `#FFDCE3` |
    | `givre` | `#D8ECF6` |
    | `sucre` | `#FFD6AE` |
    | `secret` | `#E2DCC2` |
    
    Couleur de texte : `#3A2415`. Couleur d'accent (boutons, éléments actifs) : `#FF6A45`.
    
    Aucun fichier `bg-decor-*` n'est nécessaire ni attendu : ils sont retirés de la liste des assets (voir `assets-a-fournir.md`).
    
    ---
    
    ## 3. Séquences texte
    
    **Pas de vidéo.** Les moments narratifs sont des séquences de pages de texte.
    
    ### Déroulé
    
    1. Clic sur le bouton de l'étape → saisie du code *(sauf étape 0, voir §5.1)*
    2. Code correct → **séquence texte d'introduction**
    3. Fin de la séquence → bouton **"Commencer le jeu"**
    4. Le mini-jeu se lance
    5. Jeu gagné → bouton **"Suivant"** → **séquence texte de fin**
    6. Fin de la séquence → bouton **"Retour au hub"**
    
    ### Anatomie d'un écran
    
    - **Décor** en fond plein écran (couleur unie, voir §2 bis)
    - **Mixapéro** superposé par-dessus (PNG transparent), occupant au moins **60 % de la hauteur** de l'écran, avec une **ombre portée douce** pour se détacher du fond — indispensable sur les décors clairs (ex. `bar`, `#FFF0C4`) où ses zones claires se fondraient sinon dans l'arrière-plan
    - **Bloc de texte** (dialogue)
    - Bouton **"Suivant"** en bas
    - **Flèche en haut à droite** pour passer toute la séquence
    - **Bouton "Quitter"** pour revenir au hub à tout moment
    
    ### Système décor + personnage
    
    Le décor est un **aplat de couleur CSS** (§2 bis), le personnage une **image PNG transparente** superposée. Il n'y a que :
    
    - **6 couleurs de décor** (une par univers de jeu), en variables CSS
    - **6 expressions de Mixapéro** *(mise à jour du 06/09/2026 : 3 nouvelles s'ajoutent aux 3 d'origine)* : `neutre`, `content`, `moqueur`, `diabolique`, `triste`, `rêveur`
    
    Chaque écran du scénario indique la couleur de décor et l'expression à utiliser. Ça permet 41 écrans distincts avec seulement 6 fichiers image (les 6 expressions) + les couleurs.
    
    **Important :** les 6 expressions doivent avoir exactement le **même cadrage et la même position dans l'image**, pour que le changement d'expression donne une impression d'animation et non de saut.
    
    ### Mini-jeux : même couleur de décor que leur séquence texte *(mise à jour du 06/09/2026)*
    
    L'écran du mini-jeu lui-même reprend l'**aplat de couleur** de son univers (§2 bis), exactement comme les séquences d'intro/fin qui l'entourent — pas une photo dédiée. Ça évite la rupture visuelle "couleur unie → photo → couleur unie" en entrant/sortant du jeu. Les fichiers `bg-jeu0.webp` → `bg-jeu5.webp` prévus initialement pour ça ne sont plus utilisés.
    
    ### Effets à implémenter (aucun asset requis)
    
    - **Texte machine à écrire** : le texte s'écrit lettre par lettre. Un tap affiche tout immédiatement.
    - **Fondu enchaîné** de 200 ms lors d'un changement de couleur de décor.
    - **Fondu rapide** de 100 ms lors d'un changement d'expression.
    
    ### Reprise
    
    Si le joueur quitte en cours de séquence, il revient au hub. La séquence se rejoue s'il relance l'étape, mais **un code déjà validé n'est jamais redemandé**.
    
    ### 3 bis. Pourquoi une épreuve par ingrédient ? *(ajouté le 06/09/2026)*
    
    Les Glaçants n'ont pas seulement volé les six ingrédients : ils les ont **gelés chacun dans un bloc de glace scellé par une petite énigme**. Le froid ne cède qu'à celui qui la résout — c'est pour ça qu'un mini-jeu garde chaque ingrédient, et c'est pour ça que les Glaçants réapparaissent tout au long de la chasse (§3 ter). Expliqué à l'ouverture (nouvel écran après la présentation des Glaçants) et rappelé brièvement à l'intro du jeu 0.
    
    ### 3 ter. Apparitions furtives du Glaçant *(ajouté le 06/09/2026)*
    
    Pendant les jeux 0, 1, 2 et 3 (jamais 4 ni 5), le Glaçant traverse brièvement le décor — jamais interactif, toujours en arrière-plan derrière les éléments de jeu (jamais devant un fruit du jeu 1 ni une bulle du jeu 2).
    
    Deux images quasi identiques (seuls les yeux/la bouche changent) sont superposées à taille et position rigoureusement fixes pour donner l'impression que ses yeux bougent, sans le moindre saut :
    
    1. Glisse depuis un bord de l'écran jusqu'à un coin (600 ms), ou variante : traverse le haut de l'écran de gauche à droite (900 ms)
    2. Immobile, puis changement d'yeux pendant 1000 ms
    3. Retour à l'expression de départ (400 ms)
    4. Ressort par où il est arrivé (800 ms)
    
    Une seule apparition par partie, à un délai aléatoire entre 8 et 25 secondes après le début du mini-jeu. Respecte `prefers-reduced-motion` : dans ce cas, simple fondu, sans glissement.
    
    ---
    
    ## 4. Logique de jeu
    
    1. Le joueur clique sur le bouton de l'étape en cours
    2. Saisie du code *(sauf étape 0)*
    3. Code correct → séquence d'intro → mini-jeu
    4. Mini-jeu gagné → séquence de fin → déblocage :
        - de l'**image du lieu suivant** (consultable dans "Réponses")
        - du **bouton de l'étape suivante**
    5. Le joueur se rend sur place, y trouve le code caché sur l'indice
    6. Retour dans l'app, saisie du code, étape suivante
    7. Après la 6ᵉ étape → séquence finale + **animation du cocktail**
    
    ### En cas d'échec à un mini-jeu
    
    - Le joueur peut **relancer autant de fois qu'il veut**, sans jamais ressaisir le code.
    - Au **5ᵉ échec**, une proposition d'abandon apparaît : **« Je réessaie »** / **« Passe à la suite »**.
    - S'il abandonne, l'ingrédient est accordé et l'étape suivante se débloque normalement. La partie reste terminable à 6/6.
    - *(Suggestion : marquer discrètement l'étape comme "passée" plutôt que "gagnée" dans la page Réponses.)*
    
    ---
    
    ## 5. Décisions actées
    
    ### 5.1 L'étape 0 ne demande aucun code
    
    Le joueur est chez lui au démarrage, il n'a aucun code en main. L'étape 0 est donc **directement jouable** : pas de fenêtre de saisie. Le jeu 0 sert lui-même de test d'entrée.
    
    ### 5.2 Les codes
    
    **5 codes IRL** au total (étapes 1 à 5) :
    
    | Étape | Code | Où le trouver |
    | --- | --- | --- |
    | 0 | *(aucun)* | Jouable directement |
    | 1 | T7X4 | Sur le lieu révélé par l'étape 0 |
    | 2 | L3M8 | Sur le lieu révélé par l'étape 1 |
    | 3 | Q6P1 | Sur le lieu révélé par l'étape 2 |
    | 4 | Z9F2 | Sur le lieu révélé par l'étape 3 |
    | 5 | V4H7 | Sur le lieu révélé par l'étape 4 |
    
    Ces codes doivent être **regroupés dans un seul fichier de configuration** facilement modifiable, pas dispersés dans le code.
    
    ### 5.3 Les photos de lieux
    
    **5 photos** (lieux 1 à 5). Gagner l'étape 5 mène directement à la fin, sans nouveau lieu.
    
    ### 5.4 Après le jeu 5
    
    Le code enchaîne directement sur la **séquence finale + animation du cocktail**. Aucun "prochain lieu" ne doit être proposé.
    
    ---
    
    ## 6. Le dossier `ici/` — consignes pour Claude Code
    
    Un dossier **`ici/`** à la racine contient **tous les assets bruts** fournis par le maître du jeu : images, sons, icônes, en vrac, potentiellement mal nommés.
    
    ### Ce que Claude Code doit faire
    
    1. **Inventorier** `ici/` récursivement : nom, type, dimensions ou durée, poids de chaque fichier.
    2. **Identifier** chaque fichier en croisant son nom, son contenu, et la liste officielle (`3-assets-a-fournir.md`).
    3. **Renommer** selon la convention officielle.
    4. **Ranger** dans la structure cible :
        
        ```
        /public/assets  /audio    → sfx-*.mp3, mus-*.mp3  /images   → img-*, bg-*  /icons    → ico-*, ui-*  /fonts    → font-*
        ```
        
    5. **Convertir et optimiser** si nécessaire (images lourdes → WebP, sons non compressés → MP3).
    6. **Ne jamais supprimer** le contenu de `ici/` : copier, pas déplacer.
    7. **Produire un rapport** `ASSETS-INVENTAIRE.md` à la racine :
        - ✅ assets trouvés, reconnus et rangés (ancien nom → nouveau nom)
        - ❓ assets trouvés mais **non identifiables** avec certitude
        - ❌ assets **attendus mais manquants** (placeholder généré)
        - ⚠️ assets **problématiques** (poids, format, dimensions)
    8. **Générer un placeholder** pour tout asset manquant, visuellement identifiable comme tel (aplat de couleur + nom du fichier écrit dessus), pour que l'app reste testable même incomplète.
    9. **En cas de doute sur un fichier : ne pas deviner, demander.**
    
    ---
    
    ## 7. Les 6 mini-jeux
    
    ### Structure des fichiers
    
    Un dossier indépendant par jeu :
    
    ```
    /games
      /jeu-0-cocktail-qui-suis-je
      /jeu-1-zeste-ninja
      /jeu-2-des-bulles
      /jeu-3-fait-frisquet-ici-nn
      /jeu-4-jeu-de-canne
      /jeu-5-ingredient-secret
    ```
    
    ---
    
    ### Jeu 0 — "Cocktail, qui suis-je ?"
    
    *Ingrédient : **sirop de fruit***
    
    - Jeu de **devinettes** : des indices s'affichent progressivement
    - Le joueur devine le **nom du cocktail** et le saisit
    - Mauvaise réponse → message taquin de Mixapéro + indice suivant débloqué
    - **Aucun code d'entrée requis** pour cette étape
    - Bouton **"Un coup d'œil"** *(ajouté le 05/09/2026)* : dévoile le vrai cocktail pendant 2 secondes, une seule fois par partie — détail complet dans `jeu-0-cocktail-qui-suis-je.md`
    - Contenu des 5 cocktails et de leurs indices : voir `jeu-0-cocktail-qui-suis-je.md` (rédigé, ce n'est plus un placeholder)
    
    ### Jeu 1 — "Zeste Ninja"
    
    *Ingrédient : zestes d'agrumes*
    
    - Fruits qui défilent façon Fruit Ninja, tranchés au doigt
    - Consigne affichée en direct : **"Récolte 20g de citron vert maintenant !"**
    - Chaque fruit tranché = un poids (ex : 1 citron = 5g)
    - Mauvais fruit → réplique taquine piochée au hasard (liste dans le scénario)
    - Objectif : **150g cumulés**
    - Compteur de grammes et consigne visibles en permanence
    
    ### Jeu 2 — "Des bulles ?"
    
    *Ingrédient : bulles de Prosecco*
    
    - Jeu type **Simon** (mémorisation de séquence)
    - Sons : `sfx-bulle-01.mp3` à `sfx-bulle-04.mp3`
    - Les 4 bulles sont dessinées **entièrement en CSS** (06/09/2026) : cercle en dégradé radial, reflet blanc décalé, légère transparence ; l'état allumé = luminosité augmentée + `scale(1.1)`. Aucun asset image n'est nécessaire ni attendu pour elles. La flûte décorative est également en CSS (même raison : aucun asset fourni).
    
    ### Jeu 3 — "Fait frisquet ici nn ?"
    
    *Ingrédient : glaçon*
    
    - **Puzzle** à partir d'une image fournie, découpée automatiquement par le code
    - Mécanique **tap to swap** : toucher deux pièces pour les échanger
    
    ### Jeu 4 — "Jeu de canne"
    
    *Ingrédient : canne à sucre*
    
    - Jeu des bâtonnets de Fort Boyard, avec des cannes à sucre
    - Le joueur retire **1, 2 ou 3 cannes** par tour, en alternance avec Mixapéro
    - Celui qui prend la dernière canne perd
    - **⚠️ Mixapéro doit jouer volontairement mal à son 2ᵉ coup**, pour laisser au joueur une position gagnante. Le reste du temps il joue correctement (stratégie de Nim classique), pour que la victoire soit crédible et non offerte.
    - Ce comportement doit être isolé dans une fonction clairement nommée (ex : `coupVolontairementRate()`) pour être ajustable facilement.
    
    ### Jeu 5 — "L'ingrédient secret"
    
    *Ingrédient : ingrédient secret (l'amertume)*
    
    - Grille de **mots cachés**, les mots ne sont **pas donnés** au joueur :
    vermouth · épices · bitters · herbes · shrub
    - **Bouton indice à 5 charges** : chaque charge affiche la **définition** d'un mot pendant **10 secondes**, une seule fois par mot
    - Trouver les 5 mots fait revenir la mémoire de Mixapéro et révèle l'ingrédient secret
    
    ---
    
    ## 8. Animation finale
    
    - Les six ingrédients tombent un à un dans le verre, de façon animée
    - L'image du cocktail final apparaît en grand, au centre, avec un effet lumineux
    - Message de clôture par-dessus (texte dans le scénario)
    
    ### Après la fin
    
    - Un bouton **"Retour au hub"** ramène au hub, désormais entièrement complété (6/6)
    - Depuis ce hub terminé, la joueuse peut **rejouer n'importe quel mini-jeu** librement, et **revoir n'importe quelle séquence texte**
    - Un bouton **"Revoir la fin"** apparaît sur le hub pour rejouer l'animation finale
    - La progression reste à 6/6, rejouer ne la remet pas à zéro
    
    ---
    
    ## 9. Fonctions transverses
    
    ### 9.1 Mode test (indispensable) 🔧
    
    Le maître du jeu doit pouvoir tout tester **sans parcourir les vrais lieux**.
    
    Prévoir un **mode test caché**, activé par un geste discret sur la page d'accueil (par exemple : appuyer 7 fois sur le titre). Il ouvre un panneau permettant de :
    
    - Débloquer toutes les étapes d'un coup
    - Sauter directement à n'importe quel mini-jeu
    - Forcer la victoire du mini-jeu en cours
    - Rejouer n'importe quelle séquence texte
    - Afficher les 5 codes IRL
    - Voir l'état complet de la sauvegarde
    - Tout réinitialiser
    
    Ce mode ne doit **jamais être découvrable par accident**, et son activation doit être clairement indiquée à l'écran (bandeau "MODE TEST") pour éviter de croire à un bug.
    
    ### 9.2 Orientation et veille
    
    - L'app est **verrouillée en portrait**. Le paysage n'est pas prévu et casserait toutes les mises en page.
    - Utiliser la **Wake Lock API** pour empêcher l'écran de s'éteindre pendant un mini-jeu. Rien de plus agaçant qu'un écran qui s'éteint en pleine partie de Zeste Ninja.
    - Ne pas maintenir le wake lock sur le hub ou les séquences texte, pour économiser la batterie pendant les déplacements.
    
    ### 9.3 Page d'aide
    
    Accessible depuis le menu déroulant du hub. Elle contient :
    
    - Le rappel du principe : trouver les codes sur les lieux réels
    - Quoi faire si on est bloqué
    - Comment couper le son
    - Le fait que l'app fonctionne hors ligne
    
    ### 9.4 Installation de la PWA
    
    - Sur Android, proposer l'installation via l'événement `beforeinstallprompt`
    - Sur **iOS**, cet événement n'existe pas : afficher une petite notice expliquant la manipulation (bouton Partager → « Sur l'écran d'accueil »), avec une illustration
    - Cette notice ne s'affiche qu'une fois, et seulement si l'app n'est pas déjà installée
    
    ### 9.5 Consultation des photos de lieux
    
    - Les photos doivent être **zoomables** (pincement) et affichables en plein écran : le code y est écrit et doit rester lisible même en plein soleil
    - Prévoir un bouton pour **augmenter la luminosité de l'image** (filtre CSS), utile en extérieur
    
    ### 9.6 Sauvegarde et perte de données
    
    La progression est stockée en local. Si la joueuse vide son cache ou change de téléphone, **tout est perdu**.
    
    Prévoir dans le menu :
    
    - **"Exporter ma progression"** → génère un code court à noter
    - **"Restaurer une progression"** → champ pour saisir ce code
    
    C'est une sécurité simple qui évite un désastre le jour J.
    
    ### 9.7 Retour haptique
    
    Vibration courte (`navigator.vibrate`) sur : code correct, mot trouvé, pièce de puzzle échangée, fruit tranché. Désactivable avec le son dans le menu.
    
    ### 9.8 Musiques *(mise à jour du 06/09/2026 — 3 pistes, volume dédié au jeu et fondu à 800 ms)*
    
    **3 musiques**, une seule audible à la fois, en fondu enchaîné (~800 ms) :
    
    - `mus-hub` : accueil, saisie du pseudo, hub, séquences de texte, page Réponses
    - `mus-jeu` : pendant les 6 mini-jeux
    - `mus-final` : l'animation finale uniquement (pas les 2 écrans de dialogue qui la précèdent, qui restent sur `mus-hub` comme toute séquence texte)
    
    `mus-hub` et `mus-jeu` tournent en continu en arrière-plan dès le lancement de l'app et **ne redémarrent jamais** en changeant d'écran — si on quitte un mini-jeu puis en relance un autre, `mus-jeu` reprend là où elle en était, elle ne repart pas du début. `mus-final`, elle, **repart de 0:00 à chaque lancement de l'animation** (y compris en la rejouant depuis "Revoir la fin") — c'est le seul cas de redémarrage volontaire, pour l'effet dramatique.
    
    ```
    VOLUME_MUSIQUE_NORMAL = 0.6   // accueil, pseudo, hub, séquences texte, Réponses
    VOLUME_MUSIQUE_JEU    = 0.35  // pendant les mini-jeux (hors jeu 2), plus discret que le hub
    VOLUME_MUSIQUE_JEU2   = 0     // silence total pendant le jeu 2
    ```
    
    **Cas particulier du jeu 2 ("Des bulles ?")** : `mus-jeu` est coupée complètement, pas seulement baissée — le joueur doit mémoriser une mélodie de 4 hauteurs, la moindre musique de fond gênerait la distinction. Fondu de sortie de 400 ms à l'entrée dans le jeu, fondu de retour de 800 ms à la sortie. La piste continue de tourner en silence pendant ce temps et reprend là où elle en était, elle n'est jamais mise en pause.
    
    ---
    
    ## 10. Contraintes techniques
    
    - PWA installable (manifest + service worker), pensée **mobile en extérieur**
    - **Verrouillage en portrait**
    - Sauvegarde locale : progression, pseudo, réglages son et vibration, compteur d'échecs par jeu, étapes passées vs gagnées
    - Export / restauration de la progression par code court
    - Bouton "Réinitialiser la partie" avec confirmation
    - Thème centralisé (variables CSS) pour restyler facilement
    - Son et vibration activables/désactivables globalement
    - **Fonctionnement hors ligne obligatoire** : la chasse se déroule dehors, le réseau peut manquer. Tous les assets doivent être mis en cache par le service worker au premier chargement, y compris ceux des jeux non encore atteints.
    - Poids total visé : moins de 30 Mo
    - Fichier de configuration unique regroupant : codes, textes de séquences, contenu des jeux, grille de mots cachés, tous les paramètres de difficulté
    - Mode test caché (§9.1)