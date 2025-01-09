'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import CountdownTimer from './CountdownTimer'
import ImageGallery from './ImageGallery'
import BackgroundMusic from './BackgroundMusic'

interface Song {
  id: number
  title: string
  artist: string
  youtubeId: string
}

const initialPlaylist: Song[] = [
  { id: 1, title: "Nossa Canção", artist: "Banda do Amor", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Primeiro Encontro", artist: "Cantores Românticos", youtubeId: "ZbZSe6N_BXs" },
  { id: 3, title: "Valsa do Aniversário", artist: "Orquestra da Celebração", youtubeId: "fJ9rUzIMcZQ" },
]

export default function AnniversaryPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>(initialPlaylist)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addSong = (song: Omit<Song, 'id'>) => {
    const newId = Math.max(...playlist.map(s => s.id)) + 1
    setPlaylist([...playlist, { ...song, id: newId }])
  }

  const editSong = (id: number, updatedSong: Omit<Song, 'id'>) => {
    setPlaylist(playlist.map(song => song.id === id ? { ...updatedSong, id } : song))
  }

  const removeSong = (id: number) => {
    setPlaylist(playlist.filter(song => song.id !== id))
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <Header playlist={playlist} onAddSong={addSong} onEditSong={editSong} onRemoveSong={removeSong} />
      <main className="flex-grow container mx-auto px-4 py-8 mb-16">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Nosso 3º Aniversário</h1>
        <CountdownTimer startDate="2022-01-01" />
        <ImageGallery />
      </main>
      <BackgroundMusic playlist={playlist} />
      <Footer />
    </div>
  )
}

