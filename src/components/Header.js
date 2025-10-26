"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={75}
            height={75}
            className="header-logo"
          />
          <h2 className="header-title">Mini User Dashboard</h2>
        </div>

        <Link href="/users/new">
          <button className="header-btn">+ Yeni Kullanıcı</button>
        </Link>
      </div>
    </header>
  );
}
