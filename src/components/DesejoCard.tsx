import React from 'react'
import { Center, HStack, Image, Text, VStack } from 'native-base'

interface Props {
  listaId: number
  desejoId: string
  descricaoDesejo: string
  valorDesejo: number
  urlImagem: string
}

export function DesejoCard({
  listaId,
  desejoId,
  descricaoDesejo,
  valorDesejo,
  urlImagem,
}: Props) {
  return (
    <VStack mb={2}>
      {urlImagem && (
        <Image
          source={{
            uri: urlImagem,
          }}
          alt=""
          w="40"
          h={40}
          rounded="md"
          mb={2}
          resizeMode="center"
        />
      )}

      {!urlImagem && (
        <Center bg="white" w="40" h={40} rounded="md">
          <Text fontFamily="heading" color="gray.700">
            Adicionar Imagem
          </Text>
        </Center>
      )}

      <Text color="white" fontFamily="heading" fontSize="xl">
        {descricaoDesejo}
      </Text>

      <Text color="white">R$ {valorDesejo.toFixed(2)}</Text>
    </VStack>
  )
}
