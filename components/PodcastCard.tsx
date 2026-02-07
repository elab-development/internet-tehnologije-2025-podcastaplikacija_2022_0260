"use client";

import { useState, useEffect } from "react";

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
  brojPregleda: number;
  kreira: Korisnik;
  komentari: Komentar[];
  favoriti: Favorit[];
}

interface Props {
  podcast: Podcast;
  user?: { userId: number; uloga: string };
  onDelete?: (podcastId: number) => void;
  canPlay?: boolean;
}

const PodcastCard: React.FC<Props> = ({
  podcast,
  user,
  onDelete,
  canPlay = false,
}) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState(podcast.favoriti.length);

  useEffect(() => {
    if (user) {
      const alreadyFavorited = podcast.favoriti.some(
        (f) => f.korisnikId === user.userId,
      );
      setIsFavorited(alreadyFavorited);
    }
  }, [user, podcast.favoriti]);

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Morate biti prijavljeni da biste dodali u favorite!");
      return;
    }

    //provera da ako je gost mora da se registruje
    if (user.uloga === "GOST") {
      alert("Gosti ne mogu dodavati u favorite! Registrujte se kao korisnik.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/podcasts/${podcast.id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Greška pri dodavanju u favorite!");
        return;
      }

      setIsFavorited(data.favorited);
      setFavoriteCount((prev) => (data.favorited ? prev + 1 : prev - 1));

      // ex.printstacktrace
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Greška pri dodavanju u favorite!");
    }
  };

  // ako je korisnik ili admin moze da doda u fav
  const canFavorite =
    user && (user.uloga === "KORISNIK" || user.uloga === "ADMIN");

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
      {podcast.coverUrl && (
        <div className="w-full h-48 overflow-hidden bg-gray-800 relative">
          <img
            src={podcast.coverUrl}
            alt={podcast.naslov}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-body flex items-center gap-1">
            <span>⭐</span>
            <span>{favoriteCount}</span>
          </div>
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

        <div className="flex items-center gap-3 mb-3 text-white/70 text-xs">
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>
              {favoriteCount} {favoriteCount === 1 ? "favorit" : "favorita"}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span>💬</span>
            <span>
              {podcast.komentari.length}{" "}
              {podcast.komentari.length === 1 ? "komentar" : "komentara"}
            </span>
          </span>
        </div>

        {/* play button*/}
        <button
          disabled={!canPlay}
          className="w-full bg-white/20 text-white py-2 rounded-lg font-heading font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Slušaj 🎧
        </button>

        {/* dodaj u favorite dugme */}
        {canFavorite && (
          <button
            onClick={handleToggleFavorite}
            className={`w-full py-2 rounded-lg font-heading font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2 ${
              isFavorited
                ? "bg-yellow-500 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            {isFavorited ? "⭐ Ukloni iz favorita" : "⭐ Dodaj u favorite"}
          </button>
        )}

        {/* brisanje dugme */}
        {onDelete && (
          <button
            onClick={() => onDelete(podcast.id)}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-heading font-semibold text-sm hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Obriši 🗑️
          </button>
        )}

        {/* komentari */}
        {podcast.komentari.length > 0 && (
          <div className="mt-4 border-t border-white/20 pt-3">
            <h4 className="text-white font-heading text-sm mb-2">
              Komentari 💬 ({podcast.komentari.length})
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