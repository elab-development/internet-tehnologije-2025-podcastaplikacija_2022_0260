'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo sa efektom */}
          <Link 
            href="/" 
            className="text-2xl font-heading font-black hover:scale-110 transition-transform duration-300 flex items-center gap-2"
          >
            {/* bg-purple-600 text-primary-600 px-3 py-1 rounded-lg shadow-lg ovo je bilo u span className, mada realno nema smisla da bude takvog izgleda, ovako je bolje, staviti logo umesto teksta kad ga napravimo */}
            <span className="">
              Tune In
            </span>
            <span className="text-3xl">🎧</span>
          </Link>

          {/* Desktop navigacija */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body"
            >
              Početna
            </Link>
            <Link 
              href="/podcasts" 
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body"
            >
              Podcastovi
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-body"
            >
              O nama
            </Link>
            <Link 
              href="/login" 
              className="ml-2 bg-purple-600 text-primary-600 px-6 py-2 rounded-full font-heading font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Prijava
            </Link>
          </div>

          {/*hamburger meni */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none hover:bg-white/20 p-2 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* burger meni animacija*/}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <Link 
              href="/" 
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body" 
              onClick={() => setIsOpen(false)}
            >
              🏠 Početna
            </Link>
            <Link 
              href="/podcasts" 
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body" 
              onClick={() => setIsOpen(false)}
            >
              🎙️ Podcastovi
            </Link>
            <Link 
              href="/about" 
              className="block py-3 px-4 rounded-lg hover:bg-white/20 backdrop-blur-sm transition font-body" 
              onClick={() => setIsOpen(false)}
            >
              ℹ️ O nama
            </Link>
            <Link 
              href="/login" 
              className="block py-3 bg-white text-primary-600 rounded-lg text-center font-heading font-semibold hover:shadow-xl transition" 
              onClick={() => setIsOpen(false)}
            >
              🔐 Prijava
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}