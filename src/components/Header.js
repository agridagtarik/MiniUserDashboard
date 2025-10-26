"use client";

import Link from "next/link";
import "../styles/globals.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h2 className="header-title">Mini User Dashboard</h2>

        <Link href="/users/new">
          <button className="header-btn">+ Yeni Kullanıcı</button>
        </Link>
      </div>
    </header>
  );
}
