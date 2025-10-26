"use client";
export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon">⚠️</div>
        <h2 className="modal-title">Kullanıcıyı Sil</h2>
        <p className="modal-text">
          Bu kullanıcıyı silmek istediğinden emin misiniz?
        </p>

        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onClose}>
            Vazgeç
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
}
