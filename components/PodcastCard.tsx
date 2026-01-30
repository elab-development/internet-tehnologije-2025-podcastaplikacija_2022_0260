"use client";

import React from "react";

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

interface Props {
  podcast: Podcast;
}

const PodcastCard: React.FC<Props> = ({ podcast }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      {podcast.coverUrl && (
        <div className="w-full h-48 overflow-hidden bg-gray-800">
          <img
            src={podcast.coverUrl}
            alt={podcast.naslov}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5 text-white">
        <h2 className="text-xl font-heading font-bold mb-2 line-clamp-2">
          {podcast.naslov}
        </h2>
        <p className="text-white/80 font-body text-sm mb-3 line-clamp-2">
          {podcast.opis}
        </p>
        <p className="text-sm text-white/70 font-body mb-3">
          👤 {podcast.kreira.ime} {podcast.kreira.prezime}
        </p>
        <div className="flex gap-4 text-xs text-white/60 font-body mb-4">
          <span>👁️ {podcast.brojPregleda}</span>
          <span>💬 {podcast.komentari.length}</span>
          <span>⭐ {podcast.favoriti.length}</span>
        </div>
        <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-heading font-semibold hover:shadow-xl transition-all duration-300">
          Slušaj 🎧
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;
