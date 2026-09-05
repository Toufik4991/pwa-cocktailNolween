// Toute référence à un fichier de public/assets doit passer par ici, PAS
// par un chemin "/assets/..." en dur : le site est déployé sous un
// sous-dossier GitHub Pages (/pwa-cocktailNolween/), donc "/assets/..."
// pointerait à tort sur la racine du domaine. import.meta.env.BASE_URL
// vaut "/" en dev et "/pwa-cocktailNolween/" en build (voir vite.config.js).
export function asset(cheminRelatif) {
  return import.meta.env.BASE_URL + cheminRelatif.replace(/^\/+/, "");
}
