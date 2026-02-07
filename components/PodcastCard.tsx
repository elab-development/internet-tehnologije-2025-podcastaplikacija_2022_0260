"use client";

import React from "react";

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
  onDelete?: (podcastId: number) => void;
  canPlay?: boolean;
}

const PodcastCard: React.FC<Props> = ({
  podcast,
  onDelete,
  canPlay = false,
}) => {
  // console.log("onDelete:", onDelete); TESTIRALA SAM ZASTO NE RADI DELETE, moralo je da se napise await
  // console.log("USER:");

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl hover:bg-white/20  transition-all duration-300">
      {podcast.coverUrl && (
        <div className="w-full h-48 overflow-hidden bg-gray-800">
          <img
            src={podcast.coverUrl}
            alt={podcast.naslov}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-heading text-white mb-2 line-clamp-2 min-h-[3rem]">
          {podcast.naslov}
        </h3>
        <p className="text-white/80 font-body text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {podcast.opis}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-sm flex-shrink-0">
            👤
          </div>
          <p className="text-white/90 font-body text-xs truncate">
            {podcast.kreira.ime} {podcast.kreira.prezime}
          </p>
        </div>
        <button
          disabled={!canPlay}
          className="w-full bg-white/20 text-primary-600 py-2 rounded-lg font-heading font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2"
        >
          Slušaj 🎧
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(podcast.id)}
            className="w-full bg-white/20 text-red py-2 rounded-lg font-heading font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2" //HOCU DA MI BUDE CRVENO DUGME! to moram da sredim
          >
            Obriši 🗑️
          </button>
        )}
        {/* KOMENTARI */}
        {podcast.komentari.length > 0 && (
          <div className="mt-4 border-t border-white/20 pt-3">
            <h4 className="text-white font-heading text-sm mb-2">
              Komentari 💬
            </h4>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {podcast.komentari.map((komentar) => (
                <div key={komentar.id} className="bg-white/10 rounded-lg p-2">
                  <p className="text-white/90 text-sm">{komentar.tekst}</p>
                  <p className="text-white/60 text-xs mt-1">
                    — {komentar.korisnik.ime} {komentar.korisnik.prezime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
