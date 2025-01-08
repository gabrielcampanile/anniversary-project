'use client'

import Image from 'next/image'

interface Memory {
  id: number
  imageUrl: string
  location: string
  date: string
  description: string
}

const memories: Memory[] = [
  {
    id: 1,
    imageUrl: '/images/aviao.jpg',
    location: 'Boituva, SP',
    date: '2021-11-20',
    description: 'Onde tudo começou'
  },
  {
    id: 2,
    imageUrl: '/images/praia.jpg',
    location: 'Peruíbe, SP',
    date: '2022-02-28',
    description: 'Nossa primeira viagem para a praia'
  },
  {
    id: 3,
    imageUrl: '/images/paraquedismo.jpg',
    location: 'Boituva, SP',
    date: '2022-01-26',
    description: 'Primeiro pôr do sol'
  },
  {
    id: 4,
    imageUrl: '/images/acad.jpg',
    location: 'Boituva, SP',
    date: '2023-03-09',
    description: 'Primeiro treino juntos'
  },
  {
    id: 5,
    imageUrl: '/images/campos.jpg',
    location: 'Campos do Jordão, SP',
    date: '2024-11-15',
    description: 'Primeira viagem internacional rs'
  },
  {
    id: 6,
    imageUrl: '/images/friends.jpg',
    location: "Manu's House",
    date: '2023-12-30',
    description: 'Primeiro reveillon com nossos amigos'
  },
  {
    id: 7,
    imageUrl: '/images/objetivo.jpg',
    location: 'Boituva, SP',
    date: '2019-06-15',
    description: 'Estudiantes'
  },
  {
    id: 8,
    imageUrl: '/images/pisci.jpg',
    location: 'Iperó, SP',
    date: '2024-01-01',
    description: 'Aniversário de 2 anos'
  },
  {
    id: 9,
    imageUrl: '/images/praia2.jpg',
    location: 'Itanhaém, SP',
    date: '2023-11-18',
    description: 'Primeira viagem sozinhos'
  },
  {
    id: 10,
    imageUrl: '/images/show.jpg',
    location: 'Alfenas, MG',
    date: '2024-06-22',
    description: 'Primeiro show 🤘'
  },
  {
    id: 11,
    imageUrl: '/images/tranca.jpg',
    location: "Manu's House",
    date: '2022-09-17',
    description: 'Aprendendo a jogar tranca'
  },
  {
    id: 12,
    imageUrl: '/images/work.jpg',
    location: 'Alfenas, MG',
    date: '2023-06-22',
    description: 'Trabalhando nossa sorte'
  }
]

// Ordenar as memórias por data
memories.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {memories.map(memory => (
        <div key={memory.id} className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={memory.imageUrl}
            alt={memory.description}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="text-lg font-semibold">{memory.location}</h3>
            <p className="text-sm">{memory.date}</p>
            <p className="text-sm">{memory.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}