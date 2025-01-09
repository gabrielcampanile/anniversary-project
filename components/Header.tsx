'use client'

import { useState } from 'react'
import { Heart, Music, ChevronDown, Plus, Edit, Trash, Menu, X } from 'lucide-react'

interface Song {
  id: number
  title: string
  artist: string
  youtubeId: string
}

interface HeaderProps {
  playlist: Song[]
  onAddSong: (song: Omit<Song, 'id'>) => void
  onEditSong: (id: number, song: Omit<Song, 'id'>) => void
  onRemoveSong: (id: number) => void
}

export default function Header({ playlist, onAddSong, onEditSong, onRemoveSong }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [editingSongId, setEditingSongId] = useState<number | null>(null)
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({ title: '', artist: '', youtubeId: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault()
    onAddSong(newSong)
    setNewSong({ title: '', artist: '', youtubeId: '' })
    setIsAddFormOpen(false)
  }

  const handleEditSong = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSongId !== null) {
      onEditSong(editingSongId, newSong)
      setNewSong({ title: '', artist: '', youtubeId: '' })
      setEditingSongId(null)
    }
  }

  const startEditing = (song: Song) => {
    setNewSong(song)
    setEditingSongId(song.id)
    setIsAddFormOpen(true)
  }

  return (
    <header className="bg-purple-700 text-white py-4 px-6 flex justify-between items-center relative">
      <div className="flex items-center space-x-2">
        <Heart className="text-pink-400" />
        <span className="font-bold text-xl">Nossa História</span>
      </div>
      <nav className="hidden md:flex">
        <ul className="flex space-x-4">
          {/* <li><a href="#inicio" className="hover:text-pink-400 transition-colors">Início</a></li>
          <li><a href="#memorias" className="hover:text-pink-400 transition-colors">Memórias</a></li> */}
          <li className="relative">
            <button onClick={toggleDropdown} className="flex items-center hover:text-pink-400 transition-colors">
              <Music className="mr-1" />
              Músicas
              <ChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  {playlist.map((song) => (
                    <div key={song.id} className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex justify-between items-center">
                      <span>{song.title} - {song.artist}</span>
                      <div>
                        <button onClick={() => startEditing(song)} className="text-blue-500 hover:text-blue-700 mr-2">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => onRemoveSong(song.id)} className="text-red-500 hover:text-red-700">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsAddFormOpen(true)}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Adicionar Música
                  </button>
                </div>
                {isAddFormOpen && (
                  <div className="p-4">
                    <form onSubmit={editingSongId !== null ? handleEditSong : handleAddSong}>
                      <input
                        type="text"
                        placeholder="Título"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                        className="w-full mb-2 p-2 border rounded text-gray-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Artista"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                        className="w-full mb-2 p-2 border rounded text-gray-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ID do YouTube"
                        value={newSong.youtubeId}
                        onChange={(e) => setNewSong({ ...newSong, youtubeId: e.target.value })}
                        className="w-full mb-2 p-2 border rounded text-gray-800"
                        required
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddFormOpen(false)
                            setEditingSongId(null)
                            setNewSong({ title: '', artist: '', youtubeId: '' })
                          }}
                          className="mr-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                          {editingSongId !== null ? 'Atualizar' : 'Adicionar'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-white hover:text-pink-400 transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-purple-700 text-white py-4 px-6 shadow-lg z-10">
          <ul className="space-y-4">
            <li><a href="#inicio" className="block hover:text-pink-400 transition-colors">Início</a></li>
            <li><a href="#memorias" className="block hover:text-pink-400 transition-colors">Memórias</a></li>
            <li className="relative">
              <button onClick={toggleDropdown} className="flex items-center hover:text-pink-400 transition-colors">
                <Music className="mr-1" />
                Músicas
                <ChevronDown className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {playlist.map((song) => (
                      <div key={song.id} className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex justify-between items-center">
                        <span>{song.title} - {song.artist}</span>
                        <div>
                          <button onClick={() => startEditing(song)} className="text-blue-500 hover:text-blue-700 mr-2">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => onRemoveSong(song.id)} className="text-red-500 hover:text-red-700">
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setIsAddFormOpen(true)}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Adicionar Música
                    </button>
                  </div>
                  {isAddFormOpen && (
                    <div className="p-4">
                      <form onSubmit={editingSongId !== null ? handleEditSong : handleAddSong}>
                        <input
                          type="text"
                          placeholder="Título"
                          value={newSong.title}
                          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                          className="w-full mb-2 p-2 border rounded text-gray-800"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Artista"
                          value={newSong.artist}
                          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                          className="w-full mb-2 p-2 border rounded text-gray-800"
                          required
                        />
                        <input
                          type="text"
                          placeholder="ID do YouTube"
                          value={newSong.youtubeId}
                          onChange={(e) => setNewSong({ ...newSong, youtubeId: e.target.value })}
                          className="w-full mb-2 p-2 border rounded text-gray-800"
                          required
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddFormOpen(false)
                              setEditingSongId(null)
                              setNewSong({ title: '', artist: '', youtubeId: '' })
                            }}
                            className="mr-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                          >
                            {editingSongId !== null ? 'Atualizar' : 'Adicionar'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}