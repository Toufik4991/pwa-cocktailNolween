# Sans titre

- Jeu 0 — "Cocktail, qui suis-je ?”
    
    # Jeu 0 — "Cocktail, qui suis-je ?"
    
    **Ingrédient débloqué :** sirop de fruit
    **Dossier :** `/games/jeu-0-cocktail-qui-suis-je`**Particularité :** seule étape qui **ne demande aucun code d'entrée**.
    
    ---
    
    ## Objectif du joueur
    
    Deviner le nom d'un cocktail à partir d'indices qui se dévoilent un par un.
    
    ---
    
    ## Déroulé *(mis à jour le 06/09/2026, §C1 — annule l'ancienne règle "un seul cocktail suffit")*
    
    1. Les **5 cocktails sont à trouver un par un**, dans un **ordre tiré au sort** à chaque partie (jamais deux fois le même ordre).
    2. Un compteur de progression reste visible en haut : « Cocktail 3 / 5 ».
    3. Le **premier indice** du cocktail en cours s'affiche, avec un champ de saisie.
    4. Le joueur tape une réponse et valide.
    5. **Bonne réponse** → courte transition (réplique de Mixapéro) puis le cocktail suivant démarre, avec ses propres indices repartant de zéro. Sur le 5ᵉ et dernier cocktail, une bonne réponse valide directement l'étape et renvoie au hub.
    6. **Mauvaise réponse** → réplique taquine de Mixapéro, et **l'indice suivant se dévoile**. Les indices précédents restent visibles, empilés.
    7. Quand tous les indices du cocktail en cours sont dévoilés, le joueur peut continuer à tenter sa chance indéfiniment.
    8. Au **5ᵉ échec cumulé** (tous cocktails confondus), la proposition d'abandon apparaît.
    
    ---
    
    ## Interface *(mise à jour le 06/09/2026, §C2)*
    
    ⚠️ **La silhouette détourée a été retirée**, sans remplacement : le détourage rendait mal et cassait l'ambiance. L'espace ainsi libéré revient aux indices et au champ de réponse.
    
    Disposition, de haut en bas :
    
    1. **Compteur de progression** (`Cocktail 3 / 5`) puis **compteur d'indices** (`Indice 2 / 5`) — en haut
    2. Le bouton **« Un coup d'œil »**
    3. **La pile d'indices dévoilés** — le plus récent mis en avant, les précédents plus petits et atténués. Zone défilable, agrandie depuis le retrait de la silhouette.
    4. **Le champ de saisie** + bouton **"Répondre"** — en bas
    
    À la victoire du dernier cocktail, transition normale vers la séquence de fin du jeu (pas d'effet spécifique dans l'écran de jeu lui-même).
    
    ---
    
    ## Le bouton "Un coup d'œil" *(revu le 06/09/2026, §C3 — remplace l'ancien comportement "lève la silhouette")*
    
    Sans silhouette ni voile à soulever, le bouton montre directement une image du **vrai cocktail en cours**, brièvement.
    
    - Libellé : **« Un coup d'œil »**
    - Au clic, l'image du cocktail en cours apparaît en plein écran (fondu) pendant **exactement 2 secondes**, puis disparaît
    - Transition en fondu de **300 ms** à l'apparition comme à la disparition
    - Un **compte à rebours** reste visible pendant les 2 secondes
    - **Une utilisation par cocktail** (donc jusqu'à 5 par partie) : après usage, le bouton est grisé jusqu'au cocktail suivant, où il redevient disponible
    - Son réutilisé : `sfx-jeu5-indice.mp3`
    - Réplique de Mixapéro à l'usage, par exemple : « Deux secondes. Pas une de plus. »
    
    Ce bouton ne remplace pas les indices textuels : c'est un raccourci visuel indépendant, disponible dès le premier indice de chaque cocktail.
    
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
    
    Tous les 5 sont à trouver, un par un, dans un ordre tiré au sort à chaque partie *(§C1, 06/09/2026)*.
    
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
    
    ## Répliques de transition entre deux cocktails *(ajouté le 06/09/2026, §C1)*
    
    - « Un de plus. File, le suivant t'attend. »
    - « Pas mal. On enchaîne. »
    - « Bien joué. Suivant ! »
    - « Encore un qui est démasqué. Au tour du prochain. »
    - « Tu progresses. Ça me dérange un peu, mais bon. »
    
    ---
    
    ## Paramètres configurables
    
    ```
    SEUIL_ABANDON      = 5
    DUREE_LEVEE_VOILE  = 2      // secondes
    FONDU_VOILE        = 300    // ms
    ```
    
    Le nombre d'indices n'est **pas** un paramètre global : il dépend de chaque cocktail et se déduit de la longueur de sa liste d'indices. Le tirage au sort porte désormais sur l'**ordre des 5 cocktails**, plus sur "en tirer un seul".
    
    ---
    
    ## Condition de victoire
    
    Les 5 cocktails trouvés. Le nombre d'indices utilisés par cocktail n'a aucune incidence : pas de score, pas de pénalité.
    
    ---
    
    ## Assets utilisés
    
    | Fichier | Usage |
    | --- | --- |
    | `bg-jeu0.webp` | Fond |
    | `img-jeu0-mojito.png` | Mojito révélé (aperçu + fin de cocktail) |
    | `img-jeu0-pinacolada.png` | Piña Colada révélée |
    | `img-jeu0-daiquiri.png` | Daiquiri révélé |
    | `img-jeu0-margarita.png` | Margarita révélée |
    | `img-jeu0-pornstarmartini.png` | Pornstar Martini révélé |
    | `sfx-clic.mp3` | Validation |
    | `sfx-code-faux.mp3` | Mauvaise réponse |
    | `sfx-code-ok.mp3` | Cocktail trouvé (avant le dernier) |
    | `sfx-victoire.mp3` | Les 5 cocktails trouvés |
    | `sfx-jeu5-indice.mp3` | Réutilisé pour le bouton « Un coup d'œil » |
    
    > ⚠️ **`img-jeu0-silhouette.png` a été retiré des assets attendus** (§C2, 06/09/2026) : la silhouette détourée générique n'est plus affichée nulle part dans l'écran.
    > 
    
    ---
    
    ## Points à trancher
    
    Aucun — les 5 cocktails à trouver dans un ordre aléatoire, la silhouette retirée, et le nouveau bouton "Un coup d'œil" (aperçu du vrai cocktail) sont actés le 06/09/2026.