import { describe, expect, test } from "vitest";
import { coupOptimal, coupVolontairementRate } from "./nim.js";

// Positions perdantes du jeu misère 1-2-3 (pour QUI DOIT JOUER depuis ce
// nombre de cannes) : 1, 5, 9, 13, 17 (4n+1). Laisser l'adversaire ici,
// c'est gagner ; y être laissé, c'est perdre.
const POSITIONS_PERDANTES = [1, 5, 9, 13, 17];

describe("nim — coupOptimal", () => {
  test("depuis une position gagnante, laisse toujours l'adversaire en position perdante (4n+1)", () => {
    for (let cannes = 2; cannes <= 20; cannes++) {
      if (POSITIONS_PERDANTES.includes(cannes)) continue;
      const coup = coupOptimal(cannes);
      expect(coup).toBeGreaterThanOrEqual(1);
      expect(coup).toBeLessThanOrEqual(Math.min(3, cannes));
      expect(POSITIONS_PERDANTES).toContain(cannes - coup);
    }
  });

  test("ne retire jamais plus de cannes qu'il n'en reste, y compris en position déjà perdante", () => {
    for (const cannes of POSITIONS_PERDANTES) {
      for (let i = 0; i < 20; i++) {
        const coup = coupOptimal(cannes);
        expect(coup).toBeGreaterThanOrEqual(1);
        expect(coup).toBeLessThanOrEqual(Math.min(3, cannes));
      }
    }
  });
});

describe("nim — coupVolontairementRate", () => {
  test("laisse TOUJOURS le joueur en position gagnante (jamais 4n+1), quelle que soit la position de départ", () => {
    for (let cannes = 2; cannes <= 20; cannes++) {
      for (let i = 0; i < 10; i++) {
        const coup = coupVolontairementRate(cannes);
        expect(coup).toBeGreaterThanOrEqual(1);
        expect(coup).toBeLessThanOrEqual(Math.min(3, cannes));
        expect(POSITIONS_PERDANTES).not.toContain(cannes - coup);
      }
    }
  });

  test("depuis une position gagnante, ne joue jamais le coup optimal (c'est le but : se tromper exprès)", () => {
    for (let cannes = 2; cannes <= 20; cannes++) {
      if (POSITIONS_PERDANTES.includes(cannes)) continue; // ici coupOptimal est lui-même aléatoire, non comparable
      const optimal = coupOptimal(cannes);
      for (let i = 0; i < 10; i++) {
        expect(coupVolontairementRate(cannes)).not.toBe(optimal);
      }
    }
  });

  test("reste légal même sans alternative (ex. une seule canne restante)", () => {
    expect(coupVolontairementRate(1)).toBe(1);
  });
});
