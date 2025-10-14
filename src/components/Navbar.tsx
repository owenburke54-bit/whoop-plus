"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={
        "rounded-md px-3 py-2 text-sm font-medium transition-colors " +
        (isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white")
      }
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold text-white">WHOOP+</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/fitness/overview" label="General Fitness" />
          <NavLink href="/athlete/dashboard" label="Elite Athlete" />
          <NavLink href="/community" label="Community" />
          <NavLink href="/journal" label="Journal" />
        </nav>
      </div>
    </header>
  );
}


