import React, { useContext, useEffect, useState } from 'react'
import { FlatList, VStack } from 'native-base'
import {
  ListaDesejos,
  ListaDesejosContext,
} from '../context/listaDesejosContext'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { DesejoCard } from '../components/DesejoCard'
import { Button } from '../components/Button'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { Header } from '../components/Header'

export function Lista() {
  const route: RouteProp<{ params: { listaId: number } }> = useRoute()
  const listaId = route.params?.listaId

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { listasDesejos } = useContext(ListaDesejosContext)

  const [lista, setLista] = useState<ListaDesejos | undefined>(
    {} as ListaDesejos,
  )

  function handleRedirecionarParaDesejos() {
    navigation.navigate('desejos', { listaId })
  }

  useEffect(() => {
    const listaDesejo = listasDesejos.find((lista) => lista.id === listaId)
    setLista(listaDesejo)
  }, [listasDesejos, listaId])

  return (
    <VStack flex={1}>
      <Header titulo={lista?.nome || ''} />
      <VStack px={4} pb={5} flex={1}>
        <FlatList
          data={lista?.desejos}
          keyExtractor={(desejo) => desejo.id.toString()}
          renderItem={(desejo) => (
            <DesejoCard
              listaId={listaId}
              desejoId={desejo.item.id}
              descricaoDesejo={desejo.item.descricao}
              valorDesejo={desejo.item.valor}
              urlImagem={desejo.item.urlImg}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />

        <Button title="Mais" onPress={handleRedirecionarParaDesejos} />
      </VStack>
    </VStack>
  )
}
