import { Platform } from 'react-native'
import { useTheme } from 'native-base'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { Inicio } from '../screens/Inicio'

import InicioSvg from '../assets/inicio.svg'
import DesejoSvg from '../assets/desejo.svg'
import { ListasDesejos } from '../screens/ListasDesejos'
import { AdicionarDesejo } from '../screens/AdicionarDesejo'
import { Lista } from '../screens/Lista'

type AppRoutes = {
  inicio: undefined
  desejos: { listaId: number }
  listasDesejos: undefined
  lista: { listaId: number }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()
  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="inicio"
        component={Inicio}
        options={{
          tabBarIcon: ({ color }) => (
            <InicioSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="listasDesejos"
        component={ListasDesejos}
        options={{
          tabBarIcon: ({ color }) => (
            <DesejoSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="lista"
        component={Lista}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="desejos"
        component={AdicionarDesejo}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
