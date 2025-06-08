import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import axios from 'axios';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [horarioAtual, setHorarioAtual] = useState('');
  const [alertas, setAlertas] = useState(0);
  const [temperatura, setTemperatura] = useState('');
  const [descricaoTempo, setDescricaoTempo] = useState('');

  const atualizarInfos = async () => {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHorarioAtual(hora);

    try {
      const res = await axios.get('http://192.168.80.84:5010/api/Alerta');
      setAlertas(res.data.length);
    } catch {
      setAlertas(0);
    }

    buscarPrevisao();
  };

  const buscarPrevisao = async () => {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true');
      const data = await response.json();
      setTemperatura(`${Math.round(data.current_weather.temperature)}°C`);
      setDescricaoTempo(data.current_weather.weathercode === 0 ? 'Céu limpo' : 'Instável');
    } catch (error) {
      setTemperatura('Erro');
      setDescricaoTempo('Não foi possível carregar');
    }
  };
  
  useEffect(() => {
    atualizarInfos();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/logo2.png')} style={styles.logoImage} />
        <Text style={styles.subtitle}>Monitoramento inteligente de enchentes urbanas</Text>

        <TouchableOpacity onPress={atualizarInfos} style={styles.reloadBtn}>
          <Ionicons name="refresh" size={18} color="#00BFFF" />
          <Text style={styles.reloadText}>Atualizar dados</Text>
        </TouchableOpacity>

        <Text style={styles.section}>🌦️ Previsão do Tempo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{temperatura} - {descricaoTempo}</Text>
          <Text style={styles.infoText}>Local: São Paulo/SP</Text>
        </View>

        <View style={styles.quickStatus}>
          <View style={styles.statusItem}>
            <Ionicons name="alert" size={28} color="#FFC107" />
            <Text style={styles.statusText}>{alertas} alertas</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time" size={28} color="#29B6F6" />
            <Text style={styles.statusText}>Atualizado {horarioAtual}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.emergencyBox}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.emergencyText}>Precisa de ajuda? Saiba o que fazer em situações de emergência.</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Projeto acadêmico - RM 558021 / RM 554983</Text>
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
  subtitle: { fontSize: 14, color: '#ccc', textAlign: 'center', marginBottom: 20 },
  section: { fontSize: 16, color: '#00BFFF', fontWeight: 'bold', marginTop: 20, marginBottom: 6 },
  reloadBtn: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', gap: 6, marginBottom: 20 },
  reloadText: { color: '#00BFFF', fontSize: 14 },
  quickStatus: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  statusItem: { alignItems: 'center' },
  statusText: { color: '#ccc', fontSize: 12, marginTop: 4 },
  infoBox: { backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8, marginBottom: 12 },
  infoText: { color: '#ccc', fontSize: 14, marginBottom: 4 },
  emergencyBox: {
    backgroundColor: '#E53935', padding: 14, borderRadius: 8, marginTop: 20,
    flexDirection: 'row', gap: 10, alignItems: 'center',
  },
  emergencyText: { color: '#fff', fontWeight: 'bold', fontSize: 14, flexShrink: 1 },
  footer: { marginTop: 32, color: '#666', fontSize: 12, textAlign: 'center' },
  bottomMenu: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1a1a1a',
  },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: { width: 36, height: 36, marginBottom: 4, resizeMode: 'contain' },
  logoImage: { width: 200, height: 200, alignSelf: 'center', marginBottom: 10 },
});
