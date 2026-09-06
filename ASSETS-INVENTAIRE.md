# Inventaire des assets — "Pina Tresolada"

*Généré à partir de `ici/` selon la section 6 du cahier des charges. Mise à jour du 06/09/2026 (soir, §G1/§C2) : les 10 photos de lieux (`img-lieu-01..05-a/b.webp`) sont fournies et traitées (pas de recadrage, largeur max 1080 px, qualité webp élevée — un code y est écrit et doit rester lisible) ; `img-jeu0-silhouette.png` est retiré des assets attendus (détourage raté, écran redessiné sans elle, voir `jeu-0-cocktail-qui-suis-je.md`). Mise à jour précédente (06/09/2026, matin) : logo réel intégré (`image-logo.png` → `img-logo-pinatresolada.png`), `img-glacant-02` traité (paire d'animation, voir cahier des charges §3 ter), 3 nouvelles expressions Mixapéro (`diabolique`/`triste`/`rêveur`) traitées dans le même lot que les 3 premières, `img-jeu3-puzzle` retraité (source mise à jour dans `ici/`). Les 4 bulles et la flûte du jeu 2 ne sont plus en attente d'asset : décidé qu'elles restent en CSS pur (voir `jeu-2-des-bulles.md`). `bg-jeu0.webp` → `bg-jeu5.webp` ne sont plus utilisés (mini-jeux passés en aplat de couleur, cahier des charges §2 bis).*

Le dossier `ici/` n'a jamais été modifié : tous les fichiers ci-dessous ont été **copiés puis traités** vers `public/assets/`. Scripts dans `scripts/` : `process_assets.py` (images), `gen_audio_placeholders.sh` / `gen_image_placeholders.py` (placeholders restants).

## Résumé

| Catégorie | Nombre |
| --- | --- |
| ✅ Images fournies, identifiées et traitées | 61 |
| ✅ Audio réel intégré | 20 (19 SFX + 1 musique) |
| ✅ Polices sourcées | 2 |
| ❌ Assets manquants avec placeholder (images seulement, l'audio n'en a plus besoin) | 6 |
| ❌ Assets abandonnés, retirés du code et de la liste attendue | 6 |
| ❌ Sans placeholder volontairement (optionnels / gérés en CSS) | 14 |
| ⚠️ Points de vigilance | 9 |
| ❓ Ambigus non résolus | 0 |
| **Poids total de `public/assets/`** | **8,1 Mo** (objectif : < 30 Mo) *(avant retrait de `bg-jeu0..5`, désormais orphelins mais pas supprimés sans confirmation)* |

> ⚠️ **À signaler explicitement** : il ne reste plus que les 5 photos de lieux (attendu, elles dépendent de lieux pas encore choisis) et la charge d'indice vide du jeu 5 en placeholder. Le logo est fourni depuis le 06/09/2026 ; les 4 bulles et la flûte du jeu 2 ne sont plus considérées comme des assets manquants (choix : CSS pur, voir plus bas).

---

## ✅ Assets fournis, identifiés et traités (56)

### Fonds d'écrans fixes → WebP, 1080×1920

| Origine (`ici/`) | Final | Format | Dimensions | Opération |
| --- | --- | --- | --- | --- |
| bg-accueil.png | images/bg-accueil.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-hub.png | images/bg-hub.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu0.png | images/bg-jeu0.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu1.png | images/bg-jeu1.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu2.png | images/bg-jeu2.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu3.png | images/bg-jeu3.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu4.png | images/bg-jeu4.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-jeu5.png | images/bg-jeu5.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-pseudo.png | images/bg-pseudo.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| bg-reponses.png | images/bg-reponses.webp | PNG→WebP | 1080×1920 → 1080×1920 | conversion |
| img-splash.png | images/img-splash.webp | PNG→WebP | 1080×1350 → **1080×1350** | conversion — ⚠️ voir points de vigilance (cible 1080×1920 non atteinte) |

### Icônes PWA → PNG opaque

| Origine | Final | Format | Dimensions | Opération |
| --- | --- | --- | --- | --- |
| ico-192.png | icons/ico-192.png | PNG | 540×675 → 192×192 | recadrage carré centré + redimension |
| ico-512.png | icons/ico-512.png | PNG | 540×675 → 512×512 | recadrage carré centré + redimension |
| ico-favicon.png | icons/ico-favicon.png | PNG | 540×675 → 64×64 | recadrage carré centré + redimension |
| ico-maskable-512.png | icons/ico-maskable-512.png | PNG | 540×675 → 512×512 | **régénérée** : icône réduite à 60 % + marge de sécurité 20 %, fond opaque assorti — voir ⚠️ |

### Mixapéro → PNG transparent, hauteur 1400, cadrage identique garanti

| Origine | Final | Format | Dimensions | Opération |
| --- | --- | --- | --- | --- |
| img-mixapero-neutre.png | images/img-mixapero-neutre.png | PNG | 1080×1920 → 788×1400 | détourage fond crème + **même échelle** que les 5 autres (aucun recadrage individuel, pour préserver l'alignement) |
| img-mixapero-content.png | images/img-mixapero-content.png | PNG | 1080×1920 → 788×1400 | idem |
| img-mixapero-moqueur.png | images/img-mixapero-moqueur.png | PNG | 1080×1920 → 788×1400 | idem |
| img-mixapero-diabolique.png | images/img-mixapero-diabolique.png | PNG | 1080×1920 → 788×1400 | idem — **ajouté le 06/09/2026**, traité dans le même lot que les 5 autres pour garantir la même échelle (0.729) |
| img-mixapero-triste.png | images/img-mixapero-triste.png | PNG | 1080×1920 → 788×1400 | idem — ajouté le 06/09/2026 |
| img-mixapero-reveur.png | images/img-mixapero-reveur.png | PNG | 1080×1920 → 788×1400 | idem — ajouté le 06/09/2026 |

Vérifié après traitement : les six boîtes englobantes du personnage ne varient que de 1 à 2 px entre expressions — le cadrage est bien identique.

### Logo → PNG transparent, 800×300 *(ajouté le 06/09/2026)*

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| image-logo.png | images/img-logo-pinatresolada.png | 1080×1350 → 800×300 | détourage du fond corail plein (traité comme un fond uni classique, pas seulement le blanc) + recadrage au contenu + mise en boîte centrée — remplace le placeholder transparent généré précédemment |

### Glaçants → PNG transparent, paire à cadrage identique garanti *(img-glacant-02 ajouté le 06/09/2026)*

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| img-glacant-01.png | images/img-glacant-01.png | 1080×1920 → 832×911 | détourage + recadrage sur l'**union** des boîtes de contenu des 2 images (jamais un recadrage individuel), pour que l'alternance 01↔02 ne saute pas d'un pixel — voir cahier des charges §3 ter |
| img-glacant-02.png | images/img-glacant-02.png | 1080×1920 → 832×911 | idem — dimension identique à `-01` par construction |

### Boutons du hub → PNG transparent, 512×512

| Origine | Dimensions | Opération |
| --- | --- | --- |
| img-bouton-jeu0.png → jeu5.png (6) | 1080×1350 → 512×512 | détourage blanc + recadrage au contenu + mise en boîte centrée |
| img-bouton-reponses.png | 1080×1350 → 512×512 | idem |

### Ingrédients → PNG transparent, 512×512

| Origine | Dimensions | Opération |
| --- | --- | --- |
| img-ingredient-canne/glacon/prosecco/secret/sirop/zeste.png (6) | 1080×1350 → 512×512 | détourage blanc + recadrage + mise en boîte centrée |

### Jeu 0 — cocktails révélés → PNG transparent, hauteur 1024

*(`img-jeu0-silhouette.png` retiré des assets attendus le 06/09/2026, §C2 — l'écran ne l'affiche plus du tout.)*

| Origine | Dimensions finales | Opération |
| --- | --- | --- |
| img-jeu0-daiquiri.png | 484×802 | détourage + recadrage au contenu + redimension par hauteur |
| img-jeu0-margarita.png | 628×894 | idem |
| img-jeu0-mojito.png | 572×1024 | idem |
| img-jeu0-pinacolada.png | 649×1024 | idem |
| img-jeu0-pornstarmartini.png | 552×834 | idem |

### Jeu 1 — fruits (300×300)

*(`img-jeu1-zesteur.png` et `img-jeu1-eclaboussure.png` retirés des assets attendus le 06/09/2026 soir, §C2/§C3 — jamais réellement nécessaires : la traînée du doigt et l'impact de coupe sont entièrement dessinés au canvas, sans aucun sprite.)*

| Origine | Opération |
| --- | --- |
| citronvert/citronjaune/orange/kiwi/banane × (entier + coupé) = 10 fichiers | détourage blanc + recadrage + mise en boîte 300×300 |

### Autres jeux

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| img-jeu4-canne.png | images/img-jeu4-canne.png | 1080×1920 → 120×500 | détourage blanc + recadrage + boîte |
| img-jeu5-charge-pleine.png | images/img-jeu5-charge-pleine.png | 1080×1350 → 128×128 | détourage blanc + recadrage + boîte — ⚠️ contenu petit dans le cadre, voir vigilance |
| img-jeu5-grille-fond.png | images/img-jeu5-grille-fond.webp | 1080×1350 → 1024×1024 | recadrage carré centré + conversion WebP (texture opaque, pas de détourage) |
| img-jeu3-puzzle.png | images/img-jeu3-puzzle.webp | 1080×1350 → 1024×1024 | recadrage carré centré + conversion WebP |

### Animation finale

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| img-final-verre-vide.png | images/img-final-verre-vide.png | 1080×1920 → 576×1024 | déjà transparent en amont ; redimensionné avec le **même facteur d'échelle** que le cocktail pour garantir un cadrage identique |
| img-final-cocktail.png | images/img-final-cocktail.png | 1080×1920 → 576×1024 | idem |
| img-final-etincelles.png | images/img-final-etincelles.png | 1080×1350 → 128×128 | détourage fond **noir** (motif blanc conservé) + recadrage + boîte — ⚠️ voir vigilance |

---

## ✅ Audio réel intégré (20 fichiers)

Tous les sons et l'unique musique fournis dans `ici/` le 05/09 (soir) ont remplacé les placeholders synthétiques précédents.

| Fichier | Traitement |
| --- | --- |
| Les 19 SFX (bulle-01→04, clic, texte, code-ok, code-faux, deblocage, echec, final, victoire, jeu1-tranche, jeu1-erreur, jeu3-piece, jeu4-canne, jeu5-mot, jeu5-piege, jeu5-indice) | copiés tels quels dans `public/assets/audio/` |
| `mus-hub.mp3` | **corrigé avant intégration** : 1,66 s de silence en fin de piste détectées (`ffmpeg silencedetect`), qui auraient cassé la boucle avec un blanc audible toutes les ~68 s. Coupé net à 66,44 s + micro-fondu de 10 ms pour éviter un clic, ré-encodé à 128 kbps (2,1 Mo → 1,0 Mo) |
| `mus-jeu.mp3` | Copiée telle quelle (pas de silence de raccord détecté), ré-encodée à 128 kbps pour la taille (113,88 s) |
| `mus-final.mp3` | **corrigée avant intégration** : 0,6 s de silence en fin de piste détectées, coupé net à 129,02 s, ré-encodée à 128 kbps |

`sfx-final.mp3` était déjà dans la spec d'origine ("Fanfare de fin") — voir point de vigilance sur mon erreur de comptage précédente.

**Système à 3 musiques (correction du 05/09 en soirée)** : après une simplification temporaire à une seule piste (`mus-hub` partout), vous avez demandé de garder les 3 fichiers — `mus-hub` (accueil/pseudo/hub/séquences texte/Réponses), `mus-jeu` (les 6 mini-jeux), `mus-final` (animation finale uniquement, redémarre à chaque lancement). Les 3 sont maintenant intégrées et vérifiées.

---

## ❌ Assets manquants — placeholder image (6 fichiers)

Aucun fichier audio n'a plus besoin de placeholder (tout est réel désormais, voir ci-dessus). Depuis le 06/09/2026 : le logo est fourni (retiré de cette liste), les 4 bulles + la flûte du jeu 2 ne sont plus en attente d'asset (choix définitif : CSS pur, voir la section "sans placeholder" ci-dessous), et les 10 photos de lieux (`-a` + `-b`, voir ci-dessous) sont désormais fournies et traitées — retirées de cette liste.

| Fichier | Dimensions | Usage prévu |
| --- | --- | --- |
| img-jeu5-charge-vide.png | 128×128 | charge d'indice consommée (jeu 5) |

⚠️ Il ne reste plus que la charge vide du jeu 5 en attente de placeholder.

### Photos de lieux IRL (10 fichiers, fournies le 06/09/2026, §G1)

Traitement dédié (`process_photo_no_crop` dans `process_assets.py`) : **jamais de recadrage** (un code est écrit sur les photos `-a` et doit rester entièrement visible), redimensionnement en largeur seulement au-delà de 1080 px (jamais d'agrandissement), qualité webp 90 pour rester lisible.

| Fichier | Usage | Rattachement |
| --- | --- | --- |
| `img-lieu-01-a.webp` / `img-lieu-01-b.webp` | Photo du lieu / rappel carte | Révélé après l'étape 0 |
| `img-lieu-02-a.webp` / `img-lieu-02-b.webp` | idem | Révélé après l'étape 1 |
| `img-lieu-03-a.webp` / `img-lieu-03-b.webp` | idem | Révélé après l'étape 2 |
| `img-lieu-04-a.webp` / `img-lieu-04-b.webp` | idem | Révélé après l'étape 3 |
| `img-lieu-05-a.webp` / `img-lieu-05-b.webp` | idem | Révélé après l'étape 4 |

⚠️ `ici/img-lieu-02-a (2).png` est un doublon écarté (deux photos différentes sous des noms voisins) : seule `img-lieu-02-a.png` (sans suffixe) a été traitée, sur confirmation explicite. Les fichiers `scrnli_*.png` et autres captures d'écran isolées trouvées dans `ici/` ne sont pas des assets de jeu et n'ont pas été traités.

### Polices (2 fichiers, sourcées réellement — pas de placeholder)

| Fichier | Source | Détail |
| --- | --- | --- |
| font-titre.woff2 | Google Fonts — **Baloo 2**, graisse 700 | rond, généreux, adapté aux titres ; sous-ensemble latin (couvre les accents français) |
| font-texte.woff2 | Google Fonts — **Quicksand**, graisse 500 | rond, lisible, adapté au texte courant |

Auto-hébergées dans `public/assets/fonts/` pour respecter le fonctionnement hors ligne — jamais chargées depuis le CDN Google Fonts à l'exécution.

---

## ❌ Assets abandonnés — retirés du code et de la liste attendue (6)

Sur demande explicite du 05/09 (soir) puis du 06/09 (soir), plus besoin de ces 6 assets — retirés du code, de `assets-a-fournir.md` et de cet inventaire :

| Fichier | Pourquoi il n'est plus utilisé |
| --- | --- |
| img-jeu1-trainee.png | la traînée du doigt est dessinée directement au canvas (ligne suivant le tracé), jamais un sprite — cette image était chargée dans le code mais jamais réellement dessinée |
| img-jeu1-zesteur.png | (§C2, 06/09/2026 soir) censé suivre le doigt comme "l'objet de découpe", provoquait des bugs sans jamais être réellement câblé — remplacé définitivement par la traînée canvas dégressive ci-dessus |
| img-jeu1-eclaboussure.png | (§C3, 06/09/2026 soir) l'impact de coupe se limite désormais aux deux moitiés du fruit qui s'écartent, sans effet de jus projeté |
| img-final-halo.png | retiré de l'animation finale ; celle-ci garde le cocktail + les étincelles |
| img-jeu0-carte-indice.png | les indices s'affichent en carte CSS, jamais utilisé dans le code |
| img-jeu4-table.png | les cannes sont posées sur l'aplat de couleur du jeu, pas de support dédié |

---

## ❌ Sans placeholder, volontairement (14)

`img-glacant-02.png` retiré de cette liste le 06/09/2026 : il est désormais fourni et traité (voir résumé en tête de document et cahier des charges §3 ter), plus besoin de le marquer optionnel.

| Fichier(s) | Raison |
| --- | --- |
| ui-cadre-modale, ui-cadre-texte, ui-icone-son-on/off, ui-icone-menu, ui-icone-suivant, ui-icone-passer, ui-icone-quitter, ui-icone-cadenas, ui-icone-valide (9 fichiers) | la spec prévoit explicitement qu'ils soient **générés en CSS** si non fournis |
| img-jeu2-bulle-01.png → 04.png, img-jeu2-verre.png (5 fichiers, ajoutés le 06/09/2026) | choix définitif : dessinés entièrement en CSS (dégradé, reflet, teintes), jamais d'asset image prévu pour eux désormais — voir `jeu-2-des-bulles.md` |

---

## ⚠️ Points de vigilance (9)

1. **img-splash.webp reste à 1080×1350** au lieu des 1080×1920 attendus : le fichier source fourni est plus petit que la cible et la consigne interdit tout agrandissement (perte de qualité). À refournir en 1080×1920 si l'écran de démarrage doit couvrir tout l'écran.
2. **Les 4 fichiers `ico-*.png` fournis sont strictement identiques** (même image 540×675, un margarita souriant sur fond corail) : il n'y avait donc pas de version dédiée pour le favicon ni pour le format maskable. J'ai généré moi-même la version maskable (icône réduite à 60 %, marge de sécurité 20 %, fond corail assorti) à partir de cette unique source — à valider visuellement, et idéalement à remplacer par une vraie déclinaison si le rendu maskable ne convient pas.
3. **img-jeu5-charge-pleine.png** : après détourage, le motif (une goutte) n'occupe que 77 px de large sur les 128 px du cadre — l'icône risque de paraître petite dans l'interface. À surveiller lors de l'intégration ; un recadrage plus serré à la source réglerait ça.
4. **img-final-etincelles.png** : le motif d'origine est une étoile à branches très fines ; réduit à 128×128, les branches les plus fines s'amincissent au point de devenir peu visibles. Fonctionnel mais visuellement discret — un motif plus dense serait plus lisible à cette taille.
5. **img-jeu5-grille-fond** et **img-jeu3-puzzle** proviennent d'images rectangulaires (1080×1350) recadrées en carré par le centre : une bande de ~163 px a été retirée en haut et en bas. Vérifié visuellement pour `img-jeu3-puzzle` : le motif (glaçons, agrumes, pailles) est réparti sur toute la surface, rien d'important n'est perdu et le puzzle reste bien difficile (aucune zone uniforme). Pas de vérification particulière nécessaire pour `img-jeu5-grille-fond`, simple texture de fond.
6. **img-glacant-01/02.png** n'ont pas de dimension imposée dans les documents fournis : conservées à leur taille de détourage naturelle, désormais **832×911 pour les deux** (mise à jour du 06/09/2026 — recadrées sur l'union de leurs boîtes de contenu respectives, pas individuellement, pour que la paire s'anime sans saut ; voir cahier des charges §3 ter). À préciser si une taille cible existe.
7. **Correction d'une erreur de ma part** : j'avais précédemment "corrigé" le compte de SFX de 19 à 18, en pensant que `3-assets-a-fournir.md` comptait un fichier en trop. En réalité c'est moi qui avais mal recompté — `sfx-final.mp3` ("fanfare de fin") fait bien partie de la liste d'origine. Remis à 19 partout, fichier bien copié et utilisé dans l'animation finale.
8. Les images `.png` opaques (boutons, ingrédients, fruits) ne sont volontairement pas passées en WebP même si elles ne sont pas transparentes après recadrage dans certains cas marginaux — la règle appliquée est celle donnée explicitement par la liste de la décision du 05/09 (par famille de fichier), pas une détection automatique de la transparence réelle. Si un fichier de cette liste s'avère in fine sans aucune transparence utile, il pourra être re-basculé en WebP plus tard sans risque.
9. **`mus-final.mp3` et `mus-jeu.mp3`** : d'abord laissés de côté lors de la simplification temporaire à une seule piste, puis réintégrés (voir section audio ci-dessus) suite à votre demande de garder les 3 musiques. Comme `mus-hub`, ils restent dans `ici/` sans y avoir été modifiés (seules les copies dans `public/assets/` sont traitées).

---

## ❓ Ambigus non résolus

Aucun. Le cas `img-jeu1-zesteur.png`, un temps clarifié comme "l'objet de découpe qui suit le doigt", a finalement été tranché dans l'autre sens le 06/09/2026 soir (§C2) : il provoquait des bugs sans jamais être réellement câblé, et a été retiré (voir la section "Assets abandonnés" ci-dessus). Le nom de fichier fautif (`img-jeu1-banane-entier .png`, espace en trop) a été corrigé directement dans `ici/`.

---

## Contradiction signalée : rien n'est encore codé

Comme demandé, toute contradiction entre ces décisions et du code existant devait être signalée : le projet n'a pour l'instant aucun code applicatif (uniquement les scripts de traitement d'assets dans `scripts/`), donc aucune contradiction de ce type n'existe à ce stade.
