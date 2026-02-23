import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">O nama 🎧</h1>
          <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto leading-relaxed">
            Mi smo platforma koja spaja ljubitelje podcastova sa najboljim
            sadržajima iz celog sveta.
          </p>
        </div>

        {/* Priča sekcija */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-12 text-white border border-white/20 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">Naša priča</h2>
          <p className="text-lg md:text-xl font-body leading-relaxed mb-6">
            Tune In je nastao kao porodični posao iz ljubavi prema pričama i
            znanju koje podcastovi pružaju. Verujemo da svako zaslužuje pristup
            kvalitetnom audio sadržaju koji ih inspirišе, educira i zabavlja.
          </p>
          <p className="text-lg md:text-xl font-body leading-relaxed">
            Naša misija je da učinimo slušanje podcastova što pristupačnijim i
            ugodnijim, kroz intuitivnu platformu koja povezuje kreatore sa
            njihovom publikom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-heading mb-3">Kvalitet</h3>
            <p className="font-body text-white/90">
              Biramo samo najbolje podcastove koji donose vrednost našim
              korisnicima.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-heading mb-3">Zajednica</h3>
            <p className="font-body text-white/90">
              Gradimo zajednicu slušalaca i kreatora koji dele istu strast.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-heading mb-3">Inovacija</h3>
            <p className="font-body text-white/90">
              Konstantno unapređujemo platformu kako bismo pružili najbolje
              iskustvo.
            </p>
          </div>
        </div>

        {/* Tim sekcija */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-white border border-white/20 shadow-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-center">
            Naš tim
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-6xl border-4 border-white/30 hover:scale-110 transition-transform duration-300">
                👨‍💼
              </div>
              <h3 className="text-xl font-heading mb-2">Nikola Manjenčić</h3>
              <p className="font-body text-white/80">CFO & Suosnivač</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-6xl border-4 border-white/30 hover:scale-110 transition-transform duration-300">
                👩‍🎤
              </div>
              <h3 className="text-xl font-heading mb-2">Teodora Manjenčić</h3>
              <p className="font-body text-white/80">CEO & Suosnivač</p>
            </div>
          </div>
        </div>

        {/* Statistika */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-heading mb-2">10k+</div>
            <p className="font-body text-white/80">Podcastova</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-heading mb-2">50k+</div>
            <p className="font-body text-white/80">Korisnika</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-heading mb-2">100+</div>
            <p className="font-body text-white/80">Autora</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-heading mb-2">4.9⭐</div>
            <p className="font-body text-white/80">Prosečna ocena</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-center text-white border border-white/20 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            Pridruži nam se!
          </h2>
          <p className="text-lg md:text-xl font-body mb-8 max-w-2xl mx-auto">
            Bilo da si autor ili slušalac, Tune In je mesto za tebe.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-heading font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <Link href="/login">Započni danas</Link>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-heading font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              <Link href="/contact">Kontaktiraj nas</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
