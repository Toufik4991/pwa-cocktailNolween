import { createContext, useContext, useEffect, useReducer } from "react";
import { chargerEtat, sauvegarderEtat, etatInitial } from "./persistence.js";

const GameStateContext = createContext(null);
const GameDispatchContext = createContext(null);

function reducer(etat, action) {
  switch (action.type) {
    case "DEFINIR_PSEUDO":
      return { ...etat, pseudo: action.pseudo };

    case "MARQUER_OUVERTURE_VUE":
      return { ...etat, ouvertureVue: true };

    case "MARQUER_FINALE_VUE":
      return { ...etat, finaleVue: true };

    case "VALIDER_CODE":
      return {
        ...etat,
        etapes: {
          ...etat.etapes,
          [action.numero]: { ...etat.etapes[action.numero], codeValide: true },
        },
      };

    case "GAGNER_ETAPE": {
      const { numero, passe = false } = action;
      const suivante = numero + 1;
      const etapes = {
        ...etat.etapes,
        [numero]: { ...etat.etapes[numero], statut: "complete", passe },
      };
      if (etapes[suivante] && etapes[suivante].statut === "verrouille") {
        etapes[suivante] = { ...etapes[suivante], statut: "disponible" };
      }
      return { ...etat, etapes };
    }

    case "INCREMENTER_ECHEC": {
      const etape = etat.etapes[action.numero];
      return {
        ...etat,
        etapes: { ...etat.etapes, [action.numero]: { ...etape, echecs: etape.echecs + 1 } },
      };
    }

    case "BASCULER_SON":
      return { ...etat, reglages: { ...etat.reglages, son: !etat.reglages.son } };

    case "BASCULER_VIBRATION":
      return { ...etat, reglages: { ...etat.reglages, vibration: !etat.reglages.vibration } };

    case "ACTIVER_MODE_TEST":
      return { ...etat, modeTest: true };

    case "DEBLOQUER_TOUT": {
      const etapes = {};
      for (let i = 0; i <= 5; i++) {
        const actuelle = etat.etapes[i];
        etapes[i] = {
          ...actuelle,
          statut: actuelle.statut === "complete" ? "complete" : "disponible",
          codeValide: true,
        };
      }
      return { ...etat, etapes };
    }

    case "REMPLACER_ETAT":
      return action.etat;

    case "REINITIALISER":
      return etatInitial();

    default:
      return etat;
  }
}

export function GameProvider({ children }) {
  const [etat, dispatch] = useReducer(reducer, undefined, chargerEtat);

  useEffect(() => {
    sauvegarderEtat(etat);
  }, [etat]);

  return (
    <GameStateContext.Provider value={etat}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState doit être utilisé sous GameProvider");
  return ctx;
}

export function useGameDispatch() {
  const ctx = useContext(GameDispatchContext);
  if (!ctx) throw new Error("useGameDispatch doit être utilisé sous GameProvider");
  return ctx;
}
