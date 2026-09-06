import { useEffect, useState } from "react";
import { GameProvider, useGameDispatch, useGameState } from "./store/GameContext.jsx";
import { SEQUENCES } from "./config/index.js";
import { definirSonActif, precharger, jouerSon } from "./audio/audio.js";
import { definirVibrationActive } from "./hooks/useVibration.js";
import OrientationGuard from "./components/OrientationGuard.jsx";
import InstallPrompt from "./components/InstallPrompt.jsx";
import Splash from "./screens/splash/Splash.jsx";
import Pseudo from "./screens/pseudo/Pseudo.jsx";
import Hub from "./screens/hub/Hub.jsx";
import SequenceEngine from "./engine/SequenceEngine.jsx";

// Clic générique sur les boutons de navigation (hub, menus, séquences,
// codes...), PAS dans les mini-jeux eux-mêmes : ceux-ci ont déjà leur
// propre son dédié par action (tranche, bulle, pièce...) et un clic
// générique par-dessus ferait doublon. sfx-clic.mp3 était chargé mais
// jamais joué nulle part avant cette correction (05/09, soir).
function SonClicGlobal() {
  useEffect(() => {
    precharger(["sfx-clic.mp3", "sfx-texte.mp3"]);
    const onClick = (e) => {
      const bouton = e.target.closest("button");
      if (!bouton || bouton.disabled) return;
      if (bouton.closest(".jeu0, .jeu1, .jeu2, .jeu3, .jeu4, .jeu5")) return;
      jouerSon("sfx-clic.mp3", { volume: 0.5 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

function SyncReglagesAudio() {
  const { reglages } = useGameState();
  useEffect(() => definirSonActif(reglages.son), [reglages.son]);
  useEffect(() => definirVibrationActive(reglages.vibration), [reglages.vibration]);
  return null;
}

function ModeTestBandeau() {
  const { modeTest } = useGameState();
  if (!modeTest) return null;
  return (
    <div role="status" className="mode-test-bandeau">
      MODE TEST
    </div>
  );
}

function Navigation() {
  const { pseudo, ouvertureVue } = useGameState();
  const dispatch = useGameDispatch();
  // L'accueil (§2.1) s'affiche à chaque lancement. Le pseudo et la
  // séquence d'ouverture, eux, ne sont montrés qu'une seule fois.
  const [ecran, setEcran] = useState("splash");

  const apresSplash = () => {
    if (!pseudo) return setEcran("pseudo");
    if (!ouvertureVue) return setEcran("ouverture");
    setEcran("hub");
  };

  if (ecran === "splash") {
    return <Splash onContinuer={apresSplash} />;
  }
  if (ecran === "pseudo") {
    return <Pseudo onValide={() => setEcran("ouverture")} />;
  }
  if (ecran === "ouverture") {
    return (
      <SequenceEngine
        ecrans={SEQUENCES.ouverture}
        pseudo={pseudo}
        libelleBoutonFinal="C'est parti"
        onTerminee={() => {
          dispatch({ type: "MARQUER_OUVERTURE_VUE" });
          setEcran("hub");
        }}
        onQuitter={() => setEcran("hub")}
      />
    );
  }
  return <Hub />;
}

export default function App() {
  return (
    <GameProvider>
      <SyncReglagesAudio />
      <SonClicGlobal />
      <ModeTestBandeau />
      <Navigation />
      <OrientationGuard />
      <InstallPrompt />
    </GameProvider>
  );
}
