#!/usr/bin/env python3
"""
Traitement des assets bruts de ici/ vers public/assets/.
Usage: python scripts/process_assets.py
Ne modifie jamais ici/ : lecture seule. Écrit uniquement dans public/assets/
et produit un journal JSON exploité par le générateur de rapport.
"""
import json
import math
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import label

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "ici")
IMAGES = os.path.join(ROOT, "public", "assets", "images")
ICONS = os.path.join(ROOT, "public", "assets", "icons")

LOG = []


def log(entry):
    LOG.append(entry)
    print(f"[{entry['op']}] {entry['source']} -> {entry.get('dest','-')}")


def open_src(name):
    return Image.open(os.path.join(SRC, name)).convert("RGB")


def border_ring(im, ring=2):
    w, h = im.size
    px = np.array(im)
    top = px[0:ring, :, :].reshape(-1, 3)
    bottom = px[h - ring:h, :, :].reshape(-1, 3)
    left = px[:, 0:ring, :].reshape(-1, 3)
    right = px[:, w - ring:w, :].reshape(-1, 3)
    return np.concatenate([top, bottom, left, right], axis=0)


def remove_background(im_rgb, tol=32, feather=1.5):
    """Detoure le fond en le rendant transparent.
    Reference = couleur mediane du contour de l'image (s'adapte au blanc,
    au noir ou a un aplat creme/degrade), puis on ne rend transparente
    que la composante connexe touchant le bord (pas les zones internes
    de meme couleur, ex. blanc du verre ou de la chair du fruit)."""
    arr = np.array(im_rgb).astype(np.int16)
    h, w, _ = arr.shape
    ref = np.median(border_ring(im_rgb), axis=0)
    dist = np.sqrt(((arr - ref) ** 2).sum(axis=2))
    mask = dist < tol

    labeled, n = label(mask)
    border_labels = set(labeled[0, :]) | set(labeled[-1, :]) | set(labeled[:, 0]) | set(labeled[:, -1])
    border_labels.discard(0)
    bg_mask = np.isin(labeled, list(border_labels)) if border_labels else np.zeros_like(mask)

    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")
    if feather:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(feather))
        # binarise à nouveau les zones franchement opaques/transparentes
        # pour ne garder le flou que sur le contour
    out = im_rgb.convert("RGBA")
    out.putalpha(alpha_img)
    return out


def content_bbox(im_rgba):
    alpha = im_rgba.split()[-1]
    return alpha.getbbox()


def crop_to_content(im_rgba, pad=2):
    bbox = content_bbox(im_rgba)
    if not bbox:
        return im_rgba
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im_rgba.width, r + pad)
    b = min(im_rgba.height, b + pad)
    return im_rgba.crop((l, t, r, b))


def contain_pad(im_rgba, target_w, target_h):
    """Redimensionne SANS jamais agrandir au-dela de la taille source,
    puis centre sur un canevas transparent target_w x target_h."""
    w, h = im_rgba.size
    scale = min(target_w / w, target_h / h)
    scale = min(scale, 1.0)  # jamais d'agrandissement
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    resized = im_rgba.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    canvas.paste(resized, ((target_w - nw) // 2, (target_h - nh) // 2), resized)
    upscaled = scale < min(target_w / w, target_h / h) - 1e-9 and False
    was_smaller = w < target_w or h < target_h
    return canvas, (nw, nh), scale


def resize_by_height(im_rgba, target_h):
    w, h = im_rgba.size
    if h <= target_h:
        return im_rgba, False  # ne jamais agrandir
    scale = target_h / h
    nw = max(1, round(w * scale))
    return im_rgba.resize((nw, target_h), Image.LANCZOS), True


def save_png(im, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "PNG", optimize=True)


def save_webp(im, path, quality=85):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.convert("RGB" if im.mode != "RGBA" else "RGBA").save(path, "WEBP", quality=quality, method=6)


def process_detour_square(name, out_name, target, tol=32, dest_dir=IMAGES, out_fmt="png"):
    src_path = os.path.join(SRC, name)
    im = open_src(name)
    orig_size = im.size
    im = remove_background(im, tol=tol)
    im = crop_to_content(im)
    canvas, content_size, scale = contain_pad(im, target[0], target[1])
    dest = os.path.join(dest_dir, out_name)
    if out_fmt == "png":
        save_png(canvas, dest)
    else:
        save_webp(canvas, dest)
    log({
        "op": "detour+crop+contain",
        "source": name, "dest": os.path.relpath(dest, ROOT),
        "orig_format": "PNG", "final_format": out_fmt.upper(),
        "orig_size": list(orig_size), "final_size": list(target),
        "content_size": list(content_size), "scale": round(scale, 3),
    })


def process_height_group(names, target_h, tol=32, uniform_scale_ref=None):
    """Pour un groupe d'images qui DOIVENT garder exactement le meme
    cadrage entre elles (Mixapero, verre vide / cocktail final) : on
    detoure chaque image independamment mais on applique le MEME facteur
    d'echelle a toutes, sans recadrage individuel au contenu, pour ne
    jamais decaler la position relative du sujet entre les variantes."""
    results = {}
    scale = None
    sizes = {}
    for name in names:
        im = open_src(name)
        sizes[name] = im.size
    if uniform_scale_ref is None:
        # facteur commun base sur la plus grande hauteur du groupe
        max_h = max(s[1] for s in sizes.values())
        scale = target_h / max_h
        scale = min(scale, 1.0)
    else:
        scale = uniform_scale_ref
    for name in names:
        im = open_src(name)
        needs_detour = True
        im_rgba = im.convert("RGBA")
        # si le fichier source a deja un canal alpha exploitable, ne pas re-detourer
        raw = Image.open(os.path.join(SRC, name))
        if raw.mode == "RGBA":
            extrema = raw.getchannel("A").getextrema()
            if extrema[0] < 250:
                im_rgba = raw.convert("RGBA")
                needs_detour = False
        if needs_detour:
            im_rgba = remove_background(im, tol=tol)
        w, h = im_rgba.size
        nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
        resized = im_rgba.resize((nw, nh), Image.LANCZOS)
        dest = os.path.join(IMAGES, name)
        save_png(resized, dest)
        log({
            "op": "detour(commun)+scale-uniforme" if needs_detour else "scale-uniforme(alpha-preexistant)",
            "source": name, "dest": os.path.relpath(dest, ROOT),
            "orig_format": "PNG", "final_format": "PNG",
            "orig_size": list(sizes[name]), "final_size": [nw, nh],
            "scale": round(scale, 3),
        })
        results[name] = dest
    return results


def process_opaque_webp(name, out_name, target_wh=None, dest_dir=IMAGES):
    im = open_src(name)
    orig_size = im.size
    final = im
    resized_flag = False
    note = ""
    if target_wh:
        tw, th = target_wh
        if im.size == (tw, th):
            final = im
        elif im.width == tw and im.height < th:
            # plus petit que la cible en hauteur -> ne pas agrandir
            final = im
            note = "plus petit que la cible, non agrandi"
        elif im.width >= tw and im.height >= th:
            # crop centre au bon ratio puis resize
            target_ratio = tw / th
            src_ratio = im.width / im.height
            if src_ratio > target_ratio:
                new_w = round(im.height * target_ratio)
                left = (im.width - new_w) // 2
                final = im.crop((left, 0, left + new_w, im.height))
            else:
                new_h = round(im.width / target_ratio)
                top = (im.height - new_h) // 2
                final = im.crop((0, top, im.width, top + new_h))
            final = final.resize((tw, th), Image.LANCZOS)
            resized_flag = True
        else:
            final = im
            note = "dimensions non standard, conservees telles quelles"
    dest = os.path.join(dest_dir, out_name)
    save_webp(final, dest)
    log({
        "op": "convert-webp" + ("+crop-resize" if resized_flag else ""),
        "source": name, "dest": os.path.relpath(dest, ROOT),
        "orig_format": "PNG", "final_format": "WEBP",
        "orig_size": list(orig_size), "final_size": list(final.size),
        "note": note,
    })


def process_texture_square(name, out_name, target, dest_dir=IMAGES, out_fmt="webp"):
    src_path = os.path.join(SRC, name)
    raw = Image.open(src_path)
    orig_size = raw.size
    orig_mode = raw.mode
    im = raw.convert("RGBA") if raw.mode == "RGBA" else raw.convert("RGB")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    im = im.crop((left, top, left + side, top + side))
    im = im.resize(target, Image.LANCZOS)
    dest = os.path.join(dest_dir, out_name)
    if out_fmt == "webp":
        save_webp(im.convert("RGB") if im.mode == "RGBA" else im, dest)
    else:
        save_png(im, dest)
    log({
        "op": "crop-carre+resize",
        "source": name, "dest": os.path.relpath(dest, ROOT),
        "orig_format": orig_mode, "final_format": out_fmt.upper(),
        "orig_size": list(orig_size), "final_size": list(target),
    })


def process_glacant_pair(name_a, name_b, tol=32, pad=6):
    """Detoure 2 images censees etre identiques hors un petit detail
    (les yeux du Glacant) et les recadre sur l'UNION de leurs boites de
    contenu, pour que les 2 sorties aient exactement la meme taille et le
    meme point d'ancrage (indispensable pour une animation par
    superposition, voir §H de la correction du 05/09)."""
    im_a = remove_background(open_src(name_a), tol=tol)
    im_b = remove_background(open_src(name_b), tol=tol)
    box_a = content_bbox(im_a)
    box_b = content_bbox(im_b)
    l = max(0, min(box_a[0], box_b[0]) - pad)
    t = max(0, min(box_a[1], box_b[1]) - pad)
    r = min(im_a.width, max(box_a[2], box_b[2]) + pad)
    b = min(im_a.height, max(box_a[3], box_b[3]) + pad)
    for name, im in [(name_a, im_a), (name_b, im_b)]:
        cropped = im.crop((l, t, r, b))
        dest = os.path.join(IMAGES, name)
        save_png(cropped, dest)
        log({
            "op": "detour+crop-union-commun(paire-animation)",
            "source": name, "dest": os.path.relpath(dest, ROOT),
            "orig_format": "PNG", "final_format": "PNG",
            "orig_size": [im.width, im.height], "final_size": [r - l, b - t],
        })


def process_icons():
    src_name = "ico-512.png"  # les 4 fichiers source sont identiques (verifie par hash)
    raw = open_src(src_name)
    orig_size = raw.size
    w, h = raw.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    square = raw.crop((left, top, left + side, top + side))

    targets = {
        "ico-192.png": 192,
        "ico-512.png": 512,
        "ico-favicon.png": 64,
    }
    for out_name, size in targets.items():
        resized = square.resize((size, size), Image.LANCZOS)
        dest = os.path.join(ICONS, out_name)
        save_png(resized, dest)
        log({
            "op": "crop-carre-centre+resize (source dupliquee identique x4)",
            "source": "ico-192.png / ico-512.png / ico-favicon.png / ico-maskable-512.png (identiques)",
            "dest": os.path.relpath(dest, ROOT),
            "orig_format": "PNG", "final_format": "PNG",
            "orig_size": list(orig_size), "final_size": [size, size],
        })

    # Maskable : contenu reduit a 60% au centre, marge 20%, fond opaque
    # identique a la couleur de fond de l'icone (evite tout artefact de
    # recadrage circulaire/arrondi sur Android).
    bg_color = square.getpixel((2, 2))
    base = square.resize((512, 512), Image.LANCZOS)
    inner = round(512 * 0.6)
    inner_img = base.resize((inner, inner), Image.LANCZOS)
    canvas = Image.new("RGB", (512, 512), bg_color)
    off = (512 - inner) // 2
    canvas.paste(inner_img, (off, off))
    dest = os.path.join(ICONS, "ico-maskable-512.png")
    save_png(canvas, dest)
    log({
        "op": "reduction-60%+marge-securite-20%(genere)",
        "source": "ico-512.png (identiques)", "dest": os.path.relpath(dest, ROOT),
        "orig_format": "PNG", "final_format": "PNG",
        "orig_size": list(orig_size), "final_size": [512, 512],
        "note": "version maskable generee a partir de l'icone, non fournie telle quelle",
    })


def main():
    # ---- 1. Fonds d'ecrans fixes (opaques -> webp, 1080x1920) ----
    for base in ["bg-accueil", "bg-hub", "bg-jeu0", "bg-jeu1", "bg-jeu2",
                 "bg-jeu3", "bg-jeu4", "bg-jeu5", "bg-pseudo", "bg-reponses"]:
        process_opaque_webp(f"{base}.png", f"{base}.webp", target_wh=(1080, 1920))

    process_opaque_webp("img-splash.png", "img-splash.webp", target_wh=(1080, 1920))

    # ---- 2. Icones PWA ----
    process_icons()

    # ---- 2bis. Logo (05/09, soir) : fond corail plein -> detoure comme
    # un fond uni classique, meme si ce n'est pas du blanc ----
    process_detour_square("image-logo.png", "img-logo-pinatresolada.png", (800, 300), tol=30)

    # ---- 3. Mixapero : cadrage commun obligatoire, meme echelle pour les 6 ----
    # (05/09, soir) : 3 nouvelles expressions (diabolique/triste/reveur)
    # ajoutees au meme groupe pour garantir la meme echelle et le meme
    # cadrage que les 3 premieres (neutre/content/moqueur).
    process_height_group(
        [
            "img-mixapero-neutre.png", "img-mixapero-content.png", "img-mixapero-moqueur.png",
            "img-mixapero-diabolique.png", "img-mixapero-triste.png", "img-mixapero-reveur.png",
        ],
        target_h=1400, tol=40,
    )

    # ---- 4. Boutons du hub (512x512, detoure blanc) ----
    for i in range(6):
        process_detour_square(f"img-bouton-jeu{i}.png", f"img-bouton-jeu{i}.png", (512, 512))
    process_detour_square("img-bouton-reponses.png", "img-bouton-reponses.png", (512, 512))

    # ---- 5. Ingredients (512x512, detoure blanc) ----
    for suffix in ["canne", "glacon", "prosecco", "secret", "sirop", "zeste"]:
        process_detour_square(f"img-ingredient-{suffix}.png", f"img-ingredient-{suffix}.png", (512, 512))

    # ---- 6. Jeu 0 : silhouette + cocktails revele (hauteur 1024, PAS de contrainte de cadrage commun) ----
    for base in ["img-jeu0-silhouette", "img-jeu0-daiquiri", "img-jeu0-margarita",
                 "img-jeu0-mojito", "img-jeu0-pinacolada", "img-jeu0-pornstarmartini"]:
        im = open_src(f"{base}.png")
        orig = im.size
        im = remove_background(im, tol=32)
        im = crop_to_content(im)
        resized, did_resize = resize_by_height(im, 1024)
        dest = os.path.join(IMAGES, f"{base}.png")
        save_png(resized, dest)
        log({
            "op": "detour+crop+resize-hauteur",
            "source": f"{base}.png", "dest": os.path.relpath(dest, ROOT),
            "orig_format": "PNG", "final_format": "PNG",
            "orig_size": list(orig), "final_size": list(resized.size),
        })

    # ---- 7. Jeu 1 : fruits (300x300) + zesteur (200x200) ----
    fruit_files = [
        "img-jeu1-banane-coupe.png", "img-jeu1-banane-entier.png",
        "img-jeu1-citronjaune-coupe.png", "img-jeu1-citronjaune-entier.png",
        "img-jeu1-citronvert-coupe.png", "img-jeu1-citronvert-entier.png",
        "img-jeu1-kiwi-coupe.png", "img-jeu1-kiwi-entier.png",
        "img-jeu1-orange-coupe.png", "img-jeu1-orange-entier.png",
    ]
    for f in fruit_files:
        process_detour_square(f, f, (300, 300))
    process_detour_square("img-jeu1-zesteur.png", "img-jeu1-zesteur.png", (200, 200))

    # ---- 8. Jeu 4 : canne (120x500) ----
    process_detour_square("img-jeu4-canne.png", "img-jeu4-canne.png", (120, 500))

    # ---- 9. Jeu 5 : charge pleine (128x128) ----
    process_detour_square("img-jeu5-charge-pleine.png", "img-jeu5-charge-pleine.png", (128, 128))

    # ---- 10. Glacants (pas de dimension imposee, detoure seulement) ----
    # (05/09, soir) : img-glacant-02 fourni (memes yeux/bouche changes,
    # pour l'animation en 2 temps du point H). Les 2 images DOIVENT garder
    # exactement le meme cadrage/la meme taille de sortie, sinon
    # l'alternance 01<->02 fait un saut au lieu d'une simple animation :
    # on detoure les 2 independamment puis on recadre sur l'UNION de
    # leurs deux boites englobantes de contenu (jamais un crop individuel).
    process_glacant_pair("img-glacant-01.png", "img-glacant-02.png", tol=32)

    # ---- 11. Animation finale : verre vide + cocktail, MEME cadrage, alpha deja presente ----
    process_height_group(
        ["img-final-verre-vide.png", "img-final-cocktail.png"],
        target_h=1024,
    )

    # ---- 12. Etincelles : fond NOIR -> transparent (garder motif blanc) ----
    im = open_src("img-final-etincelles.png")
    orig = im.size
    arr = np.array(im).astype(np.int16)
    ref = np.array([0, 0, 0])
    dist = np.sqrt(((arr - ref) ** 2).sum(axis=2))
    mask = dist < 40
    labeled, n = label(mask)
    border_labels = set(labeled[0, :]) | set(labeled[-1, :]) | set(labeled[:, 0]) | set(labeled[:, -1])
    border_labels.discard(0)
    bg_mask = np.isin(labeled, list(border_labels)) if border_labels else np.zeros_like(mask)
    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(1.0))
    out = im.convert("RGBA")
    out.putalpha(alpha_img)
    out = crop_to_content(out)
    canvas, content_size, scale = contain_pad(out, 128, 128)
    dest = os.path.join(IMAGES, "img-final-etincelles.png")
    save_png(canvas, dest)
    log({
        "op": "detour-noir+crop+contain",
        "source": "img-final-etincelles.png", "dest": os.path.relpath(dest, ROOT),
        "orig_format": "PNG", "final_format": "PNG",
        "orig_size": list(orig), "final_size": [128, 128],
    })

    # ---- 13. Grille jeu 5 : texture, pas de detourage, crop carre + webp ----
    process_texture_square("img-jeu5-grille-fond.png", "img-jeu5-grille-fond.webp", (1024, 1024))

    # ---- 14. Puzzle jeu 3 : opaque, crop carre + webp ----
    process_texture_square("img-jeu3-puzzle.png", "img-jeu3-puzzle.webp", (1024, 1024))

    with open(os.path.join(ROOT, "scripts", "process_log.json"), "w", encoding="utf-8") as f:
        json.dump(LOG, f, ensure_ascii=False, indent=2)

    print(f"\n{len(LOG)} fichiers traites.")


if __name__ == "__main__":
    main()
