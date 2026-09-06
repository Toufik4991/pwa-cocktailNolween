import { useEffect, useMemo, useRef, useState } from "react";
import { JEU_5, GRILLE, MOTS, MOT_PIEGE, DEFINITIONS } from "../../config/index.js";
import { cellulesDuMot, projeterSurDirection, cellulesEntre, correspondAuMot } from "./grille-logic.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { vibrer } from "../../hooks/useVibration.js";
import { asset, styleFondImage } from "../../utils/assetUrl.js";
import "./jeu5.css";

const IMAGE_CHARGE_PLEINE = asset("assets/images/img-jeu5-charge-pleine.png");
const IMAGE_CHARGE_VIDE = asset("assets/images/img-jeu5-charge-vide.png");

const MOTS_CIBLES = Object.keys(MOTS);
const CELLULES_MOTS = Object.fromEntries(
  MOTS_CIBLES.map((mot) => [mot, cellulesDuMot(MOTS[mot].depart, MOTS[mot].direction, mot.length)])
);
const CELLULES_PIEGE = cellulesDuMot(MOT_PIEGE.depart, MOT_PIEGE.direction, MOT_PIEGE.mot.length);

function cle(r, c) {
  return `${r}-${c}`;
}

export default function Jeu5({ onVictoire, onAbandon }) {
  const grilleRef = useRef(null);
  const [depart, setDepart] = useState(null);
  const [selection, setSelection] = useState([]);
  const [selectionErreur, setSelectionErreur] = useState(null); // trace transitoire (mauvaise réponse)
  const [selectionPiege, setSelectionPiege] = useState(null); // trace transitoire (piège)
  const [trouves, setTrouves] = useState({}); // { MOT: [[r,c], ...] }
  const [messagePiege, setMessagePiege] = useState(null);
  const [charges, setCharges] = useState(JEU_5.NOMBRE_CHARGES_INDICE);
  const [motsAvecIndice, setMotsAvecIndice] = useState([]);
  const [indiceActif, setIndiceActif] = useState(null); // { mot, texte, restant }
  const [peutAbandonner, setPeutAbandonner] = useState(false);
  const dernierPiegeRef = useRef(0);

  useEffect(() => {
    precharger(["sfx-jeu5-mot.mp3", "sfx-jeu5-piege.mp3", "sfx-jeu5-indice.mp3", "sfx-victoire.mp3"]);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPeutAbandonner(true), JEU_5.DELAI_BOUTON_ABANDON * 1000);
    return () => clearTimeout(t);
  }, []);

  const celluleDepuisPoint = (clientX, clientY) => {
    const rect = grilleRef.current.getBoundingClientRect();
    const taille = rect.width / JEU_5.GRILLE_LARGEUR;
    const col = Math.min(JEU_5.GRILLE_LARGEUR - 1, Math.max(0, Math.floor((clientX - rect.left) / taille)));
    const row = Math.min(JEU_5.GRILLE_HAUTEUR - 1, Math.max(0, Math.floor((clientY - rect.top) / taille)));
    return [row, col];
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    grilleRef.current.setPointerCapture(e.pointerId);
    const c = celluleDepuisPoint(e.clientX, e.clientY);
    setDepart(c);
    setSelection([c]);
  };

  const onPointerMove = (e) => {
    if (!depart) return;
    const brut = celluleDepuisPoint(e.clientX, e.clientY);
    const projete = projeterSurDirection(depart, brut);
    setSelection(cellulesEntre(depart, projete));
  };

  const onPointerUp = () => {
    if (!depart) return;
    finaliserSelection(selection);
    setDepart(null);
  };

  const finaliserSelection = (selectionFinale) => {
    if (selectionFinale.length < 2) {
      setSelection([]);
      return;
    }

    // Le piège se vérifie AVANT les vrais mots (§ notes techniques).
    if (correspondAuMot(selectionFinale, CELLULES_PIEGE)) {
      setSelectionPiege(selectionFinale);
      jouerSon("sfx-jeu5-piege.mp3");
      const maintenant = Date.now();
      if (maintenant - dernierPiegeRef.current > JEU_5.DELAI_ANTI_SPAM_PIEGE * 1000) {
        dernierPiegeRef.current = maintenant;
        setMessagePiege(MOT_PIEGE.message);
        setTimeout(() => setMessagePiege(null), 2200);
      }
      setTimeout(() => setSelectionPiege(null), 350);
      setSelection([]);
      return;
    }

    const motTrouve = MOTS_CIBLES.find(
      (mot) => !trouves[mot] && correspondAuMot(selectionFinale, CELLULES_MOTS[mot])
    );
    if (motTrouve) {
      jouerSon("sfx-jeu5-mot.mp3");
      vibrer(20);
      setTrouves((t) => {
        const suivant = { ...t, [motTrouve]: CELLULES_MOTS[motTrouve] };
        if (Object.keys(suivant).length === MOTS_CIBLES.length) {
          jouerSon("sfx-victoire.mp3");
          setTimeout(() => onVictoire(), 1200);
        }
        return suivant;
      });
      setSelection([]);
      return;
    }

    // Mauvaise sélection : trace effacée en fondu, vibration légère, sans pénalité.
    setSelectionErreur(selectionFinale);
    vibrer(30);
    setTimeout(() => setSelectionErreur(null), 300);
    setSelection([]);
  };

  const demanderIndice = () => {
    if (charges <= 0) return;
    const candidats = MOTS_CIBLES.filter((m) => !trouves[m] && !motsAvecIndice.includes(m));
    if (candidats.length === 0) return;
    const mot = candidats[Math.floor(Math.random() * candidats.length)];
    jouerSon("sfx-jeu5-indice.mp3");
    setCharges((c) => c - 1);
    setMotsAvecIndice((liste) => [...liste, mot]);
    setIndiceActif({ mot, texte: DEFINITIONS[mot] });
    setTimeout(() => setIndiceActif(null), JEU_5.DUREE_AFFICHAGE_INDICE * 1000);
  };

  const cellulesSurbrillance = useMemo(() => {
    const map = new Map();
    for (const c of selection) map.set(cle(...c), "active");
    if (selectionErreur) for (const c of selectionErreur) map.set(cle(...c), "erreur");
    if (selectionPiege) for (const c of selectionPiege) map.set(cle(...c), "piege");
    for (const cells of Object.values(trouves)) for (const c of cells) map.set(cle(...c), "trouve");
    return map;
  }, [selection, selectionErreur, selectionPiege, trouves]);

  return (
    <div className="jeu5">
      <p className="jeu5__progression">
        Mots trouvés : {Object.keys(trouves).length} / {MOTS_CIBLES.length}
      </p>

      {messagePiege && <p className="jeu5__message-piege">« {messagePiege} »</p>}
      {indiceActif && (
        <p className="jeu5__indice-actif">
          <strong>{indiceActif.mot.length} lettres :</strong> {indiceActif.texte}
        </p>
      )}

      <div
        ref={grilleRef}
        className="jeu5__grille"
        style={{ "--cols": JEU_5.GRILLE_LARGEUR, ...styleFondImage("assets/images/img-jeu5-grille-fond.webp") }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {GRILLE.map((ligne, r) =>
          [...ligne].map((lettre, c) => (
            <span key={cle(r, c)} className={`jeu5__cellule jeu5__cellule--${cellulesSurbrillance.get(cle(r, c)) || ""}`}>
              {lettre}
            </span>
          ))
        )}
      </div>

      <div className="jeu5__mots">
        {MOTS_CIBLES.map((mot) => (
          <span key={mot} className="jeu5__mot">
            {trouves[mot] ? mot : "_ ".repeat(mot.length).trim()}
          </span>
        ))}
      </div>

      <div className="jeu5__bas">
        <button className="jeu5__indice" onClick={demanderIndice} disabled={charges <= 0}>
          Indice
          <span className="jeu5__charges">
            {Array.from({ length: JEU_5.NOMBRE_CHARGES_INDICE }, (_, i) => (
              <img key={i} src={i < charges ? IMAGE_CHARGE_PLEINE : IMAGE_CHARGE_VIDE} alt="" />
            ))}
          </span>
        </button>
        {peutAbandonner && (
          <button className="jeu5__abandon" onClick={onAbandon}>
            J'abandonne
          </button>
        )}
      </div>
    </div>
  );
}
