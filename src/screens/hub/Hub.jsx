import { useState } from "react";
import { useGameDispatch, useGameState } from "../../store/GameContext.jsx";
import { NOMS_JEUX, ETAPE_VERROUILLEE, SEQUENCES, PROPOSITION_ABANDON } from "../../config/index.js";
import EtapeButton from "../../components/EtapeButton.jsx";
import HubMenu from "../../components/HubMenu.jsx";
import CodeEntry from "../../components/CodeEntry.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import SequenceEngine from "../../engine/SequenceEngine.jsx";
import Reponses from "../reponses/Reponses.jsx";
import Aide from "../aide/Aide.jsx";
import Jeu0 from "../../games/jeu-0-cocktail-qui-suis-je/Jeu0.jsx";
import Jeu1 from "../../games/jeu-1-zeste-ninja/Jeu1.jsx";
import Jeu2 from "../../games/jeu-2-des-bulles/Jeu2.jsx";
import Jeu3 from "../../games/jeu-3-fait-frisquet-ici-nn/Jeu3.jsx";
import Jeu4 from "../../games/jeu-4-jeu-de-canne/Jeu4.jsx";
import Jeu5 from "../../games/jeu-5-ingredient-secret/Jeu5.jsx";
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
  const { pseudo, etapes, reglages } = useGameState();
  const dispatch = useGameDispatch();
  const [vue, setVue] = useState("hub"); // 'hub' | 'reponses' | 'aide'
  const [codeDemande, setCodeDemande] = useState(null);
  // etape { numero, phase: 'intro' | 'jeu' | 'fin' } | null
  const [etapeEnCours, setEtapeEnCours] = useState(null);
  const [messageVerrouille, setMessageVerrouille] = useState(null);
  const [afficherAbandon, setAfficherAbandon] = useState(false);

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

  if (vue === "reponses") return <Reponses onRetour={() => setVue("hub")} />;
  if (vue === "aide") return <Aide onRetour={() => setVue("hub")} />;

  if (etapeEnCours) {
    const { numero, phase } = etapeEnCours;

    if (phase === "intro") {
      return (
        <SequenceEngine
          ecrans={SEQUENCES[CLE_SEQUENCE_INTRO(numero)]}
          pseudo={pseudo}
          libelleBoutonFinal="Commencer le jeu"
          onTerminee={() => setEtapeEnCours({ numero, phase: "jeu" })}
          onQuitter={() => setEtapeEnCours(null)}
        />
      );
    }

    if (phase === "jeu") {
      const gagner = (passe = false) => {
        dispatch({ type: "GAGNER_ETAPE", numero, passe });
        setAfficherAbandon(false);
        setEtapeEnCours({ numero, phase: "fin" });
      };

      const echouer = () => {
        dispatch({ type: "INCREMENTER_ECHEC", numero });
        if (etapes[numero].echecs + 1 >= SEUIL_ABANDON) setAfficherAbandon(true);
      };

      const Composant = COMPOSANTS_JEU[numero];
      const props = { onVictoire: () => gagner(false) };
      if (JEUX_AVEC_ECHEC.includes(numero)) {
        props.onEchec = echouer;
      } else {
        props.onAbandon = () => gagner(true);
      }
      if (numero === 2) {
        props.sonActif = reglages.son;
        props.onActiverSon = () => dispatch({ type: "BASCULER_SON" });
      }
      if (numero === 4) {
        props.partieDepart = etapes[4].echecs + 1;
      }

      return (
        <>
          <Composant {...props} />
          {afficherAbandon && (
            <ConfirmDialog
              texte={PROPOSITION_ABANDON.texte}
              boutonConfirmer={PROPOSITION_ABANDON.boutonPasser}
              boutonAnnuler={PROPOSITION_ABANDON.boutonReessaie}
              onConfirmer={() => gagner(true)}
              onAnnuler={() => setAfficherAbandon(false)}
            />
          )}
        </>
      );
    }

    // phase === "fin"
    return (
      <SequenceEngine
        ecrans={SEQUENCES[CLE_SEQUENCE_FIN(numero)]}
        pseudo={pseudo}
        libelleBoutonFinal={numero === 5 ? "Terminer" : "Retour au hub"}
        onTerminee={() => {
          // TODO (palier 7) : pour l'étape 5, enchaîner sur la séquence
          // finale + l'animation du cocktail au lieu de revenir au hub.
          setEtapeEnCours(null);
        }}
        onQuitter={() => setEtapeEnCours(null)}
      />
    );
  }

  return (
    <div className="hub">
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
        Réponses
      </button>

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
