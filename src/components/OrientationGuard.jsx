import { useEffect } from "react";
import "./orientation-guard.css";

/**
 * L'app n'est pensee que pour le portrait (§9.2 du cahier des charges).
 * L'API Screen Orientation ne fonctionne quasiment que sur Android installe
 * en PWA : on la tente en best-effort, mais le vrai filet de securite est
 * l'overlay CSS ci-dessous, qui marche partout (y compris iOS Safari).
 */
export default function OrientationGuard() {
  useEffect(() => {
    const orientation = window.screen && window.screen.orientation;
    if (orientation && orientation.lock) {
      orientation.lock("portrait").catch(() => {
        // Non supporte (iOS, navigateur non installe...) : l'overlay CSS prend le relais.
      });
    }
  }, []);

  return (
    <div className="orientation-guard" role="alert" aria-live="assertive">
      <p>Tourne ton telephone en mode portrait pour continuer.</p>
    </div>
  );
}
