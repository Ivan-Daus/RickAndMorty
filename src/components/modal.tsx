import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { Personaje } from "../type/type"

type ModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    personaje: Personaje | null
}

function Modal({ isOpen, setIsOpen, personaje }: ModalProps) {

    //console.log(personaje)
    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-start justify-center p-4 overflow-y-auto">
                    <DialogPanel className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
                        <div className="w-full h-56 bg-black/5 flex items-center justify-center">
                            <img
                                className="h-full w-full object-contain"
                                src={personaje?.image}
                                alt={personaje?.name}
                            />
                        </div>
                        <div className="p-4">
                            <DialogTitle className="text-xl font-bold mb-3">
                                {personaje?.name}
                            </DialogTitle>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p><span className="font-semibold">Creación:</span> {personaje?.created ? new Date(personaje.created).toLocaleDateString('es-MX') : 'Sin fecha'}</p>
                                <p><span className="font-semibold">Origen:</span> {personaje?.origin.name}</p>
                                <p><span className="font-semibold">Especie:</span> {personaje?.species}</p>
                                <p><span className="font-semibold">Género:</span> {personaje?.gender}</p>
                                <p><span className="font-semibold">Estatus:</span> {personaje?.status}</p>
                                <p><span className="font-semibold">Locación:</span> {personaje?.location.name}</p>
                                <p><span className="font-semibold">Capítulos:</span> {personaje?.episode.length}</p>
                                <p><span className="font-semibold">Tipo:</span> {personaje?.type || "tipo normal"}</p>
                            </div>
                            
                            <button className="mt-4 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg w-full"
                                onClick={() => setIsOpen(false)}>
                                Cerrar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}


export default Modal;