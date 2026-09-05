# Sans titre

- Jeu 0 — "Cocktail, qui suis-je ?”
    
    # Jeu 0 — "Cocktail, qui suis-je ?"
    
    **Ingrédient débloqué :** sirop de fruit
    **Dossier :** `/games/jeu-0-cocktail-qui-suis-je`**Particularité :** seule étape qui **ne demande aucun code d'entrée**.
    
    ---
    
    ## Objectif du joueur
    
    Deviner le nom d'un cocktail à partir d'indices qui se dévoilent un par un.
    
    ---
    
    ## Déroulé
    
    1. Un cocktail est **tiré au sort** parmi les 5 de la liste au lancement du jeu.
    2. Le **premier indice** s'affiche, avec un champ de saisie.
    3. Le joueur tape une réponse et valide.
    4. **Bonne réponse** → victoire immédiate, quel que soit le nombre d'indices vus.
    5. **Mauvaise réponse** → réplique taquine de Mixapéro, et **l'indice suivant se dévoile**. Les indices précédents restent visibles, empilés.
    6. Quand tous les indices du cocktail sont dévoilés, le joueur peut continuer à tenter sa chance indéfiniment.
    7. Au **5ᵉ échec**, la proposition d'abandon apparaît.
    
    ---
    
    ## Interface
    
    ⚠️ **La silhouette du cocktail doit être GRANDE et CENTRALE**, pas reléguée en fond ou en coin. C'est l'élément visuel principal du jeu.
    
    Disposition, de haut en bas :
    
    1. **Compteur d'indices** (`Indice 2 / 5`) — petit, en haut
    2. **La silhouette du cocktail** — au centre, occupant environ **40 % de la hauteur de l'écran**, bien détourée et lisible
    3. **La pile d'indices dévoilés** — le plus récent mis en avant, les précédents plus petits et atténués. Zone défilable si nécessaire.
    4. **Le champ de saisie** + bouton **"Répondre"** — en bas
    
    À la victoire, la silhouette laisse place à l'image du cocktail révélé, avec une transition en fondu et un effet lumineux.
    
    > Si la pile d'indices devient trop haute (5 indices), la silhouette peut se réduire légèrement, mais **jamais en dessous de 25 % de la hauteur**.
    > 
    
    ---
    
    ## Le bouton de levée du voile *(ajouté le 05/09/2026)*
    
    Un bouton permet d'entrevoir le cocktail caché sous la silhouette.
    
    - Libellé : **« Un coup d'œil »**
    - Au clic, la silhouette disparaît **exactement 2 secondes**, laissant voir le vrai cocktail, puis revient
    - Transition en fondu de **300 ms** à l'apparition comme à la disparition
    - Un **compte à rebours** reste visible pendant les 2 secondes
    - **Une seule utilisation par partie** : après usage, le bouton est grisé mais **reste visible**, pour que la joueuse sache qu'elle l'a déjà consommé
    - **Une nouvelle partie** (nouveau cocktail tiré au sort) **réinitialise la charge**
    - Son réutilisé : `sfx-jeu5-indice.mp3`
    - Réplique de Mixapéro à l'usage, par exemple : « Deux secondes. Pas une de plus. »
    
    Ce bouton ne remplace pas les indices textuels : c'est un raccourci visuel indépendant, disponible dès le premier indice.
    
    ---
    
    ## Validation de la réponse
    
    La saisie doit être tolérante :
    
    - Ignorer la **casse** (`mojito` = `Mojito` = `MOJITO`)
    - Ignorer les **accents** (`caipirinha` = `caïpirinha`, `pina` = `piña`)
    - Ignorer les **espaces** en trop, avant, après et au milieu
    - Ignorer les **traits d'union** et **apostrophes**
    - Accepter une **liste d'alias** par cocktail
    
    En revanche, **pas de correspondance approximative** type "à une lettre près" : ça validerait des réponses fausses.
    
    ---
    
    ## Les 5 cocktails
    
    Un seul est tiré au sort par partie.
    
    ### A — Mojito *(5 indices)*
    
    | # | Indice |
    | --- | --- |
    | 1 | Je suis né à Cuba, et je sens le jardin après la pluie. |
    | 2 | On me pile, on me froisse, on me martyrise — et c'est comme ça que je donne le meilleur. |
    | 3 | Il me faut du blanc, du vert, du sucre et des bulles. |
    | 4 | Mon herbe préférée, c'est la menthe. |
    | 5 | Hemingway m'a beaucoup aimé. Peut-être trop. |
    
    **Réponse :** `mojito` · **Alias :** `le mojito`
    
    ### B — Piña Colada *(5 indices)*
    
    | # | Indice |
    | --- | --- |
    | 1 | Je suis crémeux, sucré, et je sens les vacances. |
    | 2 | Porto Rico me revendique comme boisson nationale. |
    | 3 | Il me faut de la noix de coco. |
    | 4 | Et de l'ananas. Beaucoup d'ananas. |
    | 5 | Mon nom veut littéralement dire "ananas filtré". |
    
    **Réponse :** `pina colada` · **Alias :** `piña colada`, `pinacolada`, `pina-colada`
    
    ### C — Daiquiri *(5 indices)*
    
    | # | Indice |
    | --- | --- |
    | 1 | Trois ingrédients. Pas un de plus. Je suis la simplicité même. |
    | 2 | Je porte le nom d'une plage cubaine. |
    | 3 | Du rhum blanc. |
    | 4 | Du citron vert, et un peu de sucre. C'est tout. |
    | 5 | Si tu me mets au blender avec des fraises, je deviens beaucoup moins sérieux. |
    
    **Réponse :** `daiquiri`
    
    ### D — Margarita *(5 indices)*
    
    | # | Indice |
    | --- | --- |
    | 1 | Je porte une couronne de sel, et j'en suis très fier. |
    | 2 | Je viens du Mexique, quelque part entre Tijuana et la légende. |
    | 3 | Ma base, c'est la tequila. |
    | 4 | J'y ajoute du citron vert et une liqueur d'orange. |
    | 5 | Mon nom, c'est un prénom de femme. Personne ne sait vraiment laquelle. |
    
    **Réponse :** `margarita` · **Alias :** `la margarita`
    
    ### E — Pornstar Martini *(1 seul indice)* ⭐
    
    | # | Indice |
    | --- | --- |
    | 1 | Ton top 3 cocktail !!!! |
    
    **Réponse :** `pornstar martini` · **Alias :** `pornstar`, `porn star martini`, `pornstarmartini`
    
    > ⚠️ **Ce cocktail n'a qu'un seul indice, c'est volontaire** — c'est une blague personnelle adressée à la joueuse. Le moteur doit donc gérer un **nombre d'indices variable selon le cocktail**, pas une valeur fixe à 5.
    > 
    > 
    > S'il est tiré au sort et que la joueuse se trompe, il n'y a plus d'indice à dévoiler : afficher à la place une réplique de Mixapéro qui s'agace gentiment (voir plus bas).
    > 
    
    ---
    
    ## Répliques en cas de mauvaise réponse
    
    ### Quand il reste des indices
    
    - « Non. Voilà un indice de plus, puisque visiblement il en faut. »
    - « Alors ça, c'est même pas un cocktail. »
    - « Tu chauffes. Enfin non. Tu refroidis. »
    - « Je te donne un coup de main, mais je le fais à contrecœur. »
    - « Essaie encore. J'ai toute la soirée, je suis liquide. »
    
    ### Quand il n'y a plus d'indice à donner
    
    - « J'ai plus rien à te dire. Débrouille-toi. »
    - « Réfléchis. Vraiment. Je peux pas t'aider plus. »
    - « Tu es la seule personne à pouvoir trouver ça, je te le promets. »
    
    ---
    
    ## Paramètres configurables
    
    ```
    TIRAGE_ALEATOIRE   = true
    SEUIL_ABANDON      = 5
    DUREE_LEVEE_VOILE  = 2      // secondes
    CHARGES_LEVEE_VOILE = 1     // par partie
    FONDU_VOILE        = 300    // ms
    ```
    
    Le nombre d'indices n'est **pas** un paramètre global : il dépend de chaque cocktail et se déduit de la longueur de sa liste d'indices.
    
    ---
    
    ## Condition de victoire
    
    Réponse correcte saisie. Le nombre d'indices utilisés n'a aucune incidence : pas de score, pas de pénalité.
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu0.webp` | Fond |
    | `img-jeu0-carte-indice.png` | Cadre d'affichage d'un indice |
    | `img-jeu0-silhouette.png` | **Silhouette mystère générique** (un verre indéfini, sans forme reconnaissable) |
    | `img-jeu0-mojito.png` | Mojito révélé |
    | `img-jeu0-pinacolada.png` | Piña Colada révélée |
    | `img-jeu0-daiquiri.png` | Daiquiri révélé |
    | `img-jeu0-margarita.png` | Margarita révélée |
    | `img-jeu0-pornstarmartini.png` | Pornstar Martini révélé |
    | `sfx-clic.mp3` | Validation |
    | `sfx-code-faux.mp3` | Mauvaise réponse |
    | `sfx-victoire.mp3` | Bonne réponse |
    | `sfx-jeu5-indice.mp3` | Réutilisé pour le bouton « Un coup d'œil » *(ajouté le 05/09/2026)* |
    
    > ⚠️ **La silhouette est générique, pas une par cocktail.** Si elle avait la forme du bon verre, elle donnerait la réponse. Un seul fichier suffit.
    > 
    
    ---
    
    ## Points à trancher
    
    Aucun — le tirage au sort (avec sa chance sur cinq de tomber sur le Pornstar Martini) et le contenu des cinq cocktails sont actés.