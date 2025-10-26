"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left" onClick={() => router.push("/")}>
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
