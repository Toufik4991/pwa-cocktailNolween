// Export / restauration de la progression par un code court à noter
// (§9.6). Seule la progression des 6 étapes est encodée (pas le pseudo :
// la restauration se fait depuis le hub, donc un pseudo est déjà en
// place). Format : 6 lettres (une par étape) + 1 lettre de contrôle.

const SYMBOLES = { verrouille: "L", disponible: "D", complete: "G" };
const SYMBOLE_COMPLETE_PASSE = "P";
const INVERSE = { L: "verrouille", D: "disponible", G: "complete", P: "complete" };

function calculerControle(lettres) {
  // Somme pondérée par la position : contrairement à une simple somme,
  // ça détecte aussi une transposition de deux lettres (erreur de
  // recopie la plus fréquente), pas seulement une lettre altérée.
  const somme = lettres.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
  return String.fromCharCode(65 + (somme % 26));
}

export function encoderProgression(etapes) {
  let lettres = "";
  for (let i = 0; i <= 5; i++) {
    const etape = etapes[i];
    lettres += etape.statut === "complete" && etape.passe ? SYMBOLE_COMPLETE_PASSE : SYMBOLES[etape.statut];
  }
  return lettres + calculerControle(lettres);
}

export function decoderProgression(code) {
  const propre = (code || "").trim().toUpperCase();
  if (propre.length !== 7) return { erreur: "Ce code doit faire 7 caractères." };
  const lettres = propre.slice(0, 6);
  const controle = propre.slice(6);
  if (calculerControle(lettres) !== controle) {
    return { erreur: "Code invalide (contrôle incorrect). Vérifie qu'il est bien recopié." };
  }
  if (![...lettres].every((c) => c in INVERSE)) {
    return { erreur: "Code invalide (caractère inconnu)." };
  }
  const etapes = {};
  for (let i = 0; i <= 5; i++) {
    const c = lettres[i];
    etapes[i] = { statut: INVERSE[c], passe: c === "P", echecs: 0 };
  }
  return { etapes };
}
