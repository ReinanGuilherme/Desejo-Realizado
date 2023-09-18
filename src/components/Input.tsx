import React from 'react'
import { Input as InputNativeBase, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <InputNativeBase
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={1}
      borderColor="green.500"
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      {...rest}
    />
  )
}
