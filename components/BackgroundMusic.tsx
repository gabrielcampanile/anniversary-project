'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube'

interface Song {
  id: number
  title: string
  artist: string
  youtubeId: string
}

export default function BackgroundMusic({ playlist }: { playlist: Song[] }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSong, setCurrentSong] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const playerRef = useRef<YouTube>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.internalPlayer.playVideo()
      } else {
        playerRef.current.internalPlayer.pauseVideo()
      }
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const nextSong = () => setCurrentSong((prev) => (prev + 1) % playlist.length)
  const prevSong = () => setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)

  const onReady: YouTubeProps['onReady'] = (event) => {
    setDuration(event.target.getDuration())
    if (isPlaying) {
      event.target.playVideo()
    }
  }

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true)
      startTimeUpdate(event.target)
    } else {
      setIsPlaying(false)
      stopTimeUpdate()
    }
  }

  const startTimeUpdate = (player: YouTubePlayer) => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(player.getCurrentTime())
    }, 1000)
  }

  const stopTimeUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (playlist.length === 0) {
    return null
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-purple-800 text-white py-2 px-4">
      <div className="flex justify-between items-center">
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
      <YouTube
        videoId={playlist[currentSong].youtubeId}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        ref={playerRef}
      />
    </div>
  )
}