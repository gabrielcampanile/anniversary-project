import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  startDate: string
}

export default function CountdownTimer({ startDate }: CountdownTimerProps) {
  const [timeElapsed, setTimeElapsed] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startDate).getTime()
      const now = new Date().getTime()
      const elapsed = now - start

      const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365))
      const days = Math.floor((elapsed % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)

      setTimeElapsed(`${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-semibold text-white mb-2">Time Together</h2>
      <div className="text-4xl font-bold text-white">{timeElapsed}</div>
    </div>
  )
}

