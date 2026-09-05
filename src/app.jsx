import { useEffect, useState } from "react";
import { GameProvider, useGameDispatch, useGameState } from "./store/GameContext.jsx";
import { SEQUENCES } from "./config/index.js";
import { definirSonActif } from "./hooks/useAudio.js";
import { definirVibrationActive } from "./hooks/useVibration.js";
import { demarrerMusiques, definirSonActifMusique } from "./hooks/useMusique.js";
import OrientationGuard from "./components/OrientationGuard.jsx";
import InstallPrompt from "./components/InstallPrompt.jsx";
import Splash from "./screens/splash/Splash.jsx";
import Pseudo from "./screens/pseudo/Pseudo.jsx";
import Hub from "./screens/hub/Hub.jsx";
import SequenceEngine from "./engine/SequenceEngine.jsx";

function SyncReglagesAudio() {
  const { reglages } = useGameState();
  useEffect(() => definirSonActif(reglages.son), [reglages.son]);
  useEffect(() => definirVibrationActive(reglages.vibration), [reglages.vibration]);
  useEffect(() => definirSonActifMusique(reglages.son), [reglages.son]);
  // Une seule fois, au tout premier montage : la musique tourne en continu
  // ensuite, jamais redémarrée d'un écran à l'autre.
  useEffect(() => demarrerMusiques(), []);
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
      <ModeTestBandeau />
      <Navigation />
      <OrientationGuard />
      <InstallPrompt />
    </GameProvider>
  );
}
