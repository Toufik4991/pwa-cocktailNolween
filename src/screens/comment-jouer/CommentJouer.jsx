import { useEffect, useState } from "react";
import { jouerMusique } from "../../audio/audio.js";
import { asset } from "../../utils/assetUrl.js";
import LieuPhotoViewer from "../../components/LieuPhotoViewer.jsx";
import "./comment-jouer.css";

export default function CommentJouer({ onRetour }) {
  const [photoPleinEcran, setPhotoPleinEcran] = useState(false);

  useEffect(() => {
    jouerMusique("hub");
  }, []);

  return (
    <div className="comment-jouer">
      <header className="comment-jouer__entete">
        <button onClick={onRetour}>← Retour</button>
        <h1>Comment jouer</h1>
      </header>

      <section>
        <h2>Le principe</h2>
        <p>
          Six ingrédients à récupérer. Chacun est gardé par une épreuve, et chaque épreuve mène à
          un lieu réel où se cache le code de la suivante.
        </p>
      </section>

      <section>
        <h2>Le déroulé</h2>
        <ol className="comment-jouer__etapes">
          <li>Tu choisis l'étape qui brille sur l'écran d'accueil</li>
          <li>Tu entres le code que tu as trouvé sur place</li>
          <li>Tu gagnes le mini-jeu</li>
          <li>Une photo t'indique le lieu suivant</li>
          <li>Tu t'y rends, tu cherches l'étiquette, tu relèves le code</li>
          <li>Et tu recommences, jusqu'au dernier ingrédient</li>
        </ol>
      </section>

      <section>
        <h2>À quoi ressemble une étiquette</h2>
        <button
          className="comment-jouer__etiquette"
          onClick={() => setPhotoPleinEcran(true)}
          aria-label="Voir la photo d'exemple d'étiquette en plein écran"
        >
          <img src={asset("assets/images/img-aide-etiquette.webp")} alt="Exemple d'étiquette numérotée portant un code" />
        </button>
        <p>
          Voilà à quoi ressemble une étiquette. Elle est numérotée, et le code est écrit dessus.
          Cherche-la bien, elle ne fait pas la taille d'une affiche.
        </p>
        <p className="comment-jouer__accent">
          Regarde bien le numéro : c'est lui qui te dit à quelle étape correspond l'étiquette, pour
          ne pas te tromper de code.
        </p>
      </section>

      <section>
        <h2>Si tu bloques</h2>
        <ul>
          <li>Le bouton « Réponses » rappelle les lieux déjà trouvés</li>
          <li>Certains jeux proposent un indice</li>
          <li>Après plusieurs échecs, il est possible de passer une épreuve</li>
          <li>Un jeu perdu se rejoue autant de fois que nécessaire, le code n'est jamais redemandé</li>
        </ul>
      </section>

      <section>
        <h2>Bon à savoir</h2>
        <ul>
          <li>L'application fonctionne sans réseau une fois ouverte la première fois</li>
          <li>Le son peut être coupé dans le menu, sauf pour une épreuve qui en a besoin</li>
          <li>La progression est enregistrée, l'application peut être fermée à tout moment</li>
        </ul>
      </section>

      {photoPleinEcran && (
        <LieuPhotoViewer
          src={asset("assets/images/img-aide-etiquette.webp")}
          alt="Exemple d'étiquette numérotée portant un code"
          onFermer={() => setPhotoPleinEcran(false)}
        />
      )}
    </div>
  );
}
