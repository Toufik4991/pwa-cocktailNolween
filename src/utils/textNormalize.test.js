import { describe, expect, test } from "vitest";
import { reponsesCorrespondent } from "./textNormalize.js";

describe("textNormalize — validation tolérante (jeu 0)", () => {
  test("ignore la casse", () => {
    expect(reponsesCorrespondent("MOJITO", "mojito")).toBe(true);
    expect(reponsesCorrespondent("Mojito", "mojito")).toBe(true);
  });

  test("ignore les accents", () => {
    expect(reponsesCorrespondent("pina colada", "pina colada")).toBe(true);
    expect(reponsesCorrespondent("piña colada", "pina colada")).toBe(true);
    expect(reponsesCorrespondent("caïpirinha", "caipirinha")).toBe(true);
  });

  test("ignore les espaces en trop", () => {
    expect(reponsesCorrespondent("  pina   colada ", "pina colada")).toBe(true);
  });

  test("ignore traits d'union et apostrophes", () => {
    expect(reponsesCorrespondent("pina-colada", "pina colada")).toBe(true);
    expect(reponsesCorrespondent("l'ingredient", "l ingredient")).toBe(true);
  });

  test("accepte un alias de la liste", () => {
    expect(reponsesCorrespondent("pinacolada", "pina colada", ["pinacolada", "pina-colada"])).toBe(true);
  });

  test("rejette une réponse fausse, même proche", () => {
    expect(reponsesCorrespondent("mojita", "mojito")).toBe(false);
    expect(reponsesCorrespondent("", "mojito")).toBe(false);
  });
});
