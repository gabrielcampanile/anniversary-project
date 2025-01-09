'use client'

import { useState, useRef } from 'react'
import { Plus, Edit, Trash } from 'lucide-react'
import MemoryImage from './MemoryImage'

interface Memory {
  id: number
  image: string
  location: string
  date: string
  description: string
}

interface ImageGalleryProps {
  memories: Memory[]
  onAddMemory: (memory: Omit<Memory, 'id'>) => void
  onEditMemory: (id: number, memory: Omit<Memory, 'id'>) => void
  onRemoveMemory: (id: number) => void
}

export default function ImageGallery({ memories, onAddMemory, onEditMemory, onRemoveMemory }: ImageGalleryProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newMemory, setNewMemory] = useState<Omit<Memory, 'id'>>({
    image: '',
    location: '',
    date: '',
    description: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleMemoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMemory(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setNewMemory(prev => ({ ...prev, image: event.target.result as string }))
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      onEditMemory(editingId, newMemory)
      setEditingId(null)
    } else {
      onAddMemory(newMemory)
    }
    setShowForm(false)
    setNewMemory({ image: '', location: '', date: '', description: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const startEditing = (memory: Memory) => {
    setNewMemory(memory)
    setEditingId(memory.id)
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const cancelEditing = () => {
    setShowForm(false)
    setEditingId(null)
    setNewMemory({ image: '', location: '', date: '', description: '' })
  }

  // Ordenar as memórias por data
  const sortedMemories = [...memories].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sortedMemories.map(memory => (
          <div key={memory.id} className="relative h-64 rounded-lg overflow-hidden group shadow-lg">
            <MemoryImage image={memory.image} alt={memory.description} />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-lg font-semibold">{memory.location}</h3>
              <p className="text-sm">{memory.date}</p>
              <p className="text-sm">{memory.description}</p>
            </div>
            <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEditing(memory)}
                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Edit size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <form ref={formRef} onSubmit={handleSubmit} className="bg-purple-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem</label>
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newMemory.location}
              onChange={handleMemoryChange}
              className="mt-1 px-1 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newMemory.date}
              onChange={handleMemoryChange}
              className="mt-1 px-1 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={newMemory.description}
              onChange={handleMemoryChange}
              className="mt-1 px-1 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={cancelEditing}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancelar
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={() => onRemoveMemory(editingId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash size={20} />
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {editingId !== null ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors mx-auto"
        >
          <Plus size={20} className="mr-2" />
          Adicionar Memória
        </button>
      )}
    </div>
  )
}