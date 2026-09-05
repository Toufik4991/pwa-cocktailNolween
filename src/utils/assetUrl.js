// Toute référence à un fichier de public/assets doit passer par ici, PAS
// par un chemin "/assets/..." en dur : le site est déployé sous un
// sous-dossier GitHub Pages (/pwa-cocktailNolween/), donc "/assets/..."
// pointerait à tort sur la racine du domaine. import.meta.env.BASE_URL
// vaut "/" en dev et "/pwa-cocktailNolween/" en build (voir vite.config.js).
export function asset(cheminRelatif) {
  return import.meta.env.BASE_URL + cheminRelatif.replace(/^\/+/, "");
}

// Petit raccourci pour poser une image de fond en style inline (les
// url() en dur dans un .css ne peuvent pas passer par asset(), voir plus
// haut) : style={styleFondImage("images/bg-hub.webp")}.
export function styleFondImage(cheminRelatif) {
  return { backgroundImage: `url(${asset(cheminRelatif)})` };
}
