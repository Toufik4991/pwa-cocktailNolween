import { Component } from "react";
import "./error-boundary.css";

// Filet de sécurité global : sans lui, la moindre exception non gérée
// pendant un rendu (ex. accès à une clé de config manquante) démonte tout
// l'arbre React et laisse une page blanche, sans aucun moyen de s'en sortir
// (§A1, 06/09/2026 — cause réelle de l'écran blanc en fin de jeu 5, avant
// même le nouveau parcours hub/bouton FIN).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { erreur: null };
  }

  static getDerivedStateFromError(erreur) {
    return { erreur };
  }

  componentDidCatch(erreur, info) {
    console.error("Erreur non gérée :", erreur, info);
  }

  render() {
    if (this.state.erreur) {
      return (
        <div className="error-boundary">
          <p className="error-boundary__titre">Oups, un souci technique.</p>
          <p>Mixapéro a fait tomber un verre. Ta progression est sauvegardée.</p>
          <button onClick={() => window.location.reload()}>Revenir au hub</button>
        </div>
      );
    }
    return this.props.children;
  }
}
