import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import axios from 'axios';

export default function AlertasScreen() {
  const navigation = useNavigation<any>();
  const [filtro, setFiltro] = useState<'todos' | 'crítico' | 'atenção' | 'leve'>('todos');
  const [alertas, setAlertas] = useState<any[]>([]);

  const api = 'http://192.168.80.84:5010/api/Alerta';

  const converterNivelRisco = (nivel: string) => {
    switch (nivel.toUpperCase()) {
      case 'ALTO': return 'crítico';
      case 'MEDIO': return 'atenção';
      case 'BAIXO': return 'leve';
      default: return nivel.toLowerCase();
    }
  };

  useEffect(() => {
    axios.get(api)
      .then((res) => setAlertas(res.data))
      .catch((err) => console.error('Erro ao carregar alertas', err));
  }, []);

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

  const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleDateString();
  };

  const formatarHora = (data: string) => {
    const d = new Date(data);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const alertasFiltrados = filtro === 'todos'
    ? alertas
    : alertas.filter((a) => converterNivelRisco(a.nivelRisco) === filtro);

  const renderItem = ({ item }: any) => {
    const nivel = converterNivelRisco(item.nivelRisco);
    return (
      <View style={[styles.alertCard, { borderLeftColor: corNivel[nivel] || '#ccc' }]}>
        <View style={styles.alertHeader}>
          <Ionicons name="warning" size={20} color={corNivel[nivel] || '#ccc'} style={styles.icon} />
          <Text style={styles.alertTitle}>{nivel.toUpperCase()}</Text>
        </View>
        <Text style={styles.alertInfo}>📍 Região ID: {item.idRegiao}</Text>
        <Text style={styles.alertInfo}>🕒 {formatarHora(item.dtAlerta)} | Código: {item.idAlerta}</Text>
        <Text style={styles.alertInfo}>📅 {formatarData(item.dtAlerta)}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
          <Text style={styles.alertLink}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
        keyExtractor={(item) => item.idAlerta.toString()}
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

        <TouchableOpacity onPress={() => navigation.navigate('Gerenciar')}>
          <Ionicons name="construct" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Gerenciar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Quem somos')}>
          <Ionicons name="people" size={24} color="#00BFFF" />
          <Text style={styles.menuText}>Nós</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#121212' },
  header: { fontSize: 20, fontWeight: 'bold', color: '#00BFFF', marginBottom: 12, marginTop: 24, marginHorizontal: 16 },
  list: { paddingBottom: 100, paddingHorizontal: 16 },
  filtros: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  filtroBtn: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#1e1e1e', borderRadius: 6 },
  alertCard: { backgroundColor: '#1e1e1e', borderRadius: 8, padding: 16, marginBottom: 12, borderLeftWidth: 5 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  icon: { marginRight: 8 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  alertInfo: { fontSize: 14, color: '#ccc', marginTop: 2 },
  alertLink: { marginTop: 6, color: '#00BFFF', fontSize: 13 },
  bottomMenu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1a1a1a' },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: { width: 36, height: 36, marginBottom: 4, resizeMode: 'contain' },
});
