import { useState } from "react";
import { useGameDispatch, useGameState } from "../../store/GameContext.jsx";
import { useWakeLock } from "../../hooks/useWakeLock.js";
import { useMusiqueSelonEcran } from "../../hooks/useMusique.js";
import { asset, styleFondImage } from "../../utils/assetUrl.js";
import { NOMS_JEUX, ETAPE_VERROUILLEE, SEQUENCES, PROPOSITION_ABANDON } from "../../config/index.js";
import EtapeButton from "../../components/EtapeButton.jsx";
import HubMenu from "../../components/HubMenu.jsx";
import CodeEntry from "../../components/CodeEntry.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import TestPanel from "../../components/TestPanel.jsx";
import SequenceEngine from "../../engine/SequenceEngine.jsx";
import Reponses from "../reponses/Reponses.jsx";
import Aide from "../aide/Aide.jsx";
import Jeu0 from "../../games/jeu-0-cocktail-qui-suis-je/Jeu0.jsx";
import Jeu1 from "../../games/jeu-1-zeste-ninja/Jeu1.jsx";
import Jeu2 from "../../games/jeu-2-des-bulles/Jeu2.jsx";
import Jeu3 from "../../games/jeu-3-fait-frisquet-ici-nn/Jeu3.jsx";
import Jeu4 from "../../games/jeu-4-jeu-de-canne/Jeu4.jsx";
import Jeu5 from "../../games/jeu-5-ingredient-secret/Jeu5.jsx";
import FinaleAnimation from "../finale/FinaleAnimation.jsx";
import "./hub.css";

const CLE_SEQUENCE_INTRO = (n) => `jeu-${n}-intro`;
const CLE_SEQUENCE_FIN = (n) => `jeu-${n}-fin`;

// Jeux 0, 2, 4 : condition d'échec classique (5e échec -> proposition
// d'abandon). Jeux 1, 3, 5 : pas d'échec possible, juste un bouton
// "J'abandonne" temporisé propre à chaque jeu (voir onAbandon).
const JEUX_AVEC_ECHEC = [0, 2, 4];
const SEUIL_ABANDON = 5;
const COMPOSANTS_JEU = { 0: Jeu0, 1: Jeu1, 2: Jeu2, 3: Jeu3, 4: Jeu4, 5: Jeu5 };

export default function Hub() {
  const etat = useGameState();
  const { pseudo, etapes, reglages, modeTest } = etat;
  const dispatch = useGameDispatch();
  const [vue, setVue] = useState("hub"); // 'hub' | 'reponses' | 'aide'
  const [codeDemande, setCodeDemande] = useState(null);
  // etape { numero, phase: 'intro' | 'jeu' | 'fin' } | null
  const [etapeEnCours, setEtapeEnCours] = useState(null);
  const [messageVerrouille, setMessageVerrouille] = useState(null);
  const [afficherAbandon, setAfficherAbandon] = useState(false);
  const [finalePhase, setFinalePhase] = useState(null); // null | 'sequence' | 'animation'
  const [sequencePreview, setSequencePreview] = useState(null); // écrans rejoués depuis le mode test
  const [panneauTestOuvert, setPanneauTestOuvert] = useState(false);

  const toutTermine = [0, 1, 2, 3, 4, 5].every((n) => etapes[n].statut === "complete");

  // Wake Lock actif seulement pendant le mini-jeu lui-même, jamais sur le
  // hub ni les séquences texte (§9.2, économie de batterie).
  useWakeLock(etapeEnCours?.phase === "jeu");

  // Musique : mus-hub par défaut, mus-jeu pendant un mini-jeu (coupée pour
  // le jeu 2 spécifiquement), mus-final pendant l'animation (voir useMusique.js).
  useMusiqueSelonEcran(etapeEnCours?.phase === "jeu" ? etapeEnCours.numero : null, finalePhase === "animation");

  const demarrerEtape = (numero) => setEtapeEnCours({ numero, phase: "intro" });

  const cliquerEtape = (numero) => {
    const etape = etapes[numero];
    if (etape.statut === "verrouille") {
      setMessageVerrouille(ETAPE_VERROUILLEE[Math.floor(Math.random() * ETAPE_VERROUILLEE.length)]);
      setTimeout(() => setMessageVerrouille(null), 2500);
      return;
    }
    if (numero === 0 || etape.codeValide) {
      demarrerEtape(numero);
      return;
    }
    setCodeDemande(numero);
  };

  const gagnerEtape = (numero, passe = false) => {
    dispatch({ type: "GAGNER_ETAPE", numero, passe });
    setAfficherAbandon(false);
    setEtapeEnCours({ numero, phase: "fin" });
  };

  const echouerEtape = (numero) => {
    dispatch({ type: "INCREMENTER_ECHEC", numero });
    if (etapes[numero].echecs + 1 >= SEUIL_ABANDON) setAfficherAbandon(true);
  };

  let contenu;

  if (vue === "reponses") {
    contenu = <Reponses onRetour={() => setVue("hub")} />;
  } else if (vue === "aide") {
    contenu = <Aide onRetour={() => setVue("hub")} />;
  } else if (sequencePreview) {
    contenu = (
      <SequenceEngine
        ecrans={sequencePreview}
        pseudo={pseudo}
        onTerminee={() => setSequencePreview(null)}
        onQuitter={() => setSequencePreview(null)}
      />
    );
  } else if (finalePhase === "sequence") {
    contenu = (
      <SequenceEngine
        ecrans={SEQUENCES.finale}
        pseudo={pseudo}
        onTerminee={() => setFinalePhase("animation")}
        onQuitter={() => setFinalePhase(null)}
      />
    );
  } else if (finalePhase === "animation") {
    contenu = <FinaleAnimation pseudo={pseudo} onRetourHub={() => setFinalePhase(null)} />;
  } else if (etapeEnCours) {
    const { numero, phase } = etapeEnCours;

    if (phase === "intro") {
      contenu = (
        <SequenceEngine
          ecrans={SEQUENCES[CLE_SEQUENCE_INTRO(numero)]}
          pseudo={pseudo}
          libelleBoutonFinal="Commencer le jeu"
          onTerminee={() => setEtapeEnCours({ numero, phase: "jeu" })}
          onQuitter={() => setEtapeEnCours(null)}
        />
      );
    } else if (phase === "jeu") {
      const Composant = COMPOSANTS_JEU[numero];
      const props = { onVictoire: () => gagnerEtape(numero, false) };
      if (JEUX_AVEC_ECHEC.includes(numero)) {
        props.onEchec = () => echouerEtape(numero);
      } else {
        props.onAbandon = () => gagnerEtape(numero, true);
      }
      if (numero === 2) {
        props.sonActif = reglages.son;
        props.onActiverSon = () => dispatch({ type: "BASCULER_SON" });
      }
      if (numero === 4) {
        props.partieDepart = etapes[4].echecs + 1;
      }

      contenu = (
        <>
          <Composant {...props} />
          {afficherAbandon && (
            <ConfirmDialog
              texte={PROPOSITION_ABANDON.texte}
              boutonConfirmer={PROPOSITION_ABANDON.boutonPasser}
              boutonAnnuler={PROPOSITION_ABANDON.boutonReessaie}
              onConfirmer={() => gagnerEtape(numero, true)}
              onAnnuler={() => setAfficherAbandon(false)}
            />
          )}
        </>
      );
    } else {
      // phase === "fin"
      contenu = (
        <SequenceEngine
          ecrans={SEQUENCES[CLE_SEQUENCE_FIN(numero)]}
          pseudo={pseudo}
          libelleBoutonFinal={numero === 5 ? "Terminer" : "Retour au hub"}
          onTerminee={() => {
            setEtapeEnCours(null);
            if (numero === 5) setFinalePhase("sequence");
          }}
          onQuitter={() => setEtapeEnCours(null)}
        />
      );
    }
  } else {
    contenu = (
      <div className="hub" style={styleFondImage("assets/images/bg-hub.webp")}>
        <HubMenu onOuvrirAide={() => setVue("aide")} />

        <h1>Salut {pseudo} !</h1>

        <div className="hub__grille">
          {[0, 1, 2, 3, 4, 5].map((numero) => (
            <EtapeButton
              key={numero}
              numero={numero}
              statut={etapes[numero].statut}
              nom={NOMS_JEUX[numero]}
              onClick={() => cliquerEtape(numero)}
            />
          ))}
        </div>

        <button className="hub__bouton-reponses" onClick={() => setVue("reponses")}>
          <img src={asset("assets/images/img-bouton-reponses.png")} alt="" />
          <span>Réponses</span>
        </button>

        {toutTermine && (
          <button className="hub__revoir-fin" onClick={() => setFinalePhase("sequence")}>
            Revoir la fin
          </button>
        )}

        {messageVerrouille && <p className="hub__message-verrouille">{messageVerrouille}</p>}

        {codeDemande !== null && (
          <CodeEntry
            numero={codeDemande}
            onAnnuler={() => setCodeDemande(null)}
            onValide={() => {
              const n = codeDemande;
              dispatch({ type: "VALIDER_CODE", numero: n });
              setCodeDemande(null);
              demarrerEtape(n);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {contenu}

      {modeTest && !panneauTestOuvert && (
        <button className="hub__declencheur-test" onClick={() => setPanneauTestOuvert(true)}>
          🔧
        </button>
      )}

      {panneauTestOuvert && (
        <TestPanel
          etat={etat}
          peutForcerVictoire={etapeEnCours?.phase === "jeu"}
          onFermer={() => setPanneauTestOuvert(false)}
          onDebloquerTout={() => dispatch({ type: "DEBLOQUER_TOUT" })}
          onSauterAuJeu={(n) => {
            setEtapeEnCours({ numero: n, phase: "jeu" });
            setPanneauTestOuvert(false);
          }}
          onForcerVictoire={() => {
            if (etapeEnCours?.phase === "jeu") gagnerEtape(etapeEnCours.numero, false);
            setPanneauTestOuvert(false);
          }}
          onRejouerOuverture={() => {
            setSequencePreview(SEQUENCES.ouverture);
            setEtapeEnCours(null);
            setPanneauTestOuvert(false);
          }}
          onRejouerIntro={(n) => {
            setSequencePreview(SEQUENCES[CLE_SEQUENCE_INTRO(n)]);
            setEtapeEnCours(null);
            setPanneauTestOuvert(false);
          }}
          onRejouerFin={(n) => {
            setSequencePreview(SEQUENCES[CLE_SEQUENCE_FIN(n)]);
            setEtapeEnCours(null);
            setPanneauTestOuvert(false);
          }}
          onReinitialiser={() => {
            dispatch({ type: "REINITIALISER" });
            setEtapeEnCours(null);
            setPanneauTestOuvert(false);
          }}
        />
      )}
    </>
  );
}
