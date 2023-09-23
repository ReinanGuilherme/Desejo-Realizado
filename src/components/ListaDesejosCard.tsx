import React, { useContext, useEffect, useState } from 'react'
import { Text, VStack } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import {
  ListaDesejos,
  ListaDesejosContext,
} from '../context/listaDesejosContext'

type Props = IVStackProps & {
  listaId: number
}

export function ListaDesejosCard({ listaId }: Props) {
  const { handleBuscarLista } = useContext(ListaDesejosContext)

  const [lista, setLista] = useState<ListaDesejos | undefined>(
    {} as ListaDesejos,
  )

  const [totalItens, setTotalItens] = useState(0)
  const [valorDaLista, setValorDaLista] = useState(0.0)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleRedirecionar() {
    navigation.navigate('lista', { listaId })
  }

  // capturando a lista referencia para a tela
  useEffect(() => {
    const lista = handleBuscarLista(listaId)

    const valorDaLista = lista?.desejos.reduce(
      (acumulador, desejo) => acumulador + desejo.valor,
      0,
    )

    setLista(lista)
    setTotalItens(lista?.desejos.length as number)
    setValorDaLista(valorDaLista as number)
  }, [listaId, handleBuscarLista])

  return (
    <TouchableOpacity onPress={handleRedirecionar}>
      <VStack h="125px" w="full" bg="gray.500" mb={2} p={4} rounded="md">
        <Text
          color="white"
          fontSize="2xl"
          textAlign="center"
          fontFamily="heading"
          textTransform="capitalize"
        >
          {lista?.nome}
        </Text>
        <Text color="white">Total de desejos: {totalItens}</Text>
        <Text color="white">Valor da lista: R$ {valorDaLista.toFixed(2)}</Text>
      </VStack>
    </TouchableOpacity>
  )
}
