import { useEffect, useRef, useState } from "react";
import {
  JEU_1,
  CONSIGNES,
  AGRUMES,
  LEURRES,
  NOMS_FRUITS,
  REPLIQUES_MAUVAIS_AGRUME,
  REPLIQUES_LEURRE,
} from "../../config/index.js";
import { tirerTypeFruit, poidsDuFruit, intervalleApparition, traitCoupeLeFruit } from "./jeu1-logic.js";
import { precharger, jouerSon } from "../../hooks/useAudio.js";
import { vibrer } from "../../hooks/useVibration.js";
import { asset } from "../../utils/assetUrl.js";
import "./jeu1.css";

// -25% de vitesse verticale demandé le 06/09/2026 (§D1) : en scalant la
// gravité par 0.75^2 = 0.5625, vy0 = sqrt(2*GRAVITE*hauteurVisee) diminue
// exactement de 25% tout en gardant le même sommet d'arc visé (70-95% de
// l'écran) — un simple ×0.75 sur vy0 sans toucher la gravité aurait
// raccourci les arcs au lieu de les ralentir.
const GRAVITE = 1900 * 0.5625; // px/s^2
const RAYON_FRUIT = 34;
const TOUS_FRUITS = [...AGRUMES, ...LEURRES];

function chargerImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export default function Jeu1({ onVictoire, onAbandon }) {
  const canvasRef = useRef(null);
  const conteneurRef = useRef(null);
  const imagesRef = useRef(null);
  const etatRef = useRef(null);
  const rafRef = useRef(null);

  const [consigneIndex, setConsigneIndex] = useState(0);
  const [grammesConsigne, setGrammesConsigne] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(null);
  const [termine, setTermine] = useState(false);
  const [peutAbandonner, setPeutAbandonner] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPeutAbandonner(true), JEU_1.DELAI_BOUTON_ABANDON * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    precharger(["sfx-jeu1-tranche.mp3", "sfx-jeu1-erreur.mp3", "sfx-victoire.mp3"]);

    const images = { entier: {}, coupe: {} };
    for (const type of TOUS_FRUITS) {
      images.entier[type] = chargerImage(asset(`assets/images/img-jeu1-${type}-entier.png`));
      images.coupe[type] = chargerImage(asset(`assets/images/img-jeu1-${type}-coupe.png`));
    }
    // La traînée du doigt est dessinée directement au canvas (voir
    // dessiner() plus bas), pas de sprite dédié.
    images.eclaboussure = chargerImage(asset("assets/images/img-jeu1-eclaboussure.png"));
    imagesRef.current = images;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const etat = {
      fruits: [],
      morceaux: [],
      eclaboussures: [],
      trace: [],
      nbFruitsApparus: 0,
      dernierSpawn: 0,
      consigneIndex: 0,
      grammesConsigne: 0,
      total: 0,
      dernierePliqueTexte: null,
      dernierRepliqueTemps: -Infinity,
      fini: false,
    };
    etatRef.current = etat;

    function redimensionner() {
      const rect = conteneurRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    redimensionner();
    window.addEventListener("resize", redimensionner);

    function fairApparaitreFruit(tempsMs) {
      const consigne = CONSIGNES[etat.consigneIndex];
      const type = tirerTypeFruit(consigne.fruit);
      const largeur = canvas.width;
      const hauteur = canvas.height;
      const x = largeur * (0.2 + Math.random() * 0.6);
      // Vise un sommet d'arc entre 70% et 95% de la hauteur de l'écran.
      const hauteurVisee = hauteur * (0.7 + Math.random() * 0.25);
      const vy0 = -Math.sqrt(2 * GRAVITE * hauteurVisee);
      const vx = (Math.random() - 0.5) * 160;
      etat.fruits.push({
        id: Math.random(),
        type,
        x,
        y: hauteur + RAYON_FRUIT,
        vx,
        vy: vy0,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 4,
        rayon: RAYON_FRUIT,
        tranche: false,
      });
      etat.nbFruitsApparus += 1;
      etat.dernierSpawn = tempsMs;
    }

    function repliqueAleatoire(pool, texteActuel) {
      let choix = pool[Math.floor(Math.random() * pool.length)];
      if (pool.length > 1) {
        while (choix === texteActuel) choix = pool[Math.floor(Math.random() * pool.length)];
      }
      return choix;
    }

    function declencherReplique(pool, tempsSecondes) {
      if (tempsSecondes - etat.dernierRepliqueTemps < JEU_1.DELAI_MIN_REPLIQUE) return;
      const texte = repliqueAleatoire(pool, etat.dernierePliqueTexte);
      etat.dernierePliqueTexte = texte;
      etat.dernierRepliqueTemps = tempsSecondes;
      setMessage(texte);
    }

    function trancherFruit(fruit, tempsSecondes) {
      fruit.tranche = true;
      etat.fruits = etat.fruits.filter((f) => f !== fruit);

      // Deux moitiés qui retombent, façon "coupé en deux".
      for (const signe of [-1, 1]) {
        etat.morceaux.push({
          type: fruit.type,
          x: fruit.x,
          y: fruit.y,
          vx: fruit.vx + signe * 90,
          vy: fruit.vy - 60,
          rotation: fruit.rotation,
          vRotation: signe * 3,
          age: 0,
        });
      }

      if (AGRUMES.includes(fruit.type)) {
        const consigne = CONSIGNES[etat.consigneIndex];
        if (fruit.type === consigne.fruit) {
          jouerSon("sfx-jeu1-tranche.mp3");
          vibrer(15);
          etat.eclaboussures.push({ x: fruit.x, y: fruit.y, age: 0 });
          etat.grammesConsigne += poidsDuFruit(fruit.type);
          etat.total += poidsDuFruit(fruit.type);
          setGrammesConsigne(etat.grammesConsigne);
          setTotal(etat.total);

          if (etat.grammesConsigne >= consigne.grammes) {
            if (etat.consigneIndex >= CONSIGNES.length - 1) {
              etat.fini = true;
              setTermine(true);
              jouerSon("sfx-victoire.mp3");
              setTimeout(() => onVictoire(), 1200);
            } else {
              etat.consigneIndex += 1;
              etat.grammesConsigne = 0;
              setConsigneIndex(etat.consigneIndex);
              setGrammesConsigne(0);
            }
          }
        } else {
          jouerSon("sfx-jeu1-erreur.mp3");
          declencherReplique(REPLIQUES_MAUVAIS_AGRUME, tempsSecondes);
        }
      } else {
        jouerSon("sfx-jeu1-erreur.mp3");
        declencherReplique(REPLIQUES_LEURRE, tempsSecondes);
      }
    }

    function verifierTranchage(a, b, tempsSecondes) {
      for (const fruit of etat.fruits) {
        if (!fruit.tranche && traitCoupeLeFruit(a, b, fruit)) {
          trancherFruit(fruit, tempsSecondes);
        }
      }
    }

    // --- Entrées tactiles / souris ---
    let dernierPoint = null;
    function positionRelative(e) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onPointerDown(e) {
      dernierPoint = positionRelative(e);
      etat.trace = [{ ...dernierPoint, age: 0 }];
    }
    function onPointerMove(e) {
      if (!dernierPoint) return;
      const p = positionRelative(e);
      verifierTranchage(dernierPoint, p, performance.now() / 1000);
      etat.trace.push({ ...p, age: 0 });
      if (etat.trace.length > 12) etat.trace.shift();
      dernierPoint = p;
    }
    function onPointerUp() {
      dernierPoint = null;
    }
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- Boucle de jeu ---
    let dernierTemps = performance.now();
    function boucle(tempsMs) {
      const dt = Math.min((tempsMs - dernierTemps) / 1000, 0.05);
      dernierTemps = tempsMs;

      if (!etat.fini) {
        const intervalle = intervalleApparition(etat.nbFruitsApparus) * 1000;
        if (tempsMs - etat.dernierSpawn > intervalle && etat.fruits.length < JEU_1.MAX_FRUITS_ECRAN) {
          fairApparaitreFruit(tempsMs);
        }
      }

      for (const f of etat.fruits) {
        f.vy += GRAVITE * dt;
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.rotation += f.vRotation * dt;
      }
      etat.fruits = etat.fruits.filter((f) => f.y < canvas.height + 100);

      for (const m of etat.morceaux) {
        m.vy += GRAVITE * dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.rotation += m.vRotation * dt;
        m.age += dt;
      }
      etat.morceaux = etat.morceaux.filter((m) => m.age < 1.2);
      etat.eclaboussures.forEach((e) => (e.age += dt));
      etat.eclaboussures = etat.eclaboussures.filter((e) => e.age < 0.4);
      etat.trace.forEach((p) => (p.age += dt));
      etat.trace = etat.trace.filter((p) => p.age < 0.15);

      dessiner(ctx, canvas, etat, imagesRef.current);
      rafRef.current = requestAnimationFrame(boucle);
    }
    rafRef.current = requestAnimationFrame(boucle);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", redimensionner);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const consigne = CONSIGNES[consigneIndex];

  return (
    <div
      className="jeu1"
      ref={conteneurRef}
    >
      <div className="jeu1__hud">
        <div className="jeu1__consigne-principale">
          <p className="jeu1__consigne-texte">
            {NOMS_FRUITS[consigne.fruit].toUpperCase()} — {grammesConsigne} / {consigne.grammes} g
          </p>
          <div className="jeu1__barre" role="progressbar" aria-valuenow={grammesConsigne} aria-valuemax={consigne.grammes}>
            <div
              className="jeu1__barre-remplissage"
              style={{ width: `${Math.min(100, (grammesConsigne / consigne.grammes) * 100)}%` }}
            />
          </div>
        </div>
        <p className="jeu1__total">{total} / {JEU_1.OBJECTIF_TOTAL} g au total</p>
      </div>

      <canvas ref={canvasRef} className="jeu1__canvas" />

      {message && <p className="jeu1__message">« {message} »</p>}

      {peutAbandonner && !termine && (
        <button className="jeu1__abandon" onClick={onAbandon}>
          J'abandonne
        </button>
      )}
    </div>
  );
}

function dessiner(ctx, canvas, etat, images) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Traînée du doigt.
  if (etat.trace.length > 1) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    etat.trace.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();
    ctx.restore();
  }

  const dessinerImage = (img, x, y, rotation, taille) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(img, -taille / 2, -taille / 2, taille, taille);
    ctx.restore();
  };

  for (const f of etat.fruits) {
    dessinerImage(images.entier[f.type], f.x, f.y, f.rotation, f.rayon * 2.3);
  }
  for (const m of etat.morceaux) {
    const alpha = Math.max(0, 1 - m.age / 1.2);
    ctx.globalAlpha = alpha;
    dessinerImage(images.coupe[m.type], m.x, m.y, m.rotation, RAYON_FRUIT * 2.3);
    ctx.globalAlpha = 1;
  }
  for (const e of etat.eclaboussures) {
    const alpha = Math.max(0, 1 - e.age / 0.4);
    ctx.globalAlpha = alpha;
    dessinerImage(images.eclaboussure, e.x, e.y, 0, 60);
    ctx.globalAlpha = 1;
  }
}
