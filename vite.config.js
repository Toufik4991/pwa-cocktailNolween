import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Config technique du build. Rien ici n'est destiné à être modifié pour
// ajuster le contenu du jeu : voir src/config/ pour ça.
//
// base : le site est déployé sur GitHub Pages sous un sous-dossier
// (https://toufik4991.github.io/pwa-cocktailNolween/), pas à la racine du
// domaine. Uniquement en build : le serveur de dev, lui, reste à la racine
// pour ne pas casser les habitudes locales (npm run dev sur localhost:5173/).
// Toute référence à un fichier de public/assets dans le code JS doit passer
// par asset() (src/utils/assetUrl.js), qui lit ce même base au runtime.
const BASE_PRODUCTION = "/pwa-cocktailNolween/";

export default defineConfig(({ command }) => {
  const base = command === "build" ? BASE_PRODUCTION : "/";

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        // Sépare nos assets statiques (public/assets) des chunks JS/CSS
        // buildés par Vite, pour ne jamais mélanger les deux dans dist/assets.
        manifest: {
          name: "Pina Tresolada",
          short_name: "Pina Tresolada",
          description:
            "Chasse au trésor IRL : aide Mixapéro à retrouver les six ingrédients volés par Les Glaçants.",
          lang: "fr",
          start_url: base,
          scope: base,
          display: "standalone",
          orientation: "portrait",
          background_color: "#FFF0C4",
          theme_color: "#FF6A45",
          icons: [
            {
              src: `${base}assets/icons/ico-192.png`,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: `${base}assets/icons/ico-512.png`,
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: `${base}assets/icons/ico-maskable-512.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          // Tous les assets (y compris ceux des jeux non encore atteints)
          // doivent être en cache dès le premier chargement : chasse hors ligne.
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,mp3,woff2,json}"],
          // Nos plus gros fichiers (backgrounds) avoisinent 1 Mo : marge large.
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        devOptions: {
          // Permet de tester le service worker en environnement de dev.
          enabled: true,
        },
      }),
    ],
    build: {
      assetsDir: "_app",
    },
    server: {
      port: 5173,
    },
  };
});
