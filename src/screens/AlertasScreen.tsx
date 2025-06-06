// AlertasScreen.tsx - Lista dinâmica, com filtros e agrupamentos

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';

const alertasFake = [
  { id: '1', titulo: 'Alerta Crítico', local: 'Zona Sul', hora: '13:45', nivel: 'crítico', sensor: 'Sensor 01', data: '2025-06-04' },
  { id: '2', titulo: 'Alerta de Atenção', local: 'Zona Norte', hora: '12:20', nivel: 'atenção', sensor: 'Sensor 03', data: '2025-06-04' },
  { id: '3', titulo: 'Alerta Leve', local: 'Centro', hora: '10:30', nivel: 'leve', sensor: 'Sensor 05', data: '2025-06-03' },
  { id: '4', titulo: 'Alerta Crítico', local: 'Zona Leste', hora: '09:15', nivel: 'crítico', sensor: 'Sensor 07', data: '2025-06-02' },
];

export default function AlertasScreen() {
  const navigation = useNavigation<any>();
  const [filtro, setFiltro] = useState<'todos' | 'crítico' | 'atenção' | 'leve'>('todos');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const corNivel = {
    crítico: '#E53935',
    atenção: '#FFC107',
    leve: '#4CAF50',
  };

  const alertasFiltrados = filtro === 'todos'
    ? alertasFake
    : alertasFake.filter((a) => a.nivel === filtro);

  const renderItem = ({ item }: any) => (
    <View style={[styles.alertCard, { borderLeftColor: corNivel[item.nivel] }]}>
      <View style={styles.alertHeader}>
        <Ionicons name="warning" size={20} color={corNivel[item.nivel]} style={styles.icon} />
        <Text style={styles.alertTitle}>{item.titulo}</Text>
      </View>
      <Text style={styles.alertInfo}>📍 {item.local}</Text>
      <Text style={styles.alertInfo}>🕒 {item.hora} | Sensor: {item.sensor}</Text>
      <Text style={styles.alertInfo}>📅 {item.data}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.alertLink}>Ver no Mapa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.header}>🚨 Alertas Recentes</Text>
            <View style={styles.filtros}>
              {['todos', 'crítico', 'atenção', 'leve'].map((nivel) => (
                <TouchableOpacity key={nivel} onPress={() => setFiltro(nivel as any)} style={styles.filtroBtn}>
                  <Text style={{ color: filtro === nivel ? '#00BFFF' : '#ccc', fontSize: 12 }}>{nivel.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        data={alertasFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

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
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 12,
    marginTop: 24,
    marginHorizontal: 16,
  },
  list: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filtroBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 6,
  },
  alertCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  alertInfo: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  alertLink: {
    marginTop: 6,
    color: '#00BFFF',
    fontSize: 13,
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
