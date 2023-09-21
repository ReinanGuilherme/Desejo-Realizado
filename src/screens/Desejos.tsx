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

export function Desejos() {
  const route: RouteProp<{ params: { desejoId: number } }> = useRoute()
  const desejoId = route.params?.desejoId
  const { listasDesejos } = useContext(ListaDesejosContext)

  const [lista, setLista] = useState<ListaDesejos | undefined>(
    {} as ListaDesejos,
  )

  const [urlImagem, setUrlImagem] = useState('')

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

  useEffect(() => {
    const listaDesejo = listasDesejos.find((lista) => lista.id === desejoId)
    setLista(listaDesejo)
  }, [listasDesejos, desejoId])

  return (
    <ScrollView>
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
              alt="Imagem do exercício"
              w="40"
              h={40}
              rounded="md"
              mb={4}
              resizeMode="center"
            />
          )}
        </Center>

        <Button title="Adicionar Desejo" />
      </VStack>
    </ScrollView>
  )
}
