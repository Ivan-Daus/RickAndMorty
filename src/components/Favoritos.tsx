import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react'

import type { Personaje } from "../type/type"

type FavoritosProps = {
    favoritos: Personaje[]
    eliminarFavorito: (fav: Personaje) => void
    abrirModal: (personaje: Personaje) => void
}

function Favoritos({
    favoritos,
    eliminarFavorito,
    abrirModal
}: FavoritosProps) {

    return (
            <Disclosure>
                <DisclosureButton className=' bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xlw-full transition font-bold'>
                    Favoritos ({favoritos.length})
                </DisclosureButton>
                
                <DisclosurePanel className='bg-gray-800 text-white mt-2 rounded-xl p-4 grid grid-cols-12 gap-4'>
                    {
                        favoritos.map((fav) => (
                            <div key={fav.id} className='bg-gray-700 p-3 rounded-xl col-span-2 flex flex-col items-centergap-3 transitionhover:scale-105'>
                                <img className='w-20 rounded-full border-2 border-white'
                                    src={fav.image}
                                    alt={fav.name}
                                    onClick={() => abrirModal(fav)}
                                />
                                <p className='text-center font-semibold'>
                                    {fav.name}
                                </p>
                                <button
                                    className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition duration-300 w-full'
                                    onClick={() => eliminarFavorito(fav)}>
                                    Eliminar
                                </button>
                            </div>
                        ))
                    }
                </DisclosurePanel>
            </Disclosure>
    )
}

export default Favoritos