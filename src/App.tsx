import { useEffect, useState } from 'react'
import Personajes from './components/Personajes'
import type { Personaje } from "./type/type"
import { Toaster } from "@/components/ui/sonner"
function App() {

  const [datos, setDatos] = useState<Personaje[]>([])

  useEffect(() => {
    const obtenerPersonajes = async () => {
      let personajes = []
      // Primera petición
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      personajes = [...data.results]
      
      // Obtener las demás páginas
      for (let i = 2; i <= data.info.pages; i++) {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
        const json = await res.json()
        personajes = [...personajes, ...json.results]
      }
      
      setDatos(personajes)
    }
    obtenerPersonajes()
  }, [])
  
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className='bg-gray-200 h-screen overflow-y-auto'>
        <Personajes datosPersonajes={datos}></Personajes>
      </div>
    </>
  )
}

export default App
