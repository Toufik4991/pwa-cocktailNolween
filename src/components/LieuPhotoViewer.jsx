import { useRef, useState } from "react";
import "./lieu-photo-viewer.css";

const NIVEAUX_LUMINOSITE = [1, 1.35, 1.7];
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

// Plein écran + pincement pour zoomer + luminosité boostée : le code
// caché sur la photo doit rester lisible même en plein soleil (§9.5).
export default function LieuPhotoViewer({ src, alt, onFermer }) {
  const [echelle, setEchelle] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [niveauLumiere, setNiveauLumiere] = useState(0);

  const pointeurs = useRef(new Map());
  const etatGeste = useRef({ distanceDepart: 0, echelleDepart: 1, dernierPoint: null });

  const distanceEntre = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointeurs.current.size === 2) {
      const [a, b] = [...pointeurs.current.values()];
      etatGeste.current.distanceDepart = distanceEntre(a, b);
      etatGeste.current.echelleDepart = echelle;
    } else if (pointeurs.current.size === 1) {
      etatGeste.current.dernierPoint = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerMove = (e) => {
    if (!pointeurs.current.has(e.pointerId)) return;
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointeurs.current.size === 2) {
      const [a, b] = [...pointeurs.current.values()];
      const distance = distanceEntre(a, b);
      const facteur = distance / (etatGeste.current.distanceDepart || distance);
      const nouvelleEchelle = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, etatGeste.current.echelleDepart * facteur));
      setEchelle(nouvelleEchelle);
    } else if (pointeurs.current.size === 1 && echelle > 1) {
      const dernier = etatGeste.current.dernierPoint;
      if (dernier) {
        setPosition((p) => ({ x: p.x + (e.clientX - dernier.x), y: p.y + (e.clientY - dernier.y) }));
      }
      etatGeste.current.dernierPoint = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerUp = (e) => {
    pointeurs.current.delete(e.pointerId);
    if (pointeurs.current.size < 2) etatGeste.current.dernierPoint = null;
    if (pointeurs.current.size === 0 && echelle <= 1.02) {
      setEchelle(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className="lieu-photo-viewer">
      <div
        className="lieu-photo-viewer__zone"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${echelle})`,
            filter: `brightness(${NIVEAUX_LUMINOSITE[niveauLumiere]})`,
          }}
        />
      </div>

      <button className="lieu-photo-viewer__fermer" onClick={onFermer}>
        ✕
      </button>

      <button
        className="lieu-photo-viewer__luminosite"
        onClick={() => setNiveauLumiere((n) => (n + 1) % NIVEAUX_LUMINOSITE.length)}
      >
        ☀️ Luminosité {niveauLumiere === 0 ? "normale" : `+${niveauLumiere}`}
      </button>
    </div>
  );
}
