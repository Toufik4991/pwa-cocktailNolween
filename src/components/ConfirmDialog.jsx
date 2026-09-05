import "./confirm-dialog.css";

export default function ConfirmDialog({ texte, boutonConfirmer = "Confirmer", boutonAnnuler = "Annuler", onConfirmer, onAnnuler }) {
  return (
    <div className="confirm-dialog__fond" role="dialog" aria-modal="true">
      <div className="confirm-dialog">
        <p>{texte}</p>
        <div className="confirm-dialog__actions">
          <button onClick={onConfirmer}>{boutonConfirmer}</button>
          <button className="confirm-dialog__annuler" onClick={onAnnuler}>
            {boutonAnnuler}
          </button>
        </div>
      </div>
    </div>
  );
}
