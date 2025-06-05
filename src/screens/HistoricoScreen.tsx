import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Eventos</Text>
      <Text style={styles.paragraph}>Consulte registros anteriores de enchentes e alertas enviados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  paragraph: { fontSize: 16, textAlign: 'center' },
});
