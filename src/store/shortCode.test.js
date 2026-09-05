import { describe, expect, test } from "vitest";
import { encoderProgression, decoderProgression } from "./shortCode.js";
import { etatInitial } from "./persistence.js";

describe("shortCode — export/restauration de progression", () => {
  test("aller-retour : encoder puis décoder redonne le même état", () => {
    const etat = etatInitial();
    etat.etapes[0] = { statut: "complete", passe: false, echecs: 0 };
    etat.etapes[1] = { statut: "complete", passe: true, echecs: 5 };
    etat.etapes[2] = { statut: "disponible", passe: false, echecs: 0 };

    const code = encoderProgression(etat.etapes);
    expect(code).toHaveLength(7);

    const resultat = decoderProgression(code);
    expect(resultat.erreur).toBeUndefined();
    expect(resultat.etapes[0].statut).toBe("complete");
    expect(resultat.etapes[0].passe).toBe(false);
    expect(resultat.etapes[1].statut).toBe("complete");
    expect(resultat.etapes[1].passe).toBe(true);
    expect(resultat.etapes[2].statut).toBe("disponible");
    expect(resultat.etapes[3].statut).toBe("verrouille");
  });

  test("rejette un code de mauvaise longueur", () => {
    expect(decoderProgression("ABC").erreur).toBeDefined();
  });

  test("rejette un code dont le caractère de contrôle a été altéré", () => {
    const code = encoderProgression(etatInitial().etapes);
    const altere = code.slice(0, 6) + (code[6] === "A" ? "B" : "A");
    expect(decoderProgression(altere).erreur).toBeDefined();
  });

  test("détecte une transposition de deux lettres (erreur de recopie fréquente)", () => {
    const etat = etatInitial();
    etat.etapes[0] = { statut: "complete", passe: false, echecs: 0 };
    etat.etapes[1] = { statut: "disponible", passe: false, echecs: 0 };
    const code = encoderProgression(etat.etapes);
    const lettres = code.slice(0, 6).split("");
    [lettres[0], lettres[1]] = [lettres[1], lettres[0]];
    const transpose = lettres.join("") + code.slice(6);
    if (transpose !== code) {
      expect(decoderProgression(transpose).erreur).toBeDefined();
    }
  });
});
