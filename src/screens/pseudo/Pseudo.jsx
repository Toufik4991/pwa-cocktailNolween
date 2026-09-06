import { useEffect, useState } from "react";
import { useGameDispatch } from "../../store/GameContext.jsx";
import { styleFondImage } from "../../utils/assetUrl.js";
import { jouerMusique } from "../../audio/audio.js";
import "./pseudo.css";

export default function Pseudo({ onValide }) {
  const [valeur, setValeur] = useState("");
  const dispatch = useGameDispatch();

  useEffect(() => {
    jouerMusique("hub");
  }, []);

  const soumettre = (e) => {
    e.preventDefault();
    const propre = valeur.trim();
    if (!propre) return;
    dispatch({ type: "DEFINIR_PSEUDO", pseudo: propre });
    onValide();
  };

  return (
    <form className="pseudo" onSubmit={soumettre} style={styleFondImage("assets/images/bg-pseudo.webp")}>
      <h1>Ton pseudo… ou ton cocktail préféré ?</h1>
      <input
        type="text"
        value={valeur}
        onChange={(e) => setValeur(e.target.value)}
        maxLength={24}
        autoFocus
        placeholder="Ex : Mojito, Mr Coctail, Nolwenn…"
      />
      <button type="submit" disabled={!valeur.trim()}>
        Valider
      </button>
    </form>
  );
}
