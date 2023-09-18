import React from 'react'
import { Text, VStack } from 'native-base'
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack'

type Props = IVStackProps & {
  titulo: string
  totalDesejos: number
}

export function ListaDesejosCard({ titulo, totalDesejos }: Props) {
  return (
    <VStack h="125px" w="full" bg="gray.500" mb={2} p={4} rounded="md">
      <Text
        color="white"
        fontSize="2xl"
        textAlign="center"
        fontFamily="heading"
        textTransform="capitalize"
      >
        {titulo}
      </Text>
      <Text color="white">Total de desejos: {totalDesejos}</Text>
      <Text color="white">Valor da lista: R$ {totalDesejos}</Text>
    </VStack>
  )
}
