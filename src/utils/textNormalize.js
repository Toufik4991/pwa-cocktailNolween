// Normalisation tolérante pour la saisie du jeu 0 : ignore casse, accents,
// espaces en trop, traits d'union et apostrophes.
const ACCENTS = new RegExp("[̀-ͯ]", "g");

export function normaliser(texte) {
  return texte
    .normalize("NFD")
    .replace(ACCENTS, "")
    .toLowerCase()
    .replace(/['’-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function reponsesCorrespondent(saisie, reponse, alias = []) {
  const n = normaliser(saisie);
  if (!n) return false;
  return [reponse, ...alias].some((candidat) => normaliser(candidat) === n);
}
