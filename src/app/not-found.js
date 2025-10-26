"use client";
import { useRouter } from "next/navigation";
export default function NotFound({ message = "Bir hata oluştu!" }) {
  const router = useRouter();

  return (
    <div className="full-error-container">
      <div className="full-error-content">
        <div className="full-error-icon">⚠️</div>
        <h2 className="full-error-title">404 | SAYFA BULUNAMADI !</h2>
        <p className="full-error-message">{message}</p>
        <button className="btn delete" onClick={() => router.push("/")}>
          Anasayfa Dön
        </button>
      </div>
    </div>
  );
}
