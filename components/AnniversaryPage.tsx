'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import CountdownTimer from './CountdownTimer'
import ImageGallery from './ImageGallery'
import BackgroundMusic from './BackgroundMusic'

export default function AnniversaryPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Nosso 3º Aniversário</h1>
        <CountdownTimer startDate="2022-01-01" />
        <ImageGallery />
        <BackgroundMusic />
      </main>
      <Footer />
    </div>
  )
}

