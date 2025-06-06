import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AlertasScreen from '../screens/AlertasScreen';
import MapaScreen from '../screens/MapaScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'none',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alertas" component={AlertasScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
        <Stack.Screen name="Histórico" component={HistoricoScreen} />
        <Stack.Screen name="Configurações" component={ConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
