// MapaScreen.tsx com alertas da tela de Alertas

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Image, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/logo.png';

export default function MapaScreen() {
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const alertas = [
    {
      id: 1,
      titulo: 'Alerta Crítico',
      descricao: 'Zona Sul — Sensor: Sensor 01 — 13:45 — 2025-06-04',
      latlng: { latitude: -23.65, longitude: -46.64 },
      color: '#E53935',
    },
    {
      id: 2,
      titulo: 'Alerta de Atenção',
      descricao: 'Zona Norte — Sensor: Sensor 03 — 12:20 — 2025-06-04',
      latlng: { latitude: -23.49, longitude: -46.62 },
      color: '#FFC107',
    },
    {
      id: 3,
      titulo: 'Alerta Leve',
      descricao: 'Centro — Sensor: Sensor 05 — 10:30 — 2025-06-03',
      latlng: { latitude: -23.55, longitude: -46.63 },
      color: '#4CAF50',
    },
    {
      id: 4,
      titulo: 'Alerta Crítico',
      descricao: 'Zona Leste — Sensor: Sensor 07 — 09:15 — 2025-06-02',
      latlng: { latitude: -23.53, longitude: -46.60 },
      color: '#E53935',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55,
          longitude: -46.63,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        {alertas.map((l) => (
          <Marker
            key={l.id}
            coordinate={l.latlng}
            title={l.titulo}
            description={l.descricao}
            pinColor={l.color}
          />
        ))}
      </MapView>

      <View style={styles.tituloBox}>
        <Text style={styles.titulo}>🌍 Mapa de Monitoramento</Text>
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Alertas')}>
          <Ionicons name="alert-circle" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Alertas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
          <Ionicons name="map" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={logo} style={styles.logoIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Histórico')}>
          <Ionicons name="time" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
          <Ionicons name="settings" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  tituloBox: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    color: '#00BFFF',
    fontWeight: 'bold',
    backgroundColor: '#121212cc',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  menuText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    marginBottom: 4,
    resizeMode: 'contain',
  },
});
