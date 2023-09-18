import { StatusBar, LogBox } from 'react-native'
import { NativeBaseProvider, Text } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { THEME } from './src/theme'
import { useEffect } from 'react'
import { Routes } from './src/routes'
import { ListaDesejosProvider } from './src/context/listaDesejosContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  // ignorando erro
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ])
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ListaDesejosProvider>
        {fontsLoaded ? <Routes /> : <Text>Carregando...</Text>}
      </ListaDesejosProvider>
    </NativeBaseProvider>
  )
}
