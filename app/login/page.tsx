'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // URADITI VALIDACIJU SIFRE SA BAZOM, ovo je privremeno da vidimo da li radi!
    
    console.log('Logovanje', formData)
    alert(`Uspešno ste se ulogovali! Dobrodošli, ${formData.email}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black-900 via-purple-900/20 to-purple-600 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">
            
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
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
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
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-heading font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-6"
            >
              Uloguj se
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
            Nemate nalog?{' '}
            <Link href="/register" className="text-white font-semibold hover:underline">
              Registrujte se
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}