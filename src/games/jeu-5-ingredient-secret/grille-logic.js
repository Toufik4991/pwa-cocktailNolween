// Logique pure de la grille de mots caches (jeu 5) : calcul des cellules
// d'un mot, projection du glissement sur une des 3 directions autorisees,
// et detection de correspondance. Aucun DOM ici.

import { VECTEURS_DIRECTION } from "../../config/index.js";

export function cellulesDuMot(depart, direction, longueur) {
  const [dr, dc] = VECTEURS_DIRECTION[direction];
  const cellules = [];
  for (let i = 0; i < longueur; i++) {
    cellules.push([depart[0] + dr * i, depart[1] + dc * i]);
  }
  return cellules;
}

// Projette la position brute du doigt sur la ligne la plus proche parmi
// les 3 directions autorisees (dans les deux sens), a partir du point de
// depart. "Si la joueuse s'ecarte, projeter sur la direction la plus
// proche plutot qu'annuler" (spec jeu 5).
export function projeterSurDirection(depart, brut) {
  const dr = brut[0] - depart[0];
  const dc = brut[1] - depart[1];
  if (dr === 0 && dc === 0) return depart;

  const adr = Math.abs(dr);
  const adc = Math.abs(dc);
  const memeSigne = dr !== 0 && dc !== 0 && Math.sign(dr) === Math.sign(dc);

  // Assez proche de la diagonale descendante (ou sa remontee) : on y colle.
  if (memeSigne && Math.abs(adr - adc) <= Math.min(adr, adc)) {
    const longueur = Math.round((adr + adc) / 2);
    const signe = Math.sign(dr);
    return [depart[0] + signe * longueur, depart[1] + signe * longueur];
  }
  if (adr >= adc) return [depart[0] + dr, depart[1]]; // verticale
  return [depart[0], depart[1] + dc]; // horizontale
}

export function cellulesEntre(depart, arrivee) {
  const dr = Math.sign(arrivee[0] - depart[0]);
  const dc = Math.sign(arrivee[1] - depart[1]);
  const longueur = Math.max(Math.abs(arrivee[0] - depart[0]), Math.abs(arrivee[1] - depart[1])) + 1;
  const cellules = [];
  for (let i = 0; i < longueur; i++) {
    cellules.push([depart[0] + dr * i, depart[1] + dc * i]);
  }
  return cellules;
}

function memesCellules(a, b) {
  return a.length === b.length && a.every(([r, c], i) => r === b[i][0] && c === b[i][1]);
}

// Compare une selection (liste de [ligne,colonne]) a un mot cible, dans
// n'importe quel sens de glissement (le joueur peut commencer par
// n'importe quelle extremite du mot).
export function correspondAuMot(selection, celluleDuMot) {
  return memesCellules(selection, celluleDuMot) || memesCellules(selection, [...celluleDuMot].reverse());
}
