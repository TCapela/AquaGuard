import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.paragraph}>Ajuste preferências do app, como idioma, temas e notificações.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  paragraph: { fontSize: 16, textAlign: 'center' },
});
