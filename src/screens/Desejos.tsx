import React, { useContext, useEffect, useState } from 'react'
import { Text, VStack } from 'native-base'
import { Header } from '../components/Header'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ListaDesejos,
  ListaDesejosContext,
} from '../context/listaDesejosContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

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

      <VStack px={2}>
        <Text color="white" fontSize="lg" mb="2">
          Desejo:
        </Text>
        <Input placeholder="Ex: Geladeira" />

        <Text color="white" fontSize="lg" mb="2">
          Valor:
        </Text>
        <Input placeholder="Ex: R$ 100,00" />

        <Text color="white" fontSize="lg" mb="2">
          URL Imagem:
        </Text>
        <Input placeholder="Ex: https://minhaimagem.com" />

        <Button title="Adicionar Desejo" />
      </VStack>
    </VStack>
  )
}
