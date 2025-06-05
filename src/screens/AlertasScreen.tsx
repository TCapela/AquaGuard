import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlertasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas Atuais</Text>
      <Text style={styles.paragraph}>Aqui você encontra os alertas de enchentes em tempo real recebidos pelos sensores IoT instalados na cidade.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  paragraph: { fontSize: 16, textAlign: 'center' },
});
