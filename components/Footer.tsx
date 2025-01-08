import BackgroundMusic from './BackgroundMusic'

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white">
      <BackgroundMusic />
      <div className="text-center py-4">
        <p>&copy; {new Date().getFullYear()} Nossa História de Amor</p>
        <p className="mt-2 text-sm">
          Criado com <span className="text-pink-400">&hearts;</span> para celebrar nosso amor
        </p>
      </div>
    </footer>
  )
}

