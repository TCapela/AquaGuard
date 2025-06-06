import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';

export default function HistoricoScreen() {
  const navigation = useNavigation<any>();

useFocusEffect(
  React.useCallback(() => {
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

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons name="time" size={60} color="#00BFFF" style={styles.icon} />
        <Text style={styles.title}>Histórico de Ocorrências</Text>
        <Text style={styles.subtitle}>Confira eventos passados registrados pelos sensores.</Text>

        {/* Evento 1 */}
        <View style={styles.card}>
          <Ionicons name="calendar" size={28} color="#4FC3F7" style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>12/04/2025 - Zona Leste</Text>
            <Text style={styles.cardText}>Chuva intensa com registro de alagamento em 3 pontos</Text>
          </View>
        </View>

        {/* Evento 2 */}
        <View style={styles.card}>
          <Ionicons name="calendar" size={28} color="#81C784" style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>05/03/2025 - Centro</Text>
            <Text style={styles.cardText}>Alerta preventivo emitido com antecedência</Text>
          </View>
        </View>

        {/* Evento 3 */}
        <View style={styles.card}>
          <Ionicons name="calendar" size={28} color="#E57373" style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>22/02/2025 - Zona Sul</Text>
            <Text style={styles.cardText}>Sensor falhou durante chuva forte - revisão realizada</Text>
          </View>
        </View>
      </ScrollView>

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
  container: {
    padding: 24,
    paddingBottom: 100,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00BFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#aaa',
    fontSize: 14,
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
