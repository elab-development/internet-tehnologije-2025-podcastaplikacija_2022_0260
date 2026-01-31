"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState(""); //prva vrednost je trenutna vrednost, druga je funkcija kojom menjam email, a u zagradi je sa cim menjam
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); //ova linija cuva poruku greske ako prijava ne uspe
  const [loading, setLoading] = useState(false);
  const router = useRouter(); //ovo je hook, koristi se za komunikaciju izmedju razlicith stranica na nasem sajtu

  const handleSubmit = async (e: React.FormEvent) => {
    //funkcija se poziva kad se submituje forma
    e.preventDefault(); //sa vezbi fora, sprecava default ponasanje forme, bez ovoga bi react state bio resetovan
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST", //saljem post http zahtev na auth/login rutu
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }); //stringify metoda pretara js objekat u json string!! takvi podaci mogu da se salju!!

      const data = await response.json();

      if (data.success) {
        // Sačuvaj token
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.korisnik));

        alert(`Dobrodošli, ${data.data.korisnik.ime}!`);
        router.push("/podcasts"); //pri logovanju prebacuje korisnika na ovu strnaicu automatski
      } else {
        setError(data.error || "Greška pri prijavljivanju");
      }
    } catch (err) {
      setError("Greška pri povezivanju sa serverom");
    } finally {
      setLoading(false); //gasi loading stanje!!!
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading text-white mb-2">
              Dobrodošli nazad!
            </h1>
            <p className="text-white/80 font-body">
              Prijavite se na vaš Tune In nalog
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white font-body mb-2"
              >
                Email adresa
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="vas.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white font-body mb-2"
              >
                Lozinka
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-primary-600 py-3 rounded-lg font-heading font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Prijavljivanje..." : "Prijavi se"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/70 font-body text-sm">ili</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          <p className="text-center text-white/80 font-body mt-6">
            Nemate nalog?{" "}
            <Link
              href="/register"
              className="text-white font-semibold hover:underline"
            >
              Registrujte se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
