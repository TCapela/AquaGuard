import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import tiago from '../../assets/tiago.jpeg';
import rapha from '../../assets/rapha.png';

export default function ConfigScreen() {
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

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons name="people" size={60} color="#00BFFF" style={styles.icon} />
        <Text style={styles.title}>Quem Somos</Text>
        <Text style={styles.subtitle}>Conheça os desenvolvedores por trás do projeto AquaGuard</Text>

        <View style={styles.card}>
          <Image source={tiago} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.nome}>Tiago Ribeiro Capela</Text>
            <Text style={styles.rm}>RM: 558021</Text>
            <Text style={styles.desc}>Desenvolvedor Web e Mobile responsável pelas integrações com .NET, IoT e Quality Assurance.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={rapha} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.nome}>Raphaela Oliveira Tatto</Text>
            <Text style={styles.rm}>RM: 554983</Text>
            <Text style={styles.desc}>Responsável pelo desenvolvimento das estruturas de Java, .NET, Data Base e Cloud do projeto.</Text>
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
  container: { padding: 24, paddingBottom: 100 },
  icon: { alignSelf: 'center', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#00BFFF', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#ccc', textAlign: 'center', marginBottom: 20 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginRight: 16,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  rm: { fontSize: 13, color: '#00BFFF', marginBottom: 4 },
  desc: { color: '#ccc', fontSize: 13 },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: { width: 36, height: 36, marginBottom: 4, resizeMode: 'contain' },
});
