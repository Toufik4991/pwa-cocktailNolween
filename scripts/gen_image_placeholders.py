#!/usr/bin/env python3
"""
Genere des placeholders visuels (aplat de couleur + nom du fichier ecrit
dessus) pour tout asset image attendu mais absent de ici/, conformement a
la section 6.8 du cahier des charges. A remplacer des que l'asset reel
est fourni.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "public", "assets", "images")

# Palette solaire du projet, utilisee en rotation pour distinguer les
# placeholders a l'oeil (cf. 1-cahier-des-charges.md, variables CSS).
PALETTE = ["#FFF0C4", "#E4F2BE", "#FFDCE3", "#D8ECF6", "#FFD6AE", "#E2DCC2"]
TEXT_COLOR = "#3A2415"
ACCENT = "#FF6A45"


def font(size):
    try:
        return ImageFont.truetype(os.path.join(ROOT, "public", "assets", "fonts", "font-texte.woff2"), size)
    except Exception:
        return ImageFont.load_default()


def placeholder(name, w, h, transparent=False, idx=0):
    color = PALETTE[idx % len(PALETTE)]
    mode = "RGBA" if transparent else "RGB"
    bg = (0, 0, 0, 0) if transparent else color
    im = Image.new(mode, (w, h), bg)
    draw = ImageDraw.Draw(im)
    if transparent:
        # cadre + fond leger pour rester visible malgre la transparence
        draw.rounded_rectangle([4, 4, w - 4, h - 4], radius=min(24, w // 8),
                                fill=color, outline=ACCENT, width=max(2, w // 100))
    else:
        draw.rectangle([0, 0, w - 1, h - 1], outline=ACCENT, width=max(2, w // 100))

    label = "PLACEHOLDER"
    fname = name
    fsize = max(10, min(w, h) // 12)
    f1 = font(fsize)
    f2 = font(max(8, fsize - 4))

    def center_text(text, fnt, y):
        bbox = draw.textbbox((0, 0), text, font=fnt)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) / 2, y), text, fill=TEXT_COLOR, font=fnt)

    center_text(label, f1, h * 0.42)
    center_text(fname, f2, h * 0.42 + fsize + 6)

    dest = os.path.join(IMAGES, name)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if name.endswith(".webp"):
        im.convert("RGB").save(dest, "WEBP", quality=85)
    else:
        im.save(dest, "PNG")
    print("placeholder ->", os.path.relpath(dest, ROOT))


def main():
    i = 0

    # Jeu 0
    placeholder("img-jeu0-carte-indice.png", 900, 400, transparent=True, idx=i); i += 1

    # Jeu 1 : effets manquants
    placeholder("img-jeu1-trainee.png", 300, 300, transparent=True, idx=i); i += 1
    placeholder("img-jeu1-eclaboussure.png", 200, 200, transparent=True, idx=i); i += 1

    # Jeu 2 : 4 bulles + verre, rien fourni
    for n in range(1, 5):
        placeholder(f"img-jeu2-bulle-{n:02d}.png", 256, 256, transparent=True, idx=i); i += 1
    placeholder("img-jeu2-verre.png", 300, 600, transparent=True, idx=i); i += 1

    # Jeu 5 : charge vide
    placeholder("img-jeu5-charge-vide.png", 128, 128, transparent=True, idx=i); i += 1

    # Finale
    placeholder("img-final-halo.png", 1024, 1024, transparent=True, idx=i); i += 1

    # Identite
    placeholder("img-logo-pinatresolada.png", 800, 300, transparent=True, idx=i); i += 1

    # Photos de lieux (5, la variante -b est facultative donc non generee)
    for n in range(1, 6):
        placeholder(f"img-lieu-{n:02d}-a.webp", 1080, 1350, transparent=False, idx=i); i += 1

    print("\nPlaceholders generes.")


if __name__ == "__main__":
    main()
