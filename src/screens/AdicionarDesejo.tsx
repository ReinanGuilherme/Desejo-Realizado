import React, { useContext, useEffect, useState } from 'react'
import { Center, Image, ScrollView, Text, VStack } from 'native-base'
import { Header } from '../components/Header'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
  ListaDesejos,
  ListaDesejosContext,
} from '../context/listaDesejosContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export function AdicionarDesejo() {
  const route: RouteProp<{ params: { listaId: number } }> = useRoute()
  const listaId = route.params?.listaId

  const { handleBuscarLista, handleAdicionarDesejoALista, handleMontarDesejo } =
    useContext(ListaDesejosContext)

  const [lista, setLista] = useState<ListaDesejos | undefined>(
    {} as ListaDesejos,
  )

  const [desejo, setDesejo] = useState('')
  const [valor, setValor] = useState('')
  const [urlImagem, setUrlImagem] = useState('')

  function handleDesejoTextChange(text: string) {
    setDesejo(text)
  }

  function handleValorTextChange(text: string) {
    setValor(text)
  }

  async function handleSelecionarImagem() {
    const imagemSelecionada = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })

    if (imagemSelecionada.canceled) {
      return
    }

    setUrlImagem(imagemSelecionada.assets[0].uri)
  }

  function handleAdicionarDesejo() {
    const formatarValor = valor.replace(',', '.')

    const objDesejo = handleMontarDesejo(
      desejo,
      parseFloat(formatarValor),
      urlImagem,
    )

    handleAdicionarDesejoALista(listaId, objDesejo)

    // limpando campos
    setDesejo('')
    setValor('')
    setUrlImagem('')
  }

  // capturando a lista referencia para a tela
  useEffect(() => {
    setLista(handleBuscarLista(listaId))
  }, [listaId, handleBuscarLista])

  return (
    <ScrollView>
      <Header titulo={lista?.nome || ''} />

      <VStack px={2}>
        <Text color="white" fontSize="lg" mb="2">
          Desejo:
        </Text>
        <Input
          value={desejo}
          placeholder="Ex: Geladeira"
          onChangeText={handleDesejoTextChange}
        />

        <Text color="white" fontSize="lg" mb="2">
          Valor:
        </Text>
        <Input
          placeholder="Ex: R$ 100,00"
          value={valor.toString()}
          onChangeText={handleValorTextChange}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleSelecionarImagem}>
          <Text color="green.500" mb={4} fontSize="lg">
            Selecionar uma imagem
          </Text>
        </TouchableOpacity>
        <Center>
          {urlImagem && (
            <Image
              source={{
                uri: urlImagem,
              }}
              alt=""
              w="40"
              h={40}
              rounded="md"
              mb={4}
              resizeMode="center"
            />
          )}
        </Center>

        <Button title="Adicionar Desejo" onPress={handleAdicionarDesejo} />
      </VStack>
    </ScrollView>
  )
}
