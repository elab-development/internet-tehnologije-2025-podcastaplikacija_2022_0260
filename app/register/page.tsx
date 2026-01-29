'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Lozinke se ne poklapaju!')
      return
    }
    
    console.log('Registracija', formData)
    alert(`Uspešna registracija! Dobrodošli, ${formData.name}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-90020 to-purple-600 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        
        <div className="bg-white10 backdrop-blur-xl rounded-2xl p-8 mdp-10 border border-white20 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading text-white mb-2">
              Kreiraj nalog
            </h1>
            <p className="text-white40 font-body">
              Pridruži se Tune In zajednici.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Ime */}
            <div>
              <label htmlFor="name" className="block text-white font-body mb-2">
                Ime i prezime
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white20 border border-white30 text-white placeholder-white60 focusoutline-none focusring-2 focusring-white50 transition backdrop-blur-sm"
                placeholder="Unesite vaše ime i prezime"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white font-body mb-2">
                Email adresa
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white20 border border-white30 text-white placeholder-white60 focusoutline-none focusring-2 focusring-white50 transition backdrop-blur-sm"
                placeholder="vas.email@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white font-body mb-2">
                Lozinka
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-white20 border border-white30 text-white placeholder-white60 focusoutline-none focusring-2 focusring-white50 transition backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 -translate-y-12 text-white70 hovertext-white transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white font-body mb-2">
                Potvrdi lozinku
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-heading font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-6"
            >
              Registruj se
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/30"></div>
            <span className="px-4 text-white/70 font-body text-sm">ili</span>
            <div className="flex-1 border-t border-white/30"></div>
          </div>

          {/* Login link */}
          <p className="text-center text-white/80 font-body mt-6">
            Već imate nalog?{' '}
            <Link href="/login" className="text-white font-semibold hover:underline">
              Prijavite se
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}