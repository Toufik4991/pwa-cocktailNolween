import { useState } from "react";
import { useGameDispatch, useGameState } from "../store/GameContext.jsx";
import { encoderProgression, decoderProgression } from "../store/shortCode.js";
import { CONFIRMATION_RESET } from "../config/index.js";
import ConfirmDialog from "./ConfirmDialog.jsx";
import "./hub-menu.css";

export default function HubMenu({ onOuvrirAide }) {
  const etat = useGameState();
  const dispatch = useGameDispatch();
  const [ouvert, setOuvert] = useState(false);
  const [editionPseudo, setEditionPseudo] = useState(false);
  const [pseudoTemp, setPseudoTemp] = useState(etat.pseudo || "");
  const [confirmationReset, setConfirmationReset] = useState(false);
  const [panneauSauvegarde, setPanneauSauvegarde] = useState(null); // 'export' | 'restaurer' | null
  const [codeRestauration, setCodeRestauration] = useState("");
  const [erreurRestauration, setErreurRestauration] = useState("");

  const nbCompletes = Object.values(etat.etapes).filter((e) => e.statut === "complete").length;

  const validerPseudo = () => {
    const propre = pseudoTemp.trim();
    if (propre) dispatch({ type: "DEFINIR_PSEUDO", pseudo: propre });
    setEditionPseudo(false);
  };

  const confirmerReset = () => {
    dispatch({ type: "REINITIALISER" });
    setConfirmationReset(false);
    setOuvert(false);
  };

  const appliquerRestauration = () => {
    const resultat = decoderProgression(codeRestauration);
    if (resultat.erreur) {
      setErreurRestauration(resultat.erreur);
      return;
    }
    dispatch({ type: "REMPLACER_ETAT", etat: { ...etat, etapes: resultat.etapes } });
    setErreurRestauration("");
    setPanneauSauvegarde(null);
    setCodeRestauration("");
  };

  return (
    <div className="hub-menu">
      <button
        className="hub-menu__declencheur"
        onClick={() => setOuvert((v) => !v)}
        aria-label="Menu"
        aria-expanded={ouvert}
      >
        ☰
      </button>

      {ouvert && (
        <div className="hub-menu__panneau">
          <p className="hub-menu__progression">Progression : {nbCompletes} / 6</p>

          <button onClick={() => dispatch({ type: "BASCULER_SON" })}>
            Son : {etat.reglages.son ? "activé" : "coupé"}
          </button>
          <button onClick={() => dispatch({ type: "BASCULER_VIBRATION" })}>
            Vibration : {etat.reglages.vibration ? "activée" : "coupée"}
          </button>

          {editionPseudo ? (
            <div className="hub-menu__pseudo-edit">
              <input
                value={pseudoTemp}
                onChange={(e) => setPseudoTemp(e.target.value)}
                maxLength={24}
                autoFocus
              />
              <button onClick={validerPseudo}>OK</button>
            </div>
          ) : (
            <button onClick={() => setEditionPseudo(true)}>Pseudo : {etat.pseudo}</button>
          )}

          <button onClick={onOuvrirAide}>Aide</button>

          <button onClick={() => setPanneauSauvegarde(panneauSauvegarde === "export" ? null : "export")}>
            Exporter ma progression
          </button>
          {panneauSauvegarde === "export" && (
            <p className="hub-menu__code">{encoderProgression(etat.etapes)}</p>
          )}

          <button onClick={() => setPanneauSauvegarde(panneauSauvegarde === "restaurer" ? null : "restaurer")}>
            Restaurer une progression
          </button>
          {panneauSauvegarde === "restaurer" && (
            <div className="hub-menu__restaurer">
              <input
                value={codeRestauration}
                onChange={(e) => setCodeRestauration(e.target.value)}
                placeholder="Code à 7 caractères"
                maxLength={7}
              />
              <button onClick={appliquerRestauration}>Restaurer</button>
              {erreurRestauration && <p className="hub-menu__erreur">{erreurRestauration}</p>}
            </div>
          )}

          <button className="hub-menu__danger" onClick={() => setConfirmationReset(true)}>
            Réinitialiser la partie
          </button>
        </div>
      )}

      {confirmationReset && (
        <ConfirmDialog
          texte={CONFIRMATION_RESET}
          boutonConfirmer="Tout effacer"
          boutonAnnuler="Annuler"
          onConfirmer={confirmerReset}
          onAnnuler={() => setConfirmationReset(false)}
        />
      )}
    </div>
  );
}
