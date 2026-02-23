"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Lozinke se ne poklapaju!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Lozinka mora imati najmanje 6 karaktera!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ime: formData.ime,
          prezime: formData.prezime,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Sačuvaj token i korisnika
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.korisnik));

        // Emituj event
        window.dispatchEvent(new Event("userLoggedIn"));

        alert(`Uspešna registracija! Dobrodošli, ${data.data.korisnik.ime}!`);
        router.push("/podcasts");
      } else {
        setError(data.error || "Greška pri registraciji");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Greška pri povezivanju sa serverom");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading text-white mb-2">
              Kreiraj nalog 🎧
            </h1>
            <p className="text-white/80 font-body">
              Pridruži se Tune In zajednici
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Ime */}
            <div>
              <label htmlFor="ime" className="block text-white font-body mb-2">
                Ime
              </label>
              <input
                type="text"
                id="ime"
                name="ime"
                value={formData.ime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="Unesite vaše ime"
              />
            </div>

            {/* Prezime */}
            <div>
              <label
                htmlFor="prezime"
                className="block text-white font-body mb-2"
              >
                Prezime
              </label>
              <input
                type="text"
                id="prezime"
                name="prezime"
                value={formData.prezime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="Unesite vaše prezime"
              />
            </div>

            {/* Email */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="vas.email@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-white font-body mb-2"
              >
                Lozinka
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white font-body mb-2"
              >
                Potvrdi lozinku
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-primary-600 py-3 rounded-lg font-heading font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registracija..." : "Registruj se"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/70 font-body text-sm">ili</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          {/* Login link */}
          <p className="text-center text-white/80 font-body mt-6">
            Već imate nalog?{" "}
            <Link
              href="/login"
              className="text-white font-semibold hover:underline"
            >
              Prijavite se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
