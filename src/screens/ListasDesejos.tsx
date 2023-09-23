import React, { useContext, useEffect, useState } from 'react'
import { FlatList, VStack } from 'native-base'
import { ListaDesejosContext } from '../context/listaDesejosContext'
import { ListaDesejosCard } from '../components/ListaDesejosCard'
import { Header } from '../components/Header'

export function ListasDesejos() {
  const { listasDesejos } = useContext(ListaDesejosContext)

  return (
    <VStack flex={1}>
      <Header titulo="Listas dos Desejos" />

      <FlatList
        data={listasDesejos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <ListaDesejosCard key={item.item.id} listaId={item.item.id} />
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
      />
    </VStack>
  )
}
