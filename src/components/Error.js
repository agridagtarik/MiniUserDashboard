export default function Error({ message = "Bir hata oluştu!" }) {
  return (
    <div className="full-error-container">
      <div className="full-error-content">
        <div className="full-error-icon">⚠️</div>
        <h2 className="full-error-title">Oops! Bir şeyler ters gitti.</h2>
        <p className="full-error-message">{message}</p>
      </div>
    </div>
  );
}
