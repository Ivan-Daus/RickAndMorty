import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginacionProps = {
    paginaActual: number
    totalPaginas: number
    setPaginaActual: React.Dispatch<React.SetStateAction<number>>
}

function Paginacion({paginaActual,totalPaginas,setPaginaActual}: PaginacionProps) {
    const paginasVisibles = 5
    
    const inicioPaginas = Math.max(paginaActual - 2,1)
    const finPaginas = Math.min(inicioPaginas + paginasVisibles - 1,totalPaginas)
    const paginas = []

    for (let i = inicioPaginas;i <= finPaginas;i++) {
        paginas.push(i)
    }
    
    return (
        <div className='flex justify-center mt-8 mb-8'>
            <Pagination className='bg-zinc-900 px-6 py-3'>
                <PaginationContent className='gap-2'>
                    <PaginationItem>
                        <PaginationPrevious
                            className='text-white hover:bg-zinc-700 cursor-pointer'
                            onClick={() => {
                                if (paginaActual > 1) {
                                    setPaginaActual(
                                        prev => prev - 1
                                    )
                                }
                            }}
                        />
                    </PaginationItem>
                    {
                        paginas.map((pagina) => (
                            <PaginationItem key={pagina}>
                                <button className={`px-4 py-2 rounded-lg transition
                                        ${paginaActual === pagina ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700' }`}
                                    onClick={() =>
                                        setPaginaActual(pagina)
                                    }>
                                    {pagina}
                                </button>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <PaginationNext className='text-white hover:bg-zinc-700 cursor-pointer'
                            onClick={() => {
                                if (paginaActual < totalPaginas) {
                                    setPaginaActual(
                                        prev => prev + 1
                                    )
                                }
                            }}/>
                    </PaginationItem>
                </PaginationContent>

            </Pagination>

        </div>

    )
}

export default Paginacion