// Charge les 2 polices via la Font Loading API plutôt qu'en @font-face
// CSS statique : leur chemin dépend de import.meta.env.BASE_URL (voir
// src/utils/assetUrl.js), qu'un @font-face fixe dans theme.css ne peut
// pas résoudre au build.
import { asset } from "../utils/assetUrl.js";

export function chargerPolices() {
  const titre = new FontFace("Titre", `url(${asset("assets/fonts/font-titre.woff2")})`, { weight: "700" });
  const texte = new FontFace("Texte", `url(${asset("assets/fonts/font-texte.woff2")})`, { weight: "500" });

  Promise.all([titre.load(), texte.load()])
    .then(([t1, t2]) => {
      document.fonts.add(t1);
      document.fonts.add(t2);
    })
    .catch(() => {
      // Police indisponible (hors ligne avant le premier cache, etc.) :
      // le CSS retombe sur la pile "sans-serif" par défaut, tant pis.
    });
}
