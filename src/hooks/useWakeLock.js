import { useEffect } from "react";

/**
 * Empêche l'écran de s'éteindre pendant un mini-jeu (§9.2). Ne rien
 * maintenir sur le hub ou les séquences texte : passer `actif=false`
 * là où on ne joue pas activement, pour économiser la batterie.
 * Les navigateurs relâchent automatiquement le verrou quand l'onglet
 * passe en arrière-plan ; on le redemande au retour si toujours actif.
 */
export function useWakeLock(actif) {
  useEffect(() => {
    if (!actif || !("wakeLock" in navigator)) return;

    let sentinelle = null;
    let annule = false;

    const demander = async () => {
      try {
        const s = await navigator.wakeLock.request("screen");
        if (annule) {
          s.release().catch(() => {});
          return;
        }
        sentinelle = s;
      } catch {
        // Refusé (onglet en arrière-plan, batterie faible...) : tant pis,
        // le jeu reste jouable sans le verrou.
      }
    };

    demander();

    const onVisibilite = () => {
      if (document.visibilityState === "visible" && !sentinelle) demander();
    };
    document.addEventListener("visibilitychange", onVisibilite);

    return () => {
      annule = true;
      document.removeEventListener("visibilitychange", onVisibilite);
      sentinelle?.release().catch(() => {});
    };
  }, [actif]);
}
