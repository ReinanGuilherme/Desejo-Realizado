import { createContext, ReactNode, useState } from 'react'

// Interfaces
interface Desejo {
  id: number
  nome: string
  descricao: string
  urlImg: string
}

export interface ListaDesejos {
  id: number
  nome: string
  desejos: Desejo[]
}

interface ListaDesejosContextType {
  listasDesejos: ListaDesejos[]
  handleAdicionarNovaLista: (nomeLista: string) => number
}

interface ListaDesejosProviderProps {
  children: ReactNode
}

export const ListaDesejosContext = createContext({} as ListaDesejosContextType)

export function ListaDesejosProvider({ children }: ListaDesejosProviderProps) {
  const [listasDesejos, setListasDesejos] = useState<ListaDesejos[]>([])

  function handleAdicionarNovaLista(nomeLista: string) {
    const id = listasDesejos.length + 1

    setListasDesejos((state) => [
      ...state,
      {
        id,
        nome: nomeLista,
        desejos: [],
      },
    ])

    return id
  }

  return (
    <ListaDesejosContext.Provider
      value={{ listasDesejos, handleAdicionarNovaLista }}
    >
      {children}
    </ListaDesejosContext.Provider>
  )
}
