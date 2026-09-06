import { useEffect } from "react";
import { jouerMusique } from "../../audio/audio.js";
import "./aide.css";

export default function Aide({ onRetour }) {
  useEffect(() => {
    jouerMusique("hub");
  }, []);

  return (
    <div className="aide">
      <header className="aide__entete">
        <button onClick={onRetour}>← Retour</button>
        <h1>Aide</h1>
      </header>

      <section>
        <h2>Le principe</h2>
        <p>
          Chaque étape gagnée révèle la photo d'un lieu réel. Rends-toi sur place : un code à 4
          caractères y est caché. Reviens dans l'app et saisis-le pour débloquer l'étape suivante.
        </p>
      </section>

      <section>
        <h2>Je suis bloqué·e</h2>
        <p>
          Un mini-jeu se rejoue autant de fois que tu veux, sans jamais te redemander un code. Au
          bout de 5 échecs, une option pour passer à la suite apparaît.
        </p>
      </section>

      <section>
        <h2>Couper le son</h2>
        <p>Menu (☰) en haut du hub → "Son : activé/coupé".</p>
      </section>

      <section>
        <h2>Hors ligne</h2>
        <p>L'app fonctionne entièrement sans réseau une fois installée. Pas besoin de réseau sur le terrain.</p>
      </section>
    </div>
  );
}
