export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-4">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} Nossa História</p>
        <p className="mt-2 text-sm">
          Criado com <span className="text-pink-400">&hearts;</span> por <a href="https://www.linkedin.com/in/gabriel-belchior-campanile/" className="font-bold underline hover:text-purple-300">Gabriel Belchior</a>
        </p>
      </div>
    </footer>
  )
}

