import { useEffect, useState } from "react";
import "./install-prompt.css";

const STORAGE_KEY = "pina-tresolada:install-notice-vue";

function estDejaInstallee() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function estIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

/**
 * Android : ecoute beforeinstallprompt et propose l'installation native.
 * iOS : cet evenement n'existe pas, on affiche une notice explicative une
 * seule fois (§9.4 du cahier des charges).
 */
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosNotice, setShowIosNotice] = useState(false);

  useEffect(() => {
    if (estDejaInstallee()) return;

    const dejaVue = localStorage.getItem(STORAGE_KEY) === "1";

    if (estIOS()) {
      if (!dejaVue) setShowIosNotice(true);
      return;
    }

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const fermerNoticeIos = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShowIosNotice(false);
  };

  const installerAndroid = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (deferredPrompt) {
    return (
      <div className="install-banner">
        <p>Installer Pina Tresolada sur l'ecran d'accueil ?</p>
        <div className="install-banner__actions">
          <button onClick={installerAndroid}>Installer</button>
          <button className="install-banner__skip" onClick={() => setDeferredPrompt(null)}>
            Plus tard
          </button>
        </div>
      </div>
    );
  }

  if (showIosNotice) {
    return (
      <div className="install-banner">
        <p>
          Pour installer l'app : appuie sur <strong>Partager</strong> puis{" "}
          <strong>« Sur l'ecran d'accueil »</strong>.
        </p>
        <button onClick={fermerNoticeIos}>Compris</button>
      </div>
    );
  }

  return null;
}
