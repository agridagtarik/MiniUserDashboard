"use client";

export default function Loader({ message = "Yükleniyor..." }) {
  return (
    <div className="loader-fullscreen">
      <div className="loader-orb"></div>
      <div className="loader-ring"></div>
      <p className="loader-label">{message}</p>
    </div>
  );
}
