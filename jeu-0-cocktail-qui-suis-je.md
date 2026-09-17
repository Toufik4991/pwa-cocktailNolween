# Sans titre

- Jeu 0 — "Cocktail, qui suis-je ?”
    
    # Jeu 0 — "Cocktail, qui suis-je ?"
    
    **Ingrédient débloqué :** sirop de fruit
    **Dossier :** `/games/jeu-0-cocktail-qui-suis-je`**Particularité :** seule étape qui **ne demande aucun code d'entrée**.
    
    ---
    
    ## Objectif du joueur
    
    Deviner le nom d'un cocktail à partir d'indices qui se dévoilent un par un.
    
    ---
    
    ## Déroulé *(mis à jour le 17/09/2026, §B — le Pornstar Martini devient une blague, et le passage entre cocktails devient manuel pour les 5)*
    
    1. Les **5 cocktails sont à trouver un par un**, dans un **ordre tiré au sort** à chaque partie (jamais deux fois le même ordre), à l'exception du **Pornstar Martini qui ne peut tomber qu'en position 2, 3 ou 4** (voir plus bas, section E).
    2. Un compteur de progression reste visible en haut : « Cocktail 3 / 5 ».
    3. Le **premier indice** du cocktail en cours s'affiche, avec un champ de saisie.
    4. Le joueur tape une réponse et valide.
    5. **Bonne réponse** → un encart de transition apparaît (réplique de Mixapéro + bouton). **L'encart reste affiché tant que la joueuse n'a pas cliqué : aucun enchaînement automatique, sur aucun des 5 cocktails.** Le bouton dit **« Suivant »** s'il reste des cocktails à trouver, **« Terminer »** s'il s'agissait du 5ᵉ et dernier — c'est ce clic, et lui seul, qui déclenche la suite (cocktail suivant, ou sortie du mini-jeu et retour au hub).
    6. **Mauvaise réponse** → réplique taquine de Mixapéro, et **l'indice suivant se dévoile**. Les indices précédents restent visibles, empilés. *(Ne peut jamais se produire sur le Pornstar Martini, voir section E.)*
    7. Quand tous les indices du cocktail en cours sont dévoilés, le joueur peut continuer à tenter sa chance indéfiniment.
    8. Au **5ᵉ échec cumulé** (tous cocktails confondus), la proposition d'abandon apparaît. *(Le Pornstar Martini ne peut jamais générer d'échec : il ne fait donc jamais progresser ce compteur.)*
    
    ---
    
    ## Interface *(mise à jour le 06/09/2026, §C2)*
    
    ⚠️ **La silhouette détourée a été retirée**, sans remplacement : le détourage rendait mal et cassait l'ambiance. L'espace ainsi libéré revient aux indices et au champ de réponse.
    
    Disposition, de haut en bas :
    
    1. **Compteur de progression** (`Cocktail 3 / 5`) puis **compteur d'indices** (`Indice 2 / 5`) — en haut
    2. Le bouton **« Un coup d'œil »**
    3. **La pile d'indices dévoilés** — le plus récent mis en avant, les précédents plus petits et atténués. Zone défilable, agrandie depuis le retrait de la silhouette.
    4. **Le champ de saisie** + bouton **"Répondre"** — en bas
    
    À la victoire du dernier cocktail *(revu le 17/09/2026, §B3)*, le même encart de transition s'affiche que pour les 4 précédents, avec le bouton « Terminer » à la place de « Suivant ». Ce n'est qu'au clic sur ce bouton que l'étape se termine et que le jeu renvoie au hub.
    
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
    
    ⚠️ **Exception, 17/09/2026, §B2 :** sur le Pornstar Martini, il n'y a rien à deviner (voir section E) — le bouton est **masqué**, sans consommer sa charge, plutôt que simplement grisé.
    
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
    
    ### E — Pornstar Martini *(1 seul indice, aucune vraie réponse à trouver)* ⭐ *(revu le 17/09/2026, §B)*
    
    | # | Indice |
    | --- | --- |
    | 1 | Ton top 3 cocktail !!!! |
    
    Ce cocktail n'a **ni réponse ni alias** : c'est une blague personnelle adressée à la joueuse, pas une vraie devinette.
    
    - **Un seul indice.** Le moteur gère un **nombre d'indices variable selon le cocktail** (pas une valeur fixe à 5) : c'est déjà le cas pour tous, ce cocktail-ci se contente d'en utiliser un seul.
    - **Toute réponse saisie est acceptée comme correcte**, quelle qu'elle soit — y compris une réponse **vide**. Il n'y a donc **jamais de mauvaise réponse possible** sur ce cocktail : ni réplique d'erreur, ni progression du compteur d'échecs cumulé.
    - Le bouton **« Un coup d'œil »** n'a plus d'utilité (rien à montrer en avance) : il est **masqué**, et ne consomme pas sa charge.
    - Dès la validation, l'encart de transition affiche cette réplique dédiée à la place du tirage aléatoire habituel :
    
      > « Mais nan !!! Pas mal, celui-ci, j'avoue !
      > Moi c'est le Pornstar Martini... à la cuillère. Pas au shaker. »
    
    - **Position imposée dans l'ordre aléatoire : jamais en 1re ni en dernière position** (donc toujours 2ᵉ, 3ᵉ ou 4ᵉ sur 5). En 1re position, la joueuse croirait le jeu cassé avant d'en avoir compris les règles ; en dernière, l'étape se terminerait sur une réponse acceptée d'office au lieu d'une vraie victoire. Les 4 autres cocktails se répartissent aléatoirement sur les positions restantes. Vérifié sur une dizaine de tirages successifs (voir §B4 de la correction du 17/09/2026).
    
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
    
    > Sur le Pornstar Martini, ce tirage aléatoire est remplacé par sa réplique dédiée (voir section E). Sur le 5ᵉ et dernier cocktail *(§B3, 17/09/2026)*, l'encart affiche à la place : « Les cinq sont démasqués. Ça, c'est du travail bien fait. »
    
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
    
    Les 5 cocktails trouvés — le Pornstar Martini compte comme trouvé dès la première saisie, quelle qu'elle soit (section E). Le nombre d'indices utilisés par cocktail n'a aucune incidence : pas de score, pas de pénalité.
    
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
    
    Aucun — les 5 cocktails à trouver dans un ordre aléatoire, la silhouette retirée, et le nouveau bouton "Un coup d'œil" (aperçu du vrai cocktail) sont actés le 06/09/2026. Le comportement du Pornstar Martini (réponse libre, position 2/3/4 imposée) et le bouton de passage manuel après chaque cocktail sont actés le 17/09/2026, §B.