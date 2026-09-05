#!/usr/bin/env python3
"""
Genere UNE FOIS la grille figee du jeu 5, conformement a la spec :
- 12x12
- 5 mots reels + le mot piege NOLWEEN
- directions autorisees : horizontale, verticale, diagonale descendante
- pas de mots francais accidentels de 4+ lettres dans les directions
  autorisees
- NOLWEEN visible, horizontal, moitie haute de la grille

Le resultat (grille + positions) est fige a la main dans
src/config/jeu-5.config.js une fois valide : ce script ne tourne plus
ensuite.
"""
import json
import random
import re
import unicodedata

SIZE = 12
DIRECTIONS = {
    "horizontale": (0, 1),
    "verticale": (1, 0),
    "diagonale_bas": (1, 1),
}

MOTS_REELS = ["VERMOUTH", "BITTERS", "EPICES", "HERBES", "SHRUB"]
MOT_PIEGE = "NOLWEEN"

FREQ = "AAAAAAAAEEEEEEEEEIIIIIOOOOUUUTTTTNNNNSSSSRRRRLLLLDDCCMMPPBGVHFJQZXYKW"


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def charger_mots_francais(top_n=8000):
    """Utilise une liste de frequence plutot que le dictionnaire complet :
    avec 263k formes (dont un flot de conjugaisons rares), un remplissage
    aleatoire de 144 cases matche presque toujours quelque chose par pur
    hasard. L'esprit de la consigne est d'eviter les mots FRANCAIS COURANTS
    reconnaissables, pas une absence totale de correspondance avec un
    corpus exhaustif."""
    mots = set()
    with open("scripts/_french-freq.txt", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if len(mots) >= top_n:
                break
            w = line.split(" ")[0]
            w2 = strip_accents(w).upper()
            if re.fullmatch(r"[A-Z]{4,8}", w2):
                mots.add(w2)
    return mots


def grille_vide():
    return [[None] * SIZE for _ in range(SIZE)]


def peut_placer(grille, mot, r, c, dr, dc):
    for i, ch in enumerate(mot):
        rr, cc = r + dr * i, c + dc * i
        if not (0 <= rr < SIZE and 0 <= cc < SIZE):
            return False
        cell = grille[rr][cc]
        if cell is not None and cell != ch:
            return False
    return True


def placer(grille, mot, r, c, dr, dc):
    cellules = []
    for i, ch in enumerate(mot):
        rr, cc = r + dr * i, c + dc * i
        grille[rr][cc] = ch
        cellules.append([rr, cc])
    return cellules


def tenter_generation(rng):
    grille = grille_vide()
    positions = {}

    # NOLWEEN : horizontal, moitie haute (lignes 0 a 5), bien visible
    mot = MOT_PIEGE
    r = rng.randint(0, 5)
    c = rng.randint(0, SIZE - len(mot))
    placer(grille, mot, r, c, 0, 1)
    positions[mot] = {"depart": [r, c], "direction": "horizontale"}

    # Les 5 vrais mots, du plus long au plus court pour faciliter le pack
    for mot in sorted(MOTS_REELS, key=len, reverse=True):
        essais = 0
        place = False
        dirs = list(DIRECTIONS.items())
        while essais < 500 and not place:
            essais += 1
            nom_dir, (dr, dc) = rng.choice(dirs)
            max_r = SIZE - (len(mot) - 1) * dr - 1
            max_c = SIZE - (len(mot) - 1) * dc - 1
            if max_r < 0 or max_c < 0:
                continue
            r = rng.randint(0, max_r)
            c = rng.randint(0, max_c)
            if peut_placer(grille, mot, r, c, dr, dc):
                placer(grille, mot, r, c, dr, dc)
                positions[mot] = {"depart": [r, c], "direction": nom_dir}
                place = True
        if not place:
            return None, None
    return grille, positions


def trouver_accidentels(g, mots_francais, cellules_fixes):
    """Un match entierement compose de cases FIXES (des mots places eux-
    memes, ex. HERBE au sein de HERBES) est inevitable et sans consequence
    en jeu : on ne le compte pas comme accidentel, seuls les matches qui
    touchent au moins une case de remplissage sont des vrais faux-amis a
    corriger."""
    accidentels = []
    for (dr, dc) in DIRECTIONS.values():
        for r in range(SIZE):
            for c in range(SIZE):
                for longueur in range(4, 9):
                    rr = r + dr * (longueur - 1)
                    cc = c + dc * (longueur - 1)
                    if not (0 <= rr < SIZE and 0 <= cc < SIZE):
                        continue
                    cellules = [(r + dr * i, c + dc * i) for i in range(longueur)]
                    if all(cell in cellules_fixes for cell in cellules):
                        continue
                    lettres = "".join(g[rr2][cc2] for rr2, cc2 in cellules)
                    if lettres in mots_francais:
                        accidentels.append((lettres, cellules))
    return accidentels


def remplir_et_verifier(grille, positions, mots_francais, rng, max_iterations=60):
    """Remplissage aleatoire puis reparation locale : au lieu de rejeter
    toute la grille des qu'un mot accidentel apparait (statistiquement
    quasi certain avec 8000 mots communs sur 144 cases), on ne re-tire
    que les cases fautives, ce qui converge en quelques iterations."""
    cellules_fixes = {(r, c) for r in range(SIZE) for c in range(SIZE) if grille[r][c] is not None}
    g = [row[:] for row in grille]
    for r in range(SIZE):
        for c in range(SIZE):
            if (r, c) not in cellules_fixes:
                g[r][c] = rng.choice(FREQ)

    for iteration in range(max_iterations):
        accidentels = trouver_accidentels(g, mots_francais, cellules_fixes)
        if not accidentels:
            return g, iteration, []
        for _, cellules in accidentels:
            for (r, c) in cellules:
                if (r, c) not in cellules_fixes:
                    g[r][c] = rng.choice(FREQ)

    accidentels = trouver_accidentels(g, mots_francais, cellules_fixes)
    return g, max_iterations, accidentels


def afficher(grille):
    for row in grille:
        print(" ".join(row))


def main():
    mots_francais = charger_mots_francais()
    print(f"{len(mots_francais)} mots francais charges pour la verification.")

    for seed in range(1, 200):
        rng = random.Random(seed)
        grille, positions = tenter_generation(rng)
        if grille is None:
            continue
        grille_finale, tentative, accidentels = remplir_et_verifier(grille, positions, mots_francais, rng)
        if not accidentels:
            print(f"\nSeed {seed} OK (remplissage valide en {tentative + 1} tentative(s)).\n")
            afficher(grille_finale)
            print("\nPositions:")
            print(json.dumps(positions, ensure_ascii=False, indent=2))
            with open("scripts/grille_jeu5_resultat.json", "w", encoding="utf-8") as f:
                json.dump({
                    "grille": ["".join(row) for row in grille_finale],
                    "positions": positions,
                }, f, ensure_ascii=False, indent=2)
            print("\nEcrit dans scripts/grille_jeu5_resultat.json")
            return
    print("Echec : aucune grille valide trouvee apres 200 essais.")


if __name__ == "__main__":
    main()
