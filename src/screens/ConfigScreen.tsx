import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import logo from '../../assets/logo.png';

export default function ConfigScreen() {
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

  const [notificacoes, setNotificacoes] = React.useState(true);
  const [temaEscuro, setTemaEscuro] = React.useState(true);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons name="settings" size={60} color="#00BFFF" style={styles.icon} />
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>Personalize sua experiência com o AquaGuard</Text>

        {/* <View style={styles.setting}>
          <Ionicons name="notifications" size={24} color="#00BFFF" style={styles.settingIcon} />
          <Text style={styles.settingText}>Notificações</Text>
          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            thumbColor={notificacoes ? "#00BFFF" : "#ccc"}
          />
        </View>

        <View style={styles.setting}>
          <Ionicons name="moon" size={24} color="#00BFFF" style={styles.settingIcon} />
          <Text style={styles.settingText}>Tema Escuro</Text>
          <Switch
            value={temaEscuro}
            onValueChange={setTemaEscuro}
            thumbColor={temaEscuro ? "#00BFFF" : "#ccc"}
          />
        </View> */}

        {/* Simulando botão de sair */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="exit-outline" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
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
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
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
