import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, ReactNode, useEffect, useState } from 'react'
import uuid from 'react-native-uuid'

// Interfaces
interface Desejo {
  id: string
  descricao: string
  valor: number
  urlImg: string
}

export interface ListaDesejos {
  id: number
  nome: string
  desejos: Desejo[]
}

interface ListaDesejosContextType {
  listasDesejos: ListaDesejos[]
  handleBuscarLista: (listaId: number) => ListaDesejos | undefined
  handleAdicionarNovaLista: (nomeLista: string) => number
  handleAdicionarDesejoALista: (listaId: number, desejo: Desejo) => void
  handleMontarDesejo: (nome: string, valor: number, urlImagem: string) => Desejo
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

  function handleBuscarLista(listaId: number) {
    const lista = listasDesejos.find((lista) => lista.id === listaId)
    return lista
  }

  function handleAdicionarDesejoALista(listaId: number, desejo: Desejo) {
    setListasDesejos((state) => {
      return state.map((lista) => {
        if (lista.id === listaId) {
          // Encontrou a lista correta, adiciona o desejo a essa lista
          return {
            ...lista,
            desejos: [...lista.desejos, desejo],
          }
        }
        return lista // Retorna as outras listas inalteradas
      })
    })
  }

  function handleMontarDesejo(
    descricao: string,
    valor: number,
    urlImagem: string,
  ) {
    const desejo: Desejo = {
      id: uuid.v4().toString(),
      descricao,
      valor,
      urlImg: urlImagem,
    }

    return desejo
  }

  // Cuando se monta el componente, intenta cargar las listas desde AsyncStorage
  useEffect(() => {
    cargarListasStorage()
  }, [])

  // Cuando se actualiza listasDesejos, guarda las listas en AsyncStorage
  useEffect(() => {
    salvarListasEmStorage()
  }, [listasDesejos])

  async function cargarListasStorage() {
    try {
      const storedListas = await AsyncStorage.getItem('listasDesejos')
      if (storedListas) {
        // Si hay listas almacenadas en AsyncStorage, analízalas y configúralas en el estado
        setListasDesejos(JSON.parse(storedListas))
      }
    } catch (error) {
      console.error('Error al cargar las listas desde AsyncStorage:', error)
    }
  }

  async function salvarListasEmStorage() {
    try {
      // Convierte listasDesejos a una cadena JSON antes de guardarla en AsyncStorage
      await AsyncStorage.setItem('listasDesejos', JSON.stringify(listasDesejos))
    } catch (error) {
      console.error('Error al guardar las listas en AsyncStorage:', error)
    }
  }

  return (
    <ListaDesejosContext.Provider
      value={{
        listasDesejos,
        handleAdicionarNovaLista,
        handleBuscarLista,
        handleAdicionarDesejoALista,
        handleMontarDesejo,
      }}
    >
      {children}
    </ListaDesejosContext.Provider>
  )
}
