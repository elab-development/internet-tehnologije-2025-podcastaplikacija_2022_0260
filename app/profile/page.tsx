"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profil() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Da li ste SIGURNI da želite da obrišete svoj nalog? Ova akcija je NEPOVRATNA!",
      )
    ) {
      return;
    }

    if (
      !confirm(
        "Poslednje upozorenje! Svi vaši podaci, podcastovi, komentari i favoriti će biti obrisani. Da li želite da nastavite?",
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/korisnici/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Greška pri brisanju naloga");
        return;
      }

      // Odjavi se i preusmeri na početnu
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userLoggedOut"));
      alert("Vaš nalog je uspešno obrisan.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Greška pri brisanju naloga");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center">
        <div className="text-white text-xl">Učitavanje...</div>
      </div>
    );
  }

  const getRoleBadge = (uloga: string) => {
    const badges = {
      ADMIN: { text: "Administrator", color: "bg-red-500", icon: "👑" },
      KORISNIK: { text: "Korisnik", color: "bg-blue-500", icon: "👤" },
      GOST: { text: "Gost", color: "bg-gray-500", icon: "👁️" },
    };
    return badges[uloga as keyof typeof badges] || badges.GOST;
  };

  const badge = getRoleBadge(user.uloga);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl text-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-heading mb-2">
                Moj Profil
              </h1>
              <p className="text-white/80 font-body">
                Dobrodošli na vaš profil
              </p>
            </div>

            {/* Profilna slika */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-6xl border-4 border-white/30 shadow-xl">
                {user.profilnaSlika ? (
                  <img
                    src={user.profilnaSlika}
                    alt={user.ime}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "👤"
                )}
              </div>
            </div>

            {/* Informacije */}
            <div className="space-y-6">
              {/* Ime i prezime */}
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm font-body mb-2">
                  Ime i prezime
                </p>
                <p className="text-2xl font-heading">
                  {user.ime} {user.prezime}
                </p>
              </div>

              {/* Email */}
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm font-body mb-2">
                  Email adresa
                </p>
                <p className="text-xl font-body">{user.email}</p>
              </div>

              {/* Uloga */}
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-white/70 text-sm font-body mb-3">
                  Uloga na platformi
                </p>
                <div
                  className={`${badge.color} inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-heading font-semibold shadow-lg`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-lg">{badge.text}</span>
                </div>
              </div>

              {/* Datum kreiranja */}
              {user.datumKreiranja && (
                <div className="bg-white/10 rounded-xl p-6">
                  <p className="text-white/70 text-sm font-body mb-2">
                    Član od
                  </p>
                  <p className="text-xl font-body">
                    {new Date(user.datumKreiranja).toLocaleDateString("sr-RS", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {/* Dugme za brisanje naloga */}
              <div className="bg-red-500/20 p-6 mt-8">
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    backgroundColor: "#DC2626",
                    color: "white",
                    width: "100%",
                    padding: "0.75rem",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                  className="hover:bg-red-700 transition font-heading"
                >
                  🗑️ Obriši moj nalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
