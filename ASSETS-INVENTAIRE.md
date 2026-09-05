# Inventaire des assets — "Pina Tresolada"

*Généré automatiquement à partir de `ici/` selon la section 6 du cahier des charges, mise à jour avec les décisions du 05/09/2026 (décors en couleurs, formats/dimensions corrigés, musiques réduites à deux fichiers).*

Le dossier `ici/` n'a jamais été modifié : tous les fichiers ci-dessous ont été **copiés puis traités** vers `public/assets/`. Les scripts utilisés sont conservés dans `scripts/` (`process_assets.py`, `gen_audio_placeholders.sh`, `gen_image_placeholders.py`) pour pouvoir relancer le traitement si de nouveaux fichiers arrivent dans `ici/`.

## Résumé

| Catégorie | Nombre |
| --- | --- |
| ✅ Assets fournis, identifiés et traités | 56 |
| ❌ Assets manquants avec placeholder généré | 26 (16 images + 20 audio − ~10 doublons ci-dessous détaillés) |
| ❌ Assets manquants, volontairement sans placeholder (optionnels / gérés en CSS / à venir) | 13 |
| ⚠️ Points de vigilance | 8 |
| ❓ Ambigus non résolus | 0 |
| **Poids total de `public/assets/`** | **6,2 Mo** (objectif : < 30 Mo) |

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
| img-mixapero-neutre.png | images/img-mixapero-neutre.png | PNG | 1080×1920 → 788×1400 | détourage fond crème + **même échelle** que les 2 autres (aucun recadrage individuel, pour préserver l'alignement) |
| img-mixapero-content.png | images/img-mixapero-content.png | PNG | 1080×1920 → 788×1400 | idem |
| img-mixapero-moqueur.png | images/img-mixapero-moqueur.png | PNG | 1080×1920 → 788×1400 | idem |

Vérifié après traitement : les trois boîtes englobantes du personnage ne varient que de 1 à 2 px entre expressions — le cadrage est bien identique.

### Boutons du hub → PNG transparent, 512×512

| Origine | Dimensions | Opération |
| --- | --- | --- |
| img-bouton-jeu0.png → jeu5.png (6) | 1080×1350 → 512×512 | détourage blanc + recadrage au contenu + mise en boîte centrée |
| img-bouton-reponses.png | 1080×1350 → 512×512 | idem |

### Ingrédients → PNG transparent, 512×512

| Origine | Dimensions | Opération |
| --- | --- | --- |
| img-ingredient-canne/glacon/prosecco/secret/sirop/zeste.png (6) | 1080×1350 → 512×512 | détourage blanc + recadrage + mise en boîte centrée |

### Jeu 0 — silhouette + cocktails révélés → PNG transparent, hauteur 1024

| Origine | Dimensions finales | Opération |
| --- | --- | --- |
| img-jeu0-silhouette.png | 700×660 | détourage + recadrage au contenu + redimension par hauteur |
| img-jeu0-daiquiri.png | 484×802 | idem |
| img-jeu0-margarita.png | 628×894 | idem |
| img-jeu0-mojito.png | 572×1024 | idem |
| img-jeu0-pinacolada.png | 649×1024 | idem |
| img-jeu0-pornstarmartini.png | 552×834 | idem |

### Jeu 1 — fruits (300×300) et zesteur (200×200)

| Origine | Opération |
| --- | --- |
| citronvert/citronjaune/orange/kiwi/banane × (entier + coupé) = 10 fichiers | détourage blanc + recadrage + mise en boîte 300×300 |
| img-jeu1-zesteur.png | détourage blanc + recadrage + mise en boîte 200×200 — identifié par le maître du jeu comme l'objet de découpe qui suit le doigt |

### Autres jeux

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| img-jeu4-canne.png | images/img-jeu4-canne.png | 1080×1920 → 120×500 | détourage blanc + recadrage + boîte |
| img-jeu5-charge-pleine.png | images/img-jeu5-charge-pleine.png | 1080×1350 → 128×128 | détourage blanc + recadrage + boîte — ⚠️ contenu petit dans le cadre, voir vigilance |
| img-glacant-01.png | images/img-glacant-01.png | 1080×1920 → 824×902 | détourage blanc + recadrage au contenu, **dimension non imposée** (absente de la liste fournie) |
| img-jeu5-grille-fond.png | images/img-jeu5-grille-fond.webp | 1080×1350 → 1024×1024 | recadrage carré centré + conversion WebP (texture opaque, pas de détourage) |
| img-jeu3-puzzle.png | images/img-jeu3-puzzle.webp | 1080×1350 → 1024×1024 | recadrage carré centré + conversion WebP |

### Animation finale

| Origine | Final | Dimensions | Opération |
| --- | --- | --- | --- |
| img-final-verre-vide.png | images/img-final-verre-vide.png | 1080×1920 → 576×1024 | déjà transparent en amont ; redimensionné avec le **même facteur d'échelle** que le cocktail pour garantir un cadrage identique |
| img-final-cocktail.png | images/img-final-cocktail.png | 1080×1920 → 576×1024 | idem |
| img-final-etincelles.png | images/img-final-etincelles.png | 1080×1350 → 128×128 | détourage fond **noir** (motif blanc conservé) + recadrage + boîte — ⚠️ voir vigilance |

---

## ❌ Assets manquants — placeholder généré (20 images + audio)

Aucun fichier `bg-decor-*` n'a été demandé : conformément à la décision du 05/09, les 6 décors narratifs sont désormais des couleurs CSS, donc **retirés de la liste attendue** — aucun placeholder correspondant.

### Images (16 fichiers, aplat de couleur + nom écrit dessus)

| Fichier | Dimensions | Usage prévu |
| --- | --- | --- |
| img-jeu0-carte-indice.png | 900×400 | cadre d'affichage d'un indice (jeu 0) |
| img-jeu1-trainee.png | 300×300 | traînée de lame (jeu 1) |
| img-jeu1-eclaboussure.png | 200×200 | jus projeté (jeu 1) |
| img-jeu2-bulle-01.png → 04.png | 256×256 ×4 | les 4 bulles (jeu 2) |
| img-jeu2-verre.png | 300×600 | flûte décorative (jeu 2) |
| img-jeu5-charge-vide.png | 128×128 | charge d'indice consommée (jeu 5) |
| img-final-halo.png | 1024×1024 | halo lumineux (animation finale) |
| img-logo-pinatresolada.png | 800×300 | logo / titre |
| img-lieu-01-a.webp → 05-a.webp | 1080×1350 ×5 | photos de lieux IRL (le code n'y est évidemment pas encore visible) |

### Audio (20 fichiers, tonalités synthétiques très courtes)

Aucun son ni musique n'était présent dans `ici/` — confirmé normal, l'audio arrivera plus tard.

| Fichier | Description du placeholder |
| --- | --- |
| sfx-bulle-01 → 04.mp3 | 4 tons purs, hauteurs croissantes (220/294/370/494 Hz) |
| sfx-clic, sfx-texte, sfx-code-ok, sfx-code-faux, sfx-deblocage, sfx-victoire, sfx-echec | bips courts différenciés |
| sfx-jeu1-tranche, sfx-jeu1-erreur, sfx-jeu3-piece, sfx-jeu4-canne, sfx-jeu5-mot, sfx-jeu5-piege, sfx-jeu5-indice | bips courts différenciés |
| mus-narration.mp3, mus-hub.mp3 | boucles douces 20 s, volumes bas (0,15 / 0,2) — **liste réduite à 2 musiques**, cf. décision du 05/09 |

### Polices (2 fichiers, sourcées réellement — pas de placeholder)

| Fichier | Source | Détail |
| --- | --- | --- |
| font-titre.woff2 | Google Fonts — **Baloo 2**, graisse 700 | rond, généreux, adapté aux titres ; sous-ensemble latin (couvre les accents français) |
| font-texte.woff2 | Google Fonts — **Quicksand**, graisse 500 | rond, lisible, adapté au texte courant |

Auto-hébergées dans `public/assets/fonts/` pour respecter le fonctionnement hors ligne — jamais chargées depuis le CDN Google Fonts à l'exécution.

---

## ❌ Assets manquants — aucun placeholder généré volontairement (13)

| Fichier(s) | Raison |
| --- | --- |
| img-jeu4-table.png | marqué optionnel dans la spec, non bloquant pour tester le jeu 4 |
| img-glacant-02.png | marqué optionnel/décoratif dans la spec |
| ui-cadre-modale, ui-cadre-texte, ui-icone-son-on/off, ui-icone-menu, ui-icone-suivant, ui-icone-passer, ui-icone-quitter, ui-icone-cadenas, ui-icone-valide (9 fichiers) | la spec prévoit explicitement qu'ils soient **générés en CSS** si non fournis — à faire au moment de l'intégration de l'interface, pas un asset image |
| bg-decor-bar/agrumes/bulles/givre/sucre/secret | **supprimés de la liste attendue** — remplacés par des couleurs CSS (décision du 05/09) |

---

## ⚠️ Points de vigilance (8)

1. **img-splash.webp reste à 1080×1350** au lieu des 1080×1920 attendus : le fichier source fourni est plus petit que la cible et la consigne interdit tout agrandissement (perte de qualité). À refournir en 1080×1920 si l'écran de démarrage doit couvrir tout l'écran.
2. **Les 4 fichiers `ico-*.png` fournis sont strictement identiques** (même image 540×675, un margarita souriant sur fond corail) : il n'y avait donc pas de version dédiée pour le favicon ni pour le format maskable. J'ai généré moi-même la version maskable (icône réduite à 60 %, marge de sécurité 20 %, fond corail assorti) à partir de cette unique source — à valider visuellement, et idéalement à remplacer par une vraie déclinaison si le rendu maskable ne convient pas.
3. **img-jeu5-charge-pleine.png** : après détourage, le motif (une goutte) n'occupe que 77 px de large sur les 128 px du cadre — l'icône risque de paraître petite dans l'interface. À surveiller lors de l'intégration ; un recadrage plus serré à la source réglerait ça.
4. **img-final-etincelles.png** : le motif d'origine est une étoile à branches très fines ; réduit à 128×128, les branches les plus fines s'amincissent au point de devenir peu visibles. Fonctionnel mais visuellement discret — un motif plus dense serait plus lisible à cette taille.
5. **img-jeu5-grille-fond** et **img-jeu3-puzzle** proviennent d'images rectangulaires (1080×1350) recadrées en carré par le centre : une bande de ~163 px a été retirée en haut et en bas. Vérifié visuellement pour `img-jeu3-puzzle` : le motif (glaçons, agrumes, pailles) est réparti sur toute la surface, rien d'important n'est perdu et le puzzle reste bien difficile (aucune zone uniforme). Pas de vérification particulière nécessaire pour `img-jeu5-grille-fond`, simple texture de fond.
6. **img-glacant-01.png** n'avait pas de dimension imposée dans les documents fournis (absente du tableau de redimensionnement de la décision du 05/09) : conservée à sa taille de détourage naturelle (824×902). À préciser si une taille cible existe.
7. **Écart de comptage dans `3-assets-a-fournir.md`** : le récapitulatif annonçait 19 sons SFX, mais l'énumération détaillée n'en liste que 18. Corrigé dans la mise à jour du document (voir plus bas).
8. Les images `.png` opaques (boutons, ingrédients, fruits) ne sont volontairement pas passées en WebP même si elles ne sont pas transparentes après recadrage dans certains cas marginaux — la règle appliquée est celle donnée explicitement par la liste de la décision du 05/09 (par famille de fichier), pas une détection automatique de la transparence réelle. Si un fichier de cette liste s'avère in fine sans aucune transparence utile, il pourra être re-basculé en WebP plus tard sans risque.

---

## ❓ Ambigus non résolus

Aucun. Le seul cas identifié (`img-jeu1-zesteur.png`) a été clarifié par le maître du jeu : c'est l'objet de découpe qui suit le doigt du joueur dans le jeu 1, désormais traité et rangé normalement. Le nom de fichier fautif (`img-jeu1-banane-entier .png`, espace en trop) a été corrigé directement dans `ici/`.

---

## Contradiction signalée : rien n'est encore codé

Comme demandé, toute contradiction entre ces décisions et du code existant devait être signalée : le projet n'a pour l'instant aucun code applicatif (uniquement les scripts de traitement d'assets dans `scripts/`), donc aucune contradiction de ce type n'existe à ce stade.
