import { describe, expect, test } from "vitest";
import { genererMelange, compterCyclesEtPointsFixes, melangeMinimalEchanges, estResolu } from "./puzzle-logic.js";

describe("puzzle-logic (jeu 3)", () => {
  test("un mélange généré n'a jamais de case bien placée", () => {
    for (let i = 0; i < 30; i++) {
      const m = genererMelange(4, 8);
      const { pointsFixes } = compterCyclesEtPointsFixes(m);
      expect(pointsFixes).toBe(0);
    }
  });

  test("un mélange généré nécessite au moins 8 échanges pour être résolu", () => {
    for (let i = 0; i < 30; i++) {
      const m = genererMelange(4, 8);
      expect(melangeMinimalEchanges(m)).toBeGreaterThanOrEqual(8);
    }
  });

  test("estResolu détecte correctement l'état résolu", () => {
    expect(estResolu([0, 1, 2, 3])).toBe(true);
    expect(estResolu([0, 2, 1, 3])).toBe(false);
  });
});
