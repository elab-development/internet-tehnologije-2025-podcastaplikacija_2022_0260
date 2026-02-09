"use client";

import { useState, useEffect, useRef } from "react";

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

interface Props {
  podcast: Podcast;
  user?: { userId: number; uloga: string };
  onDelete?: (podcastId: number) => void;
  onCommentAdded?: () => void;
  canPlay?: boolean;
}

const PodcastCard: React.FC<Props> = ({
  podcast,
  user,
  onDelete,
  canPlay = false,
  onCommentAdded,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(
    podcast.favoriti?.length ?? 0,
  );

  const [komentari, setKomentari] = useState(podcast.komentari ?? []);
  const [noviKomentar, setNoviKomentar] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      const fav = podcast.favoriti?.some((f) => f.korisnikId === user.userId);
      setIsFavorited(!!fav);
    }
  }, [user, podcast.favoriti]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!podcast.audioUrl) return;

    if (!user) {
      alert("Morate biti prijavljeni!");
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(podcast.audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Morate biti prijavljeni!");
      return;
    }

    if (user.uloga === "GOST") {
      alert("Gosti ne mogu dodavati u favorite.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/podcasts/${podcast.id}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Greška");
        return;
      }

      setIsFavorited(data.favorited);
      setFavoriteCount((prev) => (data.favorited ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
      alert("Greška pri dodavanju u favorite");
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noviKomentar.trim()) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/podcasts/${podcast.id}/komentari`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tekst: noviKomentar }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setKomentari([data.data, ...komentari]);
      setNoviKomentar("");

      onCommentAdded?.();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // 🗑️ NOVA FUNKCIJA - Brisanje komentara (samo ADMIN)
  const handleDeleteComment = async (komentarId: number) => {
    if (!confirm("Da li ste sigurni da želite da obrišete ovaj komentar?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/komentari/${komentarId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Greška pri brisanju komentara");
        return;
      }

      // Ukloni komentar iz liste
      setKomentari(komentari.filter((k) => k.id !== komentarId));
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Greška pri brisanju komentara");
    }
  };

  const canFavorite =
    user && (user.uloga === "KORISNIK" || user.uloga === "ADMIN");

  const canComment = canFavorite;

  const isAdmin = user?.uloga === "ADMIN";

  return (
    <div className="bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl">
      {podcast.coverUrl && (
        <img
          src={podcast.coverUrl}
          alt={podcast.naslov}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 text-white">
        <h3 className="text-lg font-bold mb-1">{podcast.naslov}</h3>
        <p className="text-sm text-white/80 mb-2">{podcast.opis}</p>

        <p className="text-xs mb-3">
          👤 {podcast.kreira.ime} {podcast.kreira.prezime}
        </p>

        <div className="flex gap-4 text-xs mb-3">
          <span>⭐ {favoriteCount}</span>
          <span>💬 {komentari.length}</span>
        </div>

        <button
          onClick={handlePlayPause}
          disabled={!podcast.audioUrl}
          className="w-full mb-2 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? "⏸️ Pauza" : "▶️ Pusti"}
        </button>

        {canFavorite && (
          <button
            onClick={handleToggleFavorite}
            style={{
              backgroundColor: isFavorited
                ? "#EAB308"
                : "rgba(255, 255, 255, 0.2)",
              color: "white",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.3s",
              marginBottom: "0.5rem",
            }}
            className="font-heading hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {isFavorited ? "⭐ Ukloni iz favorita" : "⭐ Dodaj u favorite"}
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(podcast.id)}
            style={{
              backgroundColor: "#DC2626",
              color: "white",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.3s",
            }}
            className="font-heading hover:shadow-xl hover:scale-105 transition-all duration-300 mb-2"
          >
            Obriši 🗑️
          </button>
        )}

        {canComment && (
          <form onSubmit={handleAddComment} className="mt-3">
            <textarea
              value={noviKomentar}
              onChange={(e) => setNoviKomentar(e.target.value)}
              rows={3}
              className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60 mb-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Dodaj komentar..."
            />
            <button
              disabled={submitting}
              className="w-full py-2 rounded bg-white/20 hover:bg-white/30 transition disabled:opacity-50"
            >
              {submitting ? "Dodavanje..." : "Dodaj komentar"}
            </button>
          </form>
        )}

        {komentari.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-semibold mb-2">Komentari 💬</h4>
            {komentari.map((k) => (
              <div key={k.id} className="bg-white/10 p-3 rounded relative">
                <p className="text-sm mb-1 pr-16">{k.tekst}</p>
                <p className="text-xs text-white/60">
                  — {k.korisnik.ime} {k.korisnik.prezime}
                </p>

                {/* dugme za brisanje samo admin */}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(k.id)}
                    style={{
                      backgroundColor: "#DC2626",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                    }}
                    className="hover:bg-red-700 transition"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
