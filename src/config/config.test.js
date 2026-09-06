import { describe, expect, test } from "vitest";
import * as config from "./index.js";
import { VECTEURS_DIRECTION, GRILLE, MOTS, MOT_PIEGE } from "./jeu-5.config.js";

describe("config centrale — cohérence structurelle", () => {
  test("5 codes, format 4 caractères", () => {
    expect(Object.keys(config.CODES)).toHaveLength(5);
    for (const code of Object.values(config.CODES)) {
      expect(code).toMatch(/^[A-Z0-9]{4}$/);
    }
  });

  test("toutes les séquences ont au moins un écran valide", () => {
    for (const [nom, ecrans] of Object.entries(config.SEQUENCES)) {
      expect(ecrans.length, `séquence ${nom} vide`).toBeGreaterThan(0);
      for (const ecran of ecrans) {
        expect(config.DECORS[ecran.decor], `décor inconnu dans ${nom}`).toBeDefined();
        expect(["neutre", "content", "moqueur", "diabolique", "triste", "reveur"]).toContain(ecran.expression);
        expect(ecran.texte.length).toBeGreaterThan(0);
      }
    }
  });

  test("jeu 0 : 5 cocktails, chacun avec réponse et au moins 1 indice", () => {
    expect(config.COCKTAILS).toHaveLength(5);
    for (const c of config.COCKTAILS) {
      expect(c.reponse.length).toBeGreaterThan(0);
      expect(c.indices.length).toBeGreaterThan(0);
    }
  });

  test("jeu 1 : les ratios d'apparition totalisent 1", () => {
    const total = config.JEU_1.RATIO_BON_FRUIT + config.JEU_1.RATIO_MAUVAIS_AGRUME + config.JEU_1.RATIO_LEURRE;
    expect(total).toBeCloseTo(1, 5);
  });

  test("jeu 1 : les 6 consignes totalisent l'objectif", () => {
    const total = config.CONSIGNES.reduce((sum, c) => sum + c.grammes, 0);
    expect(total).toBe(config.JEU_1.OBJECTIF_TOTAL);
  });

  test("jeu 5 : la grille fait bien 12x12", () => {
    expect(GRILLE).toHaveLength(12);
    for (const ligne of GRILLE) expect(ligne).toHaveLength(12);
  });

  function lireMot(depart, direction, longueur) {
    const [dr, dc] = VECTEURS_DIRECTION[direction];
    let mot = "";
    for (let i = 0; i < longueur; i++) {
      mot += GRILLE[depart[0] + dr * i][depart[1] + dc * i];
    }
    return mot;
  }

  test("jeu 5 : chaque mot placé se relit correctement dans la grille figée", () => {
    for (const [mot, pos] of Object.entries(MOTS)) {
      expect(lireMot(pos.depart, pos.direction, mot.length)).toBe(mot);
    }
    expect(lireMot(MOT_PIEGE.depart, MOT_PIEGE.direction, MOT_PIEGE.mot.length)).toBe(MOT_PIEGE.mot);
  });

  test("jeu 5 : 5 définitions, une par mot réel, aucune ne contient le mot lui-même", () => {
    const mots = Object.keys(MOTS);
    expect(mots).toHaveLength(5);
    for (const mot of mots) {
      const def = config.DEFINITIONS[mot];
      expect(def, `définition manquante pour ${mot}`).toBeDefined();
      expect(def.toUpperCase()).not.toContain(mot);
    }
  });
});
