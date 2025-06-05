import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Monitoramento</Text>
      <Text style={styles.paragraph}>Visualize os pontos de monitoramento com dados em tempo real.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  paragraph: { fontSize: 16, textAlign: 'center' },
});
