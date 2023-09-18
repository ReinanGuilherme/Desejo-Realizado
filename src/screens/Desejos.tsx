import React, { useContext, useEffect, useState } from 'react'
import { VStack } from 'native-base'
import { Header } from '../components/Header'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ListaDesejos,
  ListaDesejosContext,
} from '../context/listaDesejosContext'

export function Desejos() {
  const route: RouteProp<{ params: { desejoId: number } }> = useRoute()
  const desejoId = route.params?.desejoId
  const { listasDesejos } = useContext(ListaDesejosContext)

  const [lista, setLista] = useState<ListaDesejos | undefined>(
    {} as ListaDesejos,
  )

  useEffect(() => {
    const listaDesejo = listasDesejos.find((lista) => lista.id === desejoId)
    setLista(listaDesejo)
  }, [listasDesejos, desejoId])

  return (
    <VStack>
      <Header titulo={lista?.nome || 'Nome Padrão'} />
    </VStack>
  )
}
