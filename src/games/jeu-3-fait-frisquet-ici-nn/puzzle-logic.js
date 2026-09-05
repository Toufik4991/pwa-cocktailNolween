// Logique pure du puzzle (aucun DOM ici) : mélange garanti sans case bien
// placée et nécessitant au moins MELANGE_MIN_ECHANGES coups, indépendamment
// de la taille de grille.

export function compterCyclesEtPointsFixes(permutation) {
  const n = permutation.length;
  const vus = new Array(n).fill(false);
  let cycles = 0;
  let pointsFixes = 0;
  for (let i = 0; i < n; i++) {
    if (permutation[i] === i) pointsFixes++;
    if (vus[i]) continue;
    let j = i;
    while (!vus[j]) {
      vus[j] = true;
      j = permutation[j];
    }
    cycles++;
  }
  return { cycles, pointsFixes };
}

export function melangeMinimalEchanges(permutation) {
  const { cycles } = compterCyclesEtPointsFixes(permutation);
  return permutation.length - cycles;
}

export function genererMelange(taille, minEchanges, rng = Math.random) {
  const n = taille * taille;
  let permutation;
  do {
    permutation = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    const { pointsFixes } = compterCyclesEtPointsFixes(permutation);
    if (pointsFixes > 0) continue;
    if (melangeMinimalEchanges(permutation) < minEchanges) continue;
    return permutation;
  } while (true);
}

export function estResolu(permutation) {
  return permutation.every((v, i) => v === i);
}
