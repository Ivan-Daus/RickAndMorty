import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

import { toast } from "sonner"

import type { Personaje } from "../type/type"
import Modal from './modal'
import Favoritos from './Favoritos'
import Paginacion from './Paginacion'

type PersonajesProps = {
    datosPersonajes: Personaje[]
}

function Personajes({ datosPersonajes }: PersonajesProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Personaje | null>(null)
    const [favoritos,setFavoritos] = useState<Personaje[]>([])
    const [paginaActual,setPaginaActual] = useState(1)
    const [buscar,setBuscar] = useState("");

    useEffect(() => {
        console.log(favoritos)
    }, [favoritos])

    function existeFavorito(item: Personaje) {
        return favoritos.some(
            fav => fav.id === item.id
        )
    }

    function agregarFavorito(item: Personaje) {
        if (existeFavorito(item)) {
            //alert("Este personaje ya está en favoritos")
            toast.warning("Este personaje ya está en favoritos")
            return
        }
        setFavoritos(prev => [...prev, item])
    }

    function eliminarFavorito(item: Personaje) {
        if (!existeFavorito(item)) {
            //alert("No se puede eliminar este personaje")
            toast.warning("No se puede eliminar este personaje")
            return
        }
        setFavoritos(prev =>
            prev.filter(
                favorito => favorito.id !== item.id
            )
        )
    }
    function abrirModal(personaje: Personaje) {
        setPersonajeSeleccionado(personaje)
        setIsOpen(true)
    }

    const personajesFiltrados = datosPersonajes.filter((personaje) => personaje.name
        .toLowerCase()
        .includes(buscar.toLowerCase()))

    // PAGINACIÓN
    const personajesPorPagina = 20
    const indiceFinal = paginaActual * personajesPorPagina
    const indiceInicial = indiceFinal - personajesPorPagina
    const personajesActuales = personajesFiltrados.slice(indiceInicial,indiceFinal)
    const totalPaginas = Math.ceil(personajesFiltrados.length / personajesPorPagina)
    
    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} personaje={personajeSeleccionado}/>
            
            <Favoritos favoritos={favoritos} eliminarFavorito={eliminarFavorito} abrirModal={abrirModal}/>
            <Input className='m-3 w-50' type="text" placeholder="buscar personaje" onChange={(e)=> setBuscar(e.target.value)} />
            
            <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} setPaginaActual={setPaginaActual}/>
            
            <div className='grid grid-cols-12 gap-4 p-4'>
                {
                    personajesActuales.map((item) => (
                        
                        <div className='col-span-3 bg-zinc-50 rounded-xl overflow-hidden shadow-lg' key={item.id}>
                            <div
                                className='transition duration-300 hover:scale-105 cursor-pointer'
                                onClick={() =>
                                    abrirModal(item)
                                }>
                                <img className='object-cover w-full' src={item.image} alt={item.name}/>
                                <p className='font-bold text-center py-2'>
                                    {item.name}
                                </p>
                            </div>
                            <div className='grid grid-cols-6'>
                                <button
                                    className='bg-green-600 p-2 col-span-3 hover:bg-green-700 transition duration-300 text-white '
                                    onClick={() =>
                                        agregarFavorito(item)
                                    }>
                                    Agregar
                                </button>
                                <button className='bg-red-600 p-2 col-span-3 hover:bg-red-700 transition duration-300 text-white'
                                    onClick={() =>
                                        eliminarFavorito(item)
                                    }>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} setPaginaActual={setPaginaActual}/>
        </>
    )
}

export default Personajes