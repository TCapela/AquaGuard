import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AquaGuard</Text>
      <Text style={styles.subtitle}>Monitoramento inteligente de enchentes urbanas</Text>
      <Text style={styles.paragraph}>
        O AquaGuard é uma solução tecnológica desenvolvida para monitorar e prevenir os
        impactos de enchentes urbanas, utilizando sensores IoT, comunicação em tempo real e um aplicativo móvel de fácil uso para alertar a população e apoiar as autoridades.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Ver Alertas" onPress={() => navigation.navigate('Alertas')} />
        <Button title="Ver Mapa" onPress={() => navigation.navigate('Mapa')} />
        <Button title="Histórico" onPress={() => navigation.navigate('Histórico')} />
        <Button title="Configurações" onPress={() => navigation.navigate('Configurações')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  paragraph: { fontSize: 16, textAlign: 'justify', marginBottom: 30 },
  buttonContainer: { gap: 10 },
});