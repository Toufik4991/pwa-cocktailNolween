import { describe, expect, test } from "vitest";
import { cellulesDuMot, projeterSurDirection, cellulesEntre, correspondAuMot } from "./grille-logic.js";
import { MOTS, MOT_PIEGE } from "../../config/index.js";

describe("grille-logic (jeu 5)", () => {
  test("cellulesDuMot calcule correctement pour les 3 directions", () => {
    expect(cellulesDuMot([0, 0], "horizontale", 3)).toEqual([[0, 0], [0, 1], [0, 2]]);
    expect(cellulesDuMot([0, 0], "verticale", 3)).toEqual([[0, 0], [1, 0], [2, 0]]);
    expect(cellulesDuMot([0, 0], "diagonale_bas", 3)).toEqual([[0, 0], [1, 1], [2, 2]]);
  });

  test("projeterSurDirection colle à l'horizontale quand le geste est quasi horizontal", () => {
    expect(projeterSurDirection([2, 2], [2, 5])).toEqual([2, 5]);
    expect(projeterSurDirection([2, 2], [3, 5])).toEqual([2, 5]); // léger écart vertical ignoré
  });

  test("projeterSurDirection colle à la verticale quand le geste est quasi vertical", () => {
    expect(projeterSurDirection([2, 2], [6, 2])).toEqual([6, 2]);
  });

  test("projeterSurDirection colle à la diagonale descendante quand dr≈dc", () => {
    expect(projeterSurDirection([0, 0], [4, 4])).toEqual([4, 4]);
    expect(projeterSurDirection([4, 4], [0, 0])).toEqual([0, 0]); // remontée (haut-gauche)
  });

  test("cellulesEntre fonctionne dans les deux sens sur une même ligne", () => {
    expect(cellulesEntre([1, 1], [1, 4])).toEqual([[1, 1], [1, 2], [1, 3], [1, 4]]);
    expect(cellulesEntre([1, 4], [1, 1])).toEqual([[1, 4], [1, 3], [1, 2], [1, 1]]);
  });

  test("correspondAuMot accepte une sélection dans les deux sens", () => {
    const cellules = cellulesDuMot(MOTS.SHRUB.depart, MOTS.SHRUB.direction, "SHRUB".length);
    expect(correspondAuMot(cellules, cellules)).toBe(true);
    expect(correspondAuMot([...cellules].reverse(), cellules)).toBe(true);
  });

  test("tous les mots réels et le mot piège sont bien détectables via glissement simulé", () => {
    for (const [mot, pos] of Object.entries(MOTS)) {
      const cellules = cellulesDuMot(pos.depart, pos.direction, mot.length);
      const depart = cellules[0];
      const arrivee = cellules[cellules.length - 1];
      const brut = projeterSurDirection(depart, arrivee);
      const selection = cellulesEntre(depart, brut);
      expect(correspondAuMot(selection, cellules), `échec pour ${mot}`).toBe(true);
    }
    const cellulesPiege = cellulesDuMot(MOT_PIEGE.depart, MOT_PIEGE.direction, MOT_PIEGE.mot.length);
    const selectionPiege = cellulesEntre(cellulesPiege[0], cellulesPiege[cellulesPiege.length - 1]);
    expect(correspondAuMot(selectionPiege, cellulesPiege)).toBe(true);
  });
});
