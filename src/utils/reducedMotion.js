// Petit utilitaire partagé (§H et §I, 06/09/2026) : respecter
// prefers-reduced-motion pour les apparitions du Glaçant et l'animation
// finale, sans dupliquer la même vérification à chaque endroit.
export function mouvementReduit() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}
