'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Plus } from 'lucide-react'

interface Song {
  id: number
  title: string
  artist: string
  src: string
}

const initialPlaylist: Song[] = [
  { id: 1, title: "Último Romance", artist: "Los Hermanos", src: "/audio/ultimo-romance.mp3" },
  { id: 2, title: "Dengo", artist: "João Gomes", src: "/audio/dengo.mp3" },
  { id: 3, title: "Our Song", artist: "Love Band", src: "/audio/ultimo-romance.mp3" },
  { id: 4, title: "First Date", artist: "Romance Singers", src: "/audio/dengo.mp3" },
]


export default function BackgroundMusic() {
  const [playlist, setPlaylist] = useState<Song[]>(initialPlaylist)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const nextSong = () => setCurrentSong((prev) => (prev + 1) % playlist.length)
  const prevSong = () => setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const addSong = (newSong: Omit<Song, 'id'>) => {
    const id = playlist.length > 0 ? Math.max(...playlist.map(s => s.id)) + 1 : 1
    setPlaylist([...playlist, { ...newSong, id }])
    setShowAddForm(false)
  }

  return (
    <div className="bg-purple-800 text-white py-4 px-6">
      <audio 
        ref={audioRef}
        src={playlist[currentSong].src}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextSong}
      />
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{playlist[currentSong].title}</h3>
          <p className="text-sm text-purple-300">{playlist[currentSong].artist}</p>
        </div>
        <div className="flex-1 flex justify-center items-center space-x-4">
          <button onClick={prevSong} className="text-white hover:text-purple-300">
            <SkipBack size={24} />
          </button>
          <button onClick={togglePlay} className="text-white hover:text-purple-300">
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={nextSong} className="text-white hover:text-purple-300">
            <SkipForward size={24} />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div className="w-full max-w-[200px] h-1 bg-purple-600 rounded-full mb-2">
            <div 
              className="h-full bg-white rounded-full" 
              style={{width: `${(currentTime / duration) * 100}%`}}
            ></div>
          </div>
          <span className="text-xs">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
      >
        <Plus size={20} className="mr-2" />
        Adicionar Música
      </button>
      {showAddForm && (
        <AddSongForm onAdd={addSong} onCancel={() => setShowAddForm(false)} />
      )}
    </div>
  )
}

interface AddSongFormProps {
  onAdd: (song: Omit<Song, 'id'>) => void
  onCancel: () => void
}

function AddSongForm({ onAdd, onCancel }: AddSongFormProps) {
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    artist: '',
    src: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(newSong)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-purple-700 p-4 rounded-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-white">Título da Música</label>
        <input
          type="text"
          id="title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="artist" className="block text-sm font-medium text-white">Artista</label>
        <input
          type="text"
          id="artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="src" className="block text-sm font-medium text-white">URL da Música</label>
        <input
          type="text"
          id="src"
          value={newSong.src}
          onChange={(e) => setNewSong({ ...newSong, src: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-700"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-500 border border-transparent rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}

