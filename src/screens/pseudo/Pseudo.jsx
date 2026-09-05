import { useState } from "react";
import { useGameDispatch } from "../../store/GameContext.jsx";
import "./pseudo.css";

export default function Pseudo({ onValide }) {
  const [valeur, setValeur] = useState("");
  const dispatch = useGameDispatch();

  const soumettre = (e) => {
    e.preventDefault();
    const propre = valeur.trim();
    if (!propre) return;
    dispatch({ type: "DEFINIR_PSEUDO", pseudo: propre });
    onValide();
  };

  return (
    <form className="pseudo" onSubmit={soumettre}>
      <h1>Ton pseudo… ou ton cocktail préféré ?</h1>
      <input
        type="text"
        value={valeur}
        onChange={(e) => setValeur(e.target.value)}
        maxLength={24}
        autoFocus
        placeholder="Ex : Mojito, Sam, Nolwenn…"
      />
      <button type="submit" disabled={!valeur.trim()}>
        Valider
      </button>
    </form>
  );
}
