// Logique pure du jeu 1 (aucun canvas ici) : tirage du type de fruit a
// l'apparition, et detection de collision segment-cercle pour le
// tranchage au doigt.
import { JEU_1, AGRUMES, LEURRES } from "../../config/index.js";

export function poidsDuFruit(type) {
  return AGRUMES.includes(type) ? JEU_1.POIDS_PAR_FRUIT : 0;
}

// Tire le type du prochain fruit a apparaitre : 55% le bon agrume demande,
// 25% un autre agrume, 20% un leurre (kiwi/banane a parts egales).
export function tirerTypeFruit(fruitConsigne, rng = Math.random) {
  const r = rng();
  if (r < JEU_1.RATIO_BON_FRUIT) return fruitConsigne;
  if (r < JEU_1.RATIO_BON_FRUIT + JEU_1.RATIO_MAUVAIS_AGRUME) {
    const autres = AGRUMES.filter((a) => a !== fruitConsigne);
    return autres[Math.floor(rng() * autres.length)];
  }
  return LEURRES[Math.floor(rng() * LEURRES.length)];
}

export function intervalleApparition(nbFruitsApparus) {
  const valeur = JEU_1.INTERVALLE_APPARITION - nbFruitsApparus * JEU_1.ACCELERATION;
  return Math.max(valeur, JEU_1.INTERVALLE_MINIMUM);
}

// Distance minimale entre le point p et le segment [a,b] : sert à savoir
// si le tracé du doigt (segment entre 2 positions consécutives) traverse
// un fruit (cercle de rayon donné centré sur p).
export function distanceSegmentPoint(a, b, p) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const longueurCarree = dx * dx + dy * dy;
  if (longueurCarree === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / longueurCarree;
  t = Math.max(0, Math.min(1, t));
  const projX = a.x + t * dx;
  const projY = a.y + t * dy;
  return Math.hypot(p.x - projX, p.y - projY);
}

export function traitCoupeLeFruit(a, b, fruit) {
  return distanceSegmentPoint(a, b, { x: fruit.x, y: fruit.y }) <= fruit.rayon;
}
