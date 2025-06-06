// HomeScreen.tsx reorganizado com ordem lógica e didática

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [horarioAtual, setHorarioAtual] = useState('');
  const [sensores, setSensores] = useState(12);
  const [alertas, setAlertas] = useState(2);
  const [temperatura, setTemperatura] = useState('');
  const [descricaoTempo, setDescricaoTempo] = useState('');

  const atualizarInfos = () => {
    const hora = new Date().toLocaleTimeString();
    setHorarioAtual(hora);
    setSensores(Math.floor(Math.random() * 10) + 10);
    setAlertas(Math.floor(Math.random() * 3));
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

        {/* Previsão do Tempo */}
        <Text style={styles.section}>🌦️ Previsão do Tempo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{temperatura} - {descricaoTempo}</Text>
          <Text style={styles.infoText}>Local: São Paulo/SP</Text>
        </View>

        {/* Status Rápido */}
        <View style={styles.quickStatus}>
          <View style={styles.statusItem}>
            <Ionicons name="hardware-chip" size={28} color="#4CAF50" />
            <Text style={styles.statusText}>{sensores} sensores</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="alert" size={28} color="#FFC107" />
            <Text style={styles.statusText}>{alertas} alertas</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time" size={28} color="#29B6F6" />
            <Text style={styles.statusText}>Atualizado {horarioAtual}</Text>
          </View>
        </View>

        {/* Monitoramento por Zona */}
        <Text style={styles.section}>🗺️ Monitoramento por Zona</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Zona Norte: ⚠️ Atenção</Text>
          <Text style={styles.infoText}>Centro: ✅ Normal</Text>
          <Text style={styles.infoText}>Zona Sul: 🔴 Crítico</Text>
        </View>

        {/* Regiões com mais alertas */}
        <Text style={styles.section}>🏆 Regiões com Mais Alertas</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>1. Zona Leste - 5 alertas</Text>
          <Text style={styles.infoText}>2. Vila Mariana - 3 alertas</Text>
          <Text style={styles.infoText}>3. Santana - 2 alertas</Text>
        </View>

        {/* Último alerta */}
        <Text style={styles.section}>🔔 Último Alerta</Text>
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Alerta de Alagamento</Text>
          <Text style={styles.alertText}>Sensor 07 na Zona Leste detectou nível crítico às 14:12</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Alertas')}>
            <Text style={styles.link}>Ver todos os alertas</Text>
          </TouchableOpacity>
        </View>

        {/* Status geral */}
        <Text style={styles.section}>📊 Status Geral</Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusLevel}>🟡 Estado de Atenção</Text>
          <Text style={styles.statusLegend}>Algumas regiões com risco moderado de alagamento</Text>
        </View>

        {/* Dica do dia */}
        <Text style={styles.section}>💡 Dica do Dia</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            Em caso de alagamento, evite áreas subterrâneas e procure abrigo em locais elevados.
          </Text>
        </View>

        {/* Emergência */}
        <TouchableOpacity style={styles.emergencyBox}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.emergencyText}>Precisa de ajuda? Saiba o que fazer em situações de emergência.</Text>
        </TouchableOpacity>

        {/* Notícias locais */}
        <Text style={styles.section}>📰 Notícias Locais</Text>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>🌧️ Nova estação na ZN</Text>
          <Text style={styles.newsText}>A prefeitura inaugurou sensores no bairro do Mandaqui.</Text>
        </View>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>📈 Chuvas superam média</Text>
          <Text style={styles.newsText}>Aumento de 32% no volume acumulado este mês.</Text>
        </View>

        {/* Chamada para ação */}
        <Text style={styles.section}>📣 Colabore com o Projeto</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Nos envie feedback ou registre locais afetados para ajudar a comunidade.
          </Text>
        </View>

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
  wrapper: { flex: 1, backgroundColor: '#121212' },
  container: { padding: 24, paddingBottom: 100 },
  icon: { alignSelf: 'center', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00BFFF', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#ccc', textAlign: 'center', marginBottom: 20 },
  section: { fontSize: 16, color: '#00BFFF', fontWeight: 'bold', marginTop: 20, marginBottom: 6 },
  reloadBtn: {
    flexDirection: 'row', alignSelf: 'center', alignItems: 'center', gap: 6, marginBottom: 20,
  },
  reloadText: { color: '#00BFFF', fontSize: 14 },
  quickStatus: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16,
  },
  statusItem: { alignItems: 'center' },
  statusText: { color: '#ccc', fontSize: 12, marginTop: 4 },
  alertCard: {
    backgroundColor: '#1e1e1e', borderRadius: 8, padding: 16, marginBottom: 12,
  },
  alertTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  alertText: { color: '#aaa', marginTop: 4, marginBottom: 8 },
  link: { color: '#00BFFF', fontSize: 13 },
  statusBox: {
    backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8,
  },
  statusLevel: { color: '#FFC107', fontWeight: 'bold', fontSize: 16 },
  statusLegend: { color: '#ccc', fontSize: 13, marginTop: 4 },
  tipBox: {
    backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8,
  },
  tipText: { color: '#ccc', fontSize: 14 },
  emergencyBox: {
    backgroundColor: '#E53935', padding: 14, borderRadius: 8, marginTop: 20,
    flexDirection: 'row', gap: 10, alignItems: 'center',
  },
  emergencyText: {
    color: '#fff', fontWeight: 'bold', fontSize: 14, flexShrink: 1,
  },
  newsCard: {
    backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8, marginBottom: 12,
  },
  newsTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  newsText: { color: '#aaa', fontSize: 13, marginTop: 4 },
  infoBox: {
    backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8, marginBottom: 12,
  },
  infoText: {
    color: '#ccc', fontSize: 14, marginBottom: 4,
  },
  footer: { marginTop: 32, color: '#666', fontSize: 12, textAlign: 'center' },
  bottomMenu: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1a1a1a',
  },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: {
    width: 36, height: 36, marginBottom: 4, resizeMode: 'contain',
  },
  logoImage: {
    width: 200, height: 200, alignSelf: 'center', marginBottom: 10,
  },
});
