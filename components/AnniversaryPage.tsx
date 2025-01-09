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

interface Memory {
  id: number
  image: string
  location: string
  date: string
  description: string
}

const initialPlaylist: Song[] = [
  { id: 1, title: "Último Romance", artist: "Los Hermanos", youtubeId: "WEYV5pTjNHU" },
  { id: 2, title: "Bohemian Rhapsody", artist: "Queen", youtubeId: "fJ9rUzIMcZQ" },
  { id: 3, title: "Te amo Disgraça", artist: "Baco Exu", youtubeId: "qeO5EBBCPm0" },
  { id: 4, title: "Meu Pedaço de Pecado", artist: "João Gomes", youtubeId: "H1DEczvTjgE" },
]

const initialMemories: Memory[] = [
  {
    id: 1,
    image: '/images/aviao.jpg',
    location: 'Boituva, SP',
    date: '2021-11-20',
    description: 'Onde tudo começou'
  },
  {
    id: 2,
    image: '/images/praia.jpg',
    location: 'Peruíbe, SP',
    date: '2022-02-28',
    description: 'Nossa primeira viagem para a praia'
  },
  {
    id: 3,
    image: '/images/paraquedismo.jpg',
    location: 'Boituva, SP',
    date: '2022-01-26',
    description: 'Primeiro pôr do sol'
  },
]

export default function AnniversaryPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [memories, setMemories] = useState<Memory[]>([])

  useEffect(() => {
    setIsMounted(true)
    const storedPlaylist = localStorage.getItem('playlist')
    const storedMemories = localStorage.getItem('memories')
    
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist))
    } else {
      setPlaylist(initialPlaylist)
    }

    if (storedMemories) {
      setMemories(JSON.parse(storedMemories))
    } else {
      setMemories(initialMemories)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('playlist', JSON.stringify(playlist))
      localStorage.setItem('memories', JSON.stringify(memories))
    }
  }, [playlist, memories, isMounted])

  const addSong = (song: Omit<Song, 'id'>) => {
    const newId = Math.max(...playlist.map(s => s.id), 0) + 1
    setPlaylist([...playlist, { ...song, id: newId }])
  }

  const editSong = (id: number, updatedSong: Omit<Song, 'id'>) => {
    setPlaylist(playlist.map(song => song.id === id ? { ...updatedSong, id } : song))
  }

  const removeSong = (id: number) => {
    setPlaylist(playlist.filter(song => song.id !== id))
  }

  const addMemory = (memory: Omit<Memory, 'id'>) => {
    const newId = Math.max(...memories.map(m => m.id), 0) + 1
    setMemories([...memories, { ...memory, id: newId }])
  }

  const editMemory = (id: number, updatedMemory: Omit<Memory, 'id'>) => {
    setMemories(memories.map(memory => memory.id === id ? { ...updatedMemory, id } : memory))
  }

  const removeMemory = (id: number) => {
    setMemories(memories.filter(memory => memory.id !== id))
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
        <ImageGallery
          memories={memories}
          onAddMemory={addMemory}
          onEditMemory={editMemory}
          onRemoveMemory={removeMemory}
        />
      </main>
      <BackgroundMusic playlist={playlist} />
      <Footer />
    </div>
  )
}

