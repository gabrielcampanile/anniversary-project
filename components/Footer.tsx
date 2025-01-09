export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-4">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} Nossa História de Amor</p>
        <p className="mt-2 text-sm">
          Criado com <span className="text-pink-400">&hearts;</span> para celebrar nosso amor
        </p>
      </div>
    </footer>
  )
}

