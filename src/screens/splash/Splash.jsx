import { useEffect, useRef, useState } from "react";
import { useGameDispatch } from "../../store/GameContext.jsx";
import { asset, styleFondImage } from "../../utils/assetUrl.js";
import "./splash.css";

const BLOCAGE_MS = 5000;
const TAPS_MODE_TEST = 7;
const FENETRE_TAP_MS = 1500;

export default function Splash({ onContinuer }) {
  const [pret, setPret] = useState(false);
  const dispatch = useGameDispatch();
  const tapsRef = useRef({ count: 0, dernierTap: 0 });

  useEffect(() => {
    const t = setTimeout(() => setPret(true), BLOCAGE_MS);
    return () => clearTimeout(t);
  }, []);

  const onTapTitre = () => {
    const maintenant = Date.now();
    const taps = tapsRef.current;
    if (maintenant - taps.dernierTap > FENETRE_TAP_MS) {
      taps.count = 0;
    }
    taps.count += 1;
    taps.dernierTap = maintenant;
    if (taps.count >= TAPS_MODE_TEST) {
      taps.count = 0;
      dispatch({ type: "ACTIVER_MODE_TEST" });
    }
  };

  return (
    <div className="splash" style={styleFondImage("assets/images/bg-accueil.webp")}>
      <h1 className="splash__titre" onClick={onTapTitre}>
        <img src={asset("assets/images/img-logo-pinatresolada.png")} alt="Pina Tresolada" />
      </h1>

      <div className="splash__progress" aria-hidden="true">
        <div
          className="splash__progress-fill"
          style={{ animationDuration: `${BLOCAGE_MS}ms` }}
        />
      </div>

      <button onClick={onContinuer} disabled={!pret}>
        {pret ? "Commencer" : "Patience…"}
      </button>
    </div>
  );
}
