'use client'

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-90020 to-purple-600 flex items-center justify-center px-4 py-16">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Kontaktirajte nas
          </h1>
          <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto leading-relaxed">
            Imate pitanja? Tu smo da vam pomognemo!
          </p>
        </div>

        {/* Info kartice */}
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Adresa */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 shadow-2xl hover:bg-white/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-5xl">📍</div>
              <div>
                <h3 className="text-2xl font-heading mb-2">Adresa</h3>
                <p className="text-white/90 text-lg">
                  Jove Ilića 154<br />
                  11000 Beograd, Srbija
                </p>
              </div>
            </div>
          </div>

          {/* Telefon */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 shadow-2xl hover:bg-white/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-5xl">📞</div>
              <div>
                <h3 className="text-2xl font-heading mb-2">Telefon</h3>
                <p className="text-white/90 text-lg">
                  +381 11 234 5678<br />
                  +381 64 123 4567
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 shadow-2xl hover:bg-white/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="text-5xl">✉️</div>
              <div>
                <h3 className="text-2xl font-heading mb-2">Email</h3>
                <p className="text-white/90 text-lg">
                  info@tunein.rs<br />
                  podrska@tunein.rs
                </p>
              </div>
            </div>
          </div>

          {/* Društvene mreže */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 text-center shadow-2xl">
            <h3 className="text-2xl font-heading mb-4">Pratite nas</h3>
            <div className="flex justify-center gap-4">
              <a href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-lg text-3xl transition">
                IG
                {/* ovde ubaciti link ka igu fona */}
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 p-4 rounded-lg text-3xl transition">
                Sajt
                {/* ovde ubaciti link ka sajtu fona npr */}
              </a>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.3934416017614!2d20.470177591555196!3d44.772783696480005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a705762332ab5%3A0x422a527f1ff25cac!2z0IjQvtCy0LUg0JjQu9C40ZvQsCAxNTQsINCR0LXQvtCz0YDQsNC0IDExMDAw!5e0!3m2!1ssr!2srs!4v1769796851834!5m2!1ssr!2srs"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>

      </div>
    </main>
  )
}
