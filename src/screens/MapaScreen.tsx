import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import logo from '../../assets/logo.png';

export default function MapaScreen() {
  const navigation = useNavigation<any>();
  const [alertas, setAlertas] = useState<any[]>([]);

  const api = 'http://192.168.80.84:5010/api/Alerta';

  useEffect(() => {
    axios.get(api)
      .then(res => setAlertas(res.data))
      .catch(err => console.error('Erro ao buscar alertas:', err));
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [])
  );

  const corNivel = {
    ALTO: '#E53935',
    MEDIO: '#FFC107',
    BAIXO: '#4CAF50',
  };

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55,
          longitude: -46.63,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        {alertas.map((a) => {
          // Evita marker vazio se não tiver região ou coordenadas
          if (!a.regiao || !a.regiao.latitude || !a.regiao.longitude) return null;

          return (
            <Marker
              key={a.idAlerta}
              coordinate={{
                latitude: parseFloat(a.regiao.latitude),
                longitude: parseFloat(a.regiao.longitude),
              }}
              title={`Alerta ${a.nivelRisco}`}
              description={a.dsAlerta}
              pinColor={corNivel[a.nivelRisco] || '#00BFFF'}
            />
          );
        })}
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
  wrapper: { flex: 1 },
  map: { flex: 1 },
  tituloBox: {
    position: 'absolute', top: 40, left: 0, right: 0, alignItems: 'center',
  },
  titulo: {
    fontSize: 18, color: '#00BFFF', fontWeight: 'bold',
    backgroundColor: '#121212cc', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 8,
  },
  bottomMenu: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1a1a1a',
  },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: { width: 36, height: 36, marginBottom: 4, resizeMode: 'contain' },
});
