import Link from "next/link";

//tailwind css

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600">
      <div className="container mx-auto px-4 py-20">
        {/* hero sekcija */}
        <div className="text-center text-white">
          <p className="text-6xl font-bold mb-4">Tune In 🎧</p>
          <p className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Dobrodošli na vašu omiljenu platformu za slušanje podcastova!
            Otkrijte hiljade priča, naučite nešto novo i budite inspirisani
            sadržajem koji vas interesuje. Od komedije do obrazovanja, od vesti
            do tehnologije - sve na jednom mestu.
          </p>

          {/* Call to action dugmad */}
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition">
              <Link href="/podcasts">Istraži podcastove</Link>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition">
              <Link href="/login">Prijavite se</Link>
            </button>
          </div>
        </div>

        {/* Features sekcija */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-2xl font-bold mb-3">Hiljade podcastova</h3>
            <p className="text-white/80">
              Pristupite bogatoj biblioteci podcastova iz svih kategorija
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-2xl font-bold mb-3">Slušajte bilo gde</h3>
            <p className="text-white/80">
              Uživajte u svojim omiljenim podcastovima na bilo kom uređaju
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-3">Personalizovano</h3>
            <p className="text-white/80">
              Dobijte preporuke prilagođene vašim interesovanjima
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
