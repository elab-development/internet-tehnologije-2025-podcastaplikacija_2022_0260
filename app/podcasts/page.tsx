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
}

interface Favorit {
  id: number;
}

interface Podcast {
  id: number;
  naslov: string;
  opis: string;
  coverUrl?: string;
  brojPregleda: number;
  kreira: Korisnik;
  komentari: Komentar[];
  favoriti: Favorit[];
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl md:text-6xl font-heading mb-4">
            Podcastovi 🎙️
          </h1>
          <p className="text-xl font-body max-w-2xl mx-auto">
            Otkrijte naše najnovije epizode i omiljene sadržaje
          </p>
        </div>

        {loading && (
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="mt-4 text-xl font-body">Učitavanje podcastova...</p>
          </div>
        )}

        {!loading && podcasts.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center text-white border border-white/20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-3xl font-heading mb-2">Nema podcastova</h2>
            <p className="font-body text-white/80">
              Trenutno nema dostupnih podcastova. Vratite se uskoro!
            </p>
          </div>
        )}

        {!loading && podcasts.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
