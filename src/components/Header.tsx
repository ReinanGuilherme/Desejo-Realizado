import React from 'react'
import { Heading } from 'native-base'

interface Props {
  titulo: string
}

export function Header({ titulo }: Props) {
  return (
    <Heading
      color="white"
      textAlign="center"
      pt={16}
      pb={10}
      bg="gray.500"
      mb={5}
    >
      {titulo}
    </Heading>
  )
}
