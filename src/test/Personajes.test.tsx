import { describe, test, expect } from 'vitest'

import { render, screen } from '@testing-library/react'

import Personajes from '../components/Personajes'

describe('Personajes component', () => {

    test('renderiza el componente', () => {

        render(
            <Personajes
                datosPersonajes={[]}
            />
        )

        expect(
            screen.getByPlaceholderText(
                /buscar personaje/i
            )
        ).toBeInTheDocument()

    })

})