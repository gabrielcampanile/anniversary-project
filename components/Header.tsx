import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-purple-700 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Heart className="text-pink-400" />
        <span className="font-bold text-xl">Nossa História de Amor</span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#inicio" className="hover:text-pink-400 transition-colors">Início</a></li>
          <li><a href="#memorias" className="hover:text-pink-400 transition-colors">Memórias</a></li>
          <li><a href="#musica" className="hover:text-pink-400 transition-colors">Música</a></li>
        </ul>
      </nav>
    </header>
  )
}

