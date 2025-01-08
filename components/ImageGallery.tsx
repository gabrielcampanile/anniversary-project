import Image from 'next/image'

const images = [
    '/aviao.jpg',
    '/praia.jpg',
    '/paraquedismo.jpg',
  // Adicione mais URLs de imagens conforme necessário
]

export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {images.map((src, index) => (
        <div key={index} className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={`Anniversary photo ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
      ))}
    </div>
  )
}
