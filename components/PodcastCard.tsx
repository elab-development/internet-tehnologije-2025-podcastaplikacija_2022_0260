"use client";

import Button from "./Button";
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

  // brisanje komentara
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

        {/* Dugme za play/pause */}
        <Button
          onClick={handlePlayPause}
          variant="secondary"
          fullWidth
          disabled={!podcast.audioUrl}
          className="mb-2"
        >
          {isPlaying ? "⏸️ Pauza" : "▶️ Pusti"}
        </Button>

        {/* Dugme za favorite */}
        {canFavorite && (
          <Button
            onClick={handleToggleFavorite}
            variant={isFavorited ? "success" : "secondary"}
            fullWidth
            className="mb-2"
          >
            {isFavorited ? "⭐ Ukloni iz favorita" : "⭐ Dodaj u favorite"}
          </Button>
        )}

        {/* Dugme za brisanje podcasta */}
        {onDelete && (
          <Button
            onClick={() => onDelete(podcast.id)}
            variant="danger"
            fullWidth
            className="mb-2"
          >
            Obriši 🗑️
          </Button>
        )}

        {/* Forma za komentare */}
        {canComment && (
          <form onSubmit={handleAddComment} className="mt-3">
            <textarea
              value={noviKomentar}
              onChange={(e) => setNoviKomentar(e.target.value)}
              rows={3}
              className="w-full p-2 rounded bg-white/20 text-white placeholder-white/60 mb-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Dodaj komentar..."
            />
            <Button
              type="submit"
              variant="secondary"
              fullWidth
              disabled={submitting}
            >
              {submitting ? "Dodavanje..." : "Dodaj komentar"}
            </Button>
          </form>
        )}

        {/* Lista komentara */}
        {komentari.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-semibold mb-2">Komentari 💬</h4>
            {komentari.map((k) => (
              <div
                key={k.id}
                className="bg-white/10 p-3 rounded flex justify-between items-start gap-2"
              >
                <div className="flex-1">
                  <p className="text-sm mb-1">{k.tekst}</p>
                  <p className="text-xs text-white/60">
                    - {k.korisnik.ime} {k.korisnik.prezime}
                  </p>
                </div>

                {/* Dugme za brisanje komentara - samo admin - pored komentara */}
                {isAdmin && (
                  <Button
                    onClick={() => handleDeleteComment(k.id)}
                    variant="danger"
                    className="!py-1 !px-2 text-xs shrink-0"
                  >
                    🗑️
                  </Button>
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
