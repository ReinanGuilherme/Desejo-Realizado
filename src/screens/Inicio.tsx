import React, { useState, useContext } from 'react'
import { VStack, Heading } from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { ListaDesejosContext } from '../context/listaDesejosContext'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

export function Inicio() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { handleAdicionarNovaLista } = useContext(ListaDesejosContext)

  const [nomeLista, setNomeLista] = useState('')

  function handleNomeListaChange(text: string) {
    setNomeLista(text)
  }

  function handleAdicionarLista() {
    const id = handleAdicionarNovaLista(nomeLista)

    navigation.navigate('desejos', { listaId: id })
  }

  return (
    <VStack flex={1} justifyContent="center">
      <Heading color="white" textAlign="center" mb="10">
        Crie sua lista de desejos.
      </Heading>

      <VStack px="2">
        <Input
          placeholder="Nome da lista"
          onChangeText={handleNomeListaChange}
        />
        <Button title="Criar Lista" onPress={handleAdicionarLista} />
      </VStack>
    </VStack>
  )
}
