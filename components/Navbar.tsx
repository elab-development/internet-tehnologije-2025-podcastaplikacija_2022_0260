"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // da li je korisnik prijavljen
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // osluskivanje promena/ neko se loginuje/ logoutuje
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("userLoggedIn", handleStorageChange);
    window.addEventListener("userLoggedOut", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", handleStorageChange);
      window.removeEventListener("userLoggedOut", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userLoggedOut"));
    router.push("/");
    alert("Uspešno ste se odjavili!");
  };

  return (
    <nav className="navbar-gradient text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-2xl font-heading font-black hover:scale-110 transition-transform duration-300 flex items-center gap-2"
          >
            <span className="backdrop-blur-lg text-white px-4 py-2 rounded-xl shadow-lg">
              Tune In
            </span>
            <span className="text-3xl animate-bounce">🎧</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body  hover:border-white/30"
            >
              Početna
            </Link>
            <Link
              href="/podcasts"
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body  hover:border-white/30"
            >
              Podcastovi
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body hover:border-white/30"
            >
              O nama
            </Link>
            {user && user.uloga === "ADMIN" && (
              <Link
                href="/korisnici"
                className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body border border-transparent hover:border-white/30"
              >
                Korisnici
              </Link>
            )}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body  hover:border-white/30"
            >
              Kontakt
            </Link>

            {/* Ako je prijavljen */}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="ml-2 bg-white/20 text-white px-4 py-2 rounded-full font-heading font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30"
                >
                  Moj profil: {user.ime}
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-white/20 text-white px-4 py-2 rounded-full font-heading font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30"
                >
                  Odjavi se
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-4 py-2 rounded-lg font-heading font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/30"
              >
                Prijava
              </Link>
            )}
          </div>

          {/* izgled burger menija*/}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none hover:bg-white/20 p-2 rounded-lg transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/*burger meni */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <Link
              href="/"
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body"
              onClick={() => setIsOpen(false)}
            >
              🏠 Početna
            </Link>
            <Link
              href="/podcasts"
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body"
              onClick={() => setIsOpen(false)}
            >
              🎙️ Podcastovi
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body"
              onClick={() => setIsOpen(false)}
            >
              ℹ️ O nama
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body"
              onClick={() => setIsOpen(false)}
            >
              📧 Kontakt
            </Link>

            {user ? (
              <>
                <Link
                  href="/profil"
                  className="block py-3 px-4 bg-white/20 rounded-lg text-center font-heading font-semibold transition"
                  onClick={() => setIsOpen(false)}
                >
                  👤 Profil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-red-500 text-white rounded-lg text-center font-heading font-semibold hover:bg-red-600 transition"
                >
                  🔓 Odjavi se
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-3 bg-white text-primary-600 rounded-lg text-center font-heading font-semibold hover:shadow-xl transition"
                onClick={() => setIsOpen(false)}
              >
                🔐 Prijava
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
