const STORAGE_KEY = "pina-tresolada:save";

export function etapeInitiale(numero) {
  // codeValide : un code déjà saisi correctement n'est jamais redemandé,
  // même si on quitte la séquence texte avant de finir le mini-jeu.
  return {
    statut: numero === 0 ? "disponible" : "verrouille",
    passe: false,
    echecs: 0,
    codeValide: numero === 0,
  };
}

export function etatInitial() {
  const etapes = {};
  for (let i = 0; i <= 5; i++) etapes[i] = etapeInitiale(i);
  return {
    pseudo: null,
    ouvertureVue: false,
    etapes,
    reglages: { son: true, vibration: true },
    modeTest: false,
  };
}

export function chargerEtat() {
  try {
    const brut = localStorage.getItem(STORAGE_KEY);
    if (!brut) return etatInitial();
    const sauvegarde = JSON.parse(brut);
    // Fusion défensive : si de nouveaux champs sont ajoutés plus tard,
    // une vieille sauvegarde ne doit pas planter l'appli.
    return { ...etatInitial(), ...sauvegarde, etapes: { ...etatInitial().etapes, ...sauvegarde.etapes } };
  } catch {
    return etatInitial();
  }
}

export function sauvegarderEtat(etat) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(etat));
  } catch {
    // Stockage plein ou indisponible (navigation privée) : on continue
    // sans persister plutôt que de casser l'app.
  }
}
