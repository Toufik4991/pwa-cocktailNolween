import { describe, expect, test } from "vitest";
import { tirerTypeFruit, poidsDuFruit, intervalleApparition, traitCoupeLeFruit } from "./jeu1-logic.js";
import { JEU_1 } from "../../config/index.js";

describe("jeu1-logic", () => {
  test("tirerTypeFruit respecte les seuils de ratio (déterministe via rng injecté)", () => {
    expect(tirerTypeFruit("citronvert", () => 0)).toBe("citronvert"); // < 0.55
    expect(tirerTypeFruit("citronvert", () => 0.99)).not.toBe("citronvert");
    const leurre = tirerTypeFruit("citronvert", () => 0.99);
    expect(["kiwi", "banane"]).toContain(leurre);
  });

  test("tirerTypeFruit ne renvoie jamais le fruit demandé dans la tranche 'mauvais agrume'", () => {
    for (let i = 0; i < 20; i++) {
      const r = 0.55 + 0.001 * i; // dans la tranche RATIO_MAUVAIS_AGRUME
      const type = tirerTypeFruit("orange", () => r);
      expect(type).not.toBe("orange");
      expect(["citronvert", "citronjaune"]).toContain(type);
    }
  });

  test("poidsDuFruit : 5g pour un agrume, 0 pour un leurre", () => {
    expect(poidsDuFruit("citronvert")).toBe(JEU_1.POIDS_PAR_FRUIT);
    expect(poidsDuFruit("orange")).toBe(JEU_1.POIDS_PAR_FRUIT);
    expect(poidsDuFruit("kiwi")).toBe(0);
    expect(poidsDuFruit("banane")).toBe(0);
  });

  test("intervalleApparition décroît puis se stabilise au minimum", () => {
    expect(intervalleApparition(0)).toBeCloseTo(JEU_1.INTERVALLE_APPARITION);
    expect(intervalleApparition(1000)).toBe(JEU_1.INTERVALLE_MINIMUM);
  });

  test("traitCoupeLeFruit détecte un tracé qui traverse le cercle", () => {
    const fruit = { x: 100, y: 100, rayon: 20 };
    expect(traitCoupeLeFruit({ x: 0, y: 100 }, { x: 200, y: 100 }, fruit)).toBe(true);
    expect(traitCoupeLeFruit({ x: 0, y: 0 }, { x: 10, y: 10 }, fruit)).toBe(false);
  });
});
