"use client";

import React, { useEffect, useState } from "react";
import PodcastCard from "@/components/PodcastCard";

interface Korisnik {
  ime: string;
  prezime: string;
}

interface Komentar {
  id: number;
  tekst: string;
  korisnik: {
    ime: string;
    prezime: string;
  };
}

interface Favorit {
  id: number;
  korisnikId: number;
}

interface Podcast {
  id: number;
  naslov: string;
  opis: string;
  coverUrl?: string;
  audioUrl?: string;
  brojPregleda: number;
  kreira: Korisnik;
  komentari: Komentar[];
  favoriti: Favorit[];
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [newPodcast, setNewPodcast] = useState({
    naslov: "",
    opis: "",
    audioUrl: "",
    coverUrl: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetch("/api/podcasts")
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju:", err);
        setLoading(false);
      });
  }, []);

  /// funkcije za kreiranje novog podcasta
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewPodcast((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPodcast = async () => {
    if (!newPodcast.naslov || !newPodcast.opis || !newPodcast.audioUrl) {
      alert("Naslov, opis i audio URL su obavezni.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Morate biti prijavljeni!");
      return;
    }

    try {
      const response = await fetch("/api/podcasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPodcast),
      });

      const data = await response.json();
      if (data.success) {
        alert("Podcast je uspešno dodat!");
        setPodcasts([data.data, ...podcasts]);
        setNewPodcast({ naslov: "", opis: "", audioUrl: "", coverUrl: "" });
      } else {
        alert(data.error || "Greška pri dodavanju podcasta.");
      }
    } catch (error) {
      console.error(error);
      alert("Greška pri dodavanju podcasta.");
    }
  };

  /// fja za brisanje podkesta
  const handleDelete = async (podcastId: number) => {
    if (!confirm("Da li ste sigurni da želite da obrišete ovaj podcast?")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Morate biti prijavljeni!");
      return;
    }

    try {
      const response = await fetch(`/api/podcasts/${podcastId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Podcast je uspešno obrisan!");
        setPodcasts(podcasts.filter((p) => p.id !== podcastId));
      } else {
        alert(data.error || "Greška pri brisanju podcasta");
      }
    } catch (error) {
      console.error("Greška:", error);
      alert("Greška pri brisanju podcasta");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        {/* Naslov stranice */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl md:text-6xl font-heading mb-4">
            Podcastovi 🎙️
          </h1>
          <p className="text-xl font-body max-w-2xl mx-auto">
            Otkrijte naše najnovije epizode i omiljene sadržaje
          </p>
        </div>

        {/* Učitavanje */}
        {loading && (
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="mt-4 text-xl font-body">Učitavanje podcastova...</p>
          </div>
        )}

        {/* Nema podcastova */}
        {!loading && podcasts.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center text-white border border-white/20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-3xl font-heading mb-2">Nema podcastova</h2>
            <p className="font-body text-white/80">
              Trenutno nema dostupnih podcastova. Vratite se uskoro!
            </p>
          </div>
        )}

        {/* Lista podcastova */}
        {!loading && podcasts.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                user={user ? { userId: user.id, uloga: user.uloga } : undefined}
                onDelete={user?.uloga === "ADMIN" ? handleDelete : undefined}
                canPlay={true}
              />
            ))}
          </div>
        )}
        {/* dodavanje podcasta mogu samo korisnik ili admin */}
        {user && (user.uloga === "KORISNIK" || user.uloga === "ADMIN") && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-12 border border-white/20 max-w-xl mx-auto">
            <h3 className="text-2xl font-heading mb-4 text-white">
              Dodaj novi podcast
            </h3>
            <input
              type="text"
              name="naslov"
              placeholder="Naslov"
              value={newPodcast.naslov}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-white/20 text-white"
            />
            <textarea
              name="opis"
              placeholder="Opis"
              value={newPodcast.opis}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-white/20 text-white"
            />
            <input
              type="text"
              name="audioUrl"
              placeholder="Audio URL"
              value={newPodcast.audioUrl}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-white/20 text-white"
            />
            <input
              type="text"
              name="coverUrl"
              placeholder="Cover URL (opciono)"
              value={newPodcast.coverUrl}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 rounded bg-white/20 text-white "
            />
            <button
              onClick={handleAddPodcast}
              className="w-full mt-3 py-4 bg-white/10 text-white font-semibold rounded-lg
             hover:bg-purple-700 transition-colors duration-200"
            >
              Dodaj podcast
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
