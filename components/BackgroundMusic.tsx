'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

interface Song {
  id: number
  title: string
  artist: string
  src: string
}

const playlist: Song[] = [
  { id: 1, title: "Our Song", artist: "Love Band", src: "/audio/ultimo-romance.mp3" },
  { id: 2, title: "First Date", artist: "Romance Singers", src: "/audio/dengo.mp3" },
  { id: 3, title: "Anniversary Waltz", artist: "Celebration Orchestra", src: "/audio/dengo.mp3" },
]

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
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

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-72">
      <audio 
        ref={audioRef}
        src={playlist[currentSong].src}
        onTimeUpdate={onTimeUpdate}
        onEnded={nextSong}
      />
      <div className="text-center mb-2">
        <h3 className="font-bold text-gray-900">{playlist[currentSong].title}</h3>
        <p className="text-sm text-gray-700">{playlist[currentSong].artist}</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
        <div className="w-40 h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-purple-600 rounded-full" 
            style={{width: `${(currentTime / duration) * 100}%`}}
          ></div>
        </div>
        <span className="text-xs text-gray-600">{formatTime(duration)}</span>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button onClick={prevSong} className="text-purple-600 hover:text-purple-800">
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlay} className="text-purple-600 hover:text-purple-800">
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button onClick={nextSong} className="text-purple-600 hover:text-purple-800">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  )
}

