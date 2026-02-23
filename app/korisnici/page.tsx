"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Korisnik {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  uloga: string;
  datumKreiranja: string;
}

export default function KorisniciPage() {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // samo admin može videti ovu stranicu
    if (parsedUser.uloga !== "ADMIN") {
      //alert("Nemate dozvolu za pristup ovoj stranici!");
      router.push("/");
      return;
    }

    // ucitaj korisnike
    fetchKorisnici();
  }, [router]);

  const fetchKorisnici = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/korisnici", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setKorisnici(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (korisnikId: number, korisnikIme: string) => {
    if (
      !confirm(
        `Da li ste sigurni da želite da obrišete korisnika ${korisnikIme}?`,
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/korisnici/${korisnikId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Greška pri brisanju korisnika");
        return;
      }

      alert(data.message);
      // osveži listu
      setKorisnici(korisnici.filter((k) => k.id !== korisnikId));
    } catch (err) {
      console.error(err);
      alert("Greška pri brisanju korisnika");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center text-white">
        Učitavanje...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-heading mb-4">
              Upravljanje korisnicima 👥
            </h1>
            <p className="text-xl font-body">Lista svih korisnika platforme</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="space-y-4">
              {korisnici.map((korisnik) => (
                <div
                  key={korisnik.id}
                  className="bg-white/10 rounded-xl mb-4 p-4 flex items-center justify-between"
                >
                  <div className="text-white">
                    <h3 className="text-lg font-heading">
                      {korisnik.ime} {korisnik.prezime}
                    </h3>
                    <p className="text-sm text-white/70">{korisnik.email}</p>
                    <p className="text-xs text-white/60 mt-1">
                      {korisnik.uloga} • Član od{" "}
                      {new Date(korisnik.datumKreiranja).toLocaleDateString(
                        "sr-RS",
                      )}
                    </p>
                  </div>

                  {user?.id !== korisnik.id && (
                    <button
                      onClick={() =>
                        handleDeleteUser(
                          korisnik.id,
                          `${korisnik.ime} ${korisnik.prezime}`,
                        )
                      }
                      style={{
                        backgroundColor: "#DC2626",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                      className="hover:bg-red-700 transition"
                    >
                      🗑️ Obriši
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
