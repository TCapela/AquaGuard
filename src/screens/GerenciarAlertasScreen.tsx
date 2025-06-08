import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import { Picker } from '@react-native-picker/picker';

export default function GerenciarAlertasScreen() {
  const navigation = useNavigation();
  const [alertas, setAlertas] = useState<any[]>([]);
  const [form, setForm] = useState({
    nivelRisco: 'ALTO',
    dsAlerta: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const api = 'http://192.168.80.84:5010/api/Alerta';

  const carregarAlertas = async () => {
    try {
      const { data } = await axios.get(api);
      setAlertas(data);
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    }
  };

  const salvarAlerta = async () => {
    try {
      const payload = {
        nivelRisco: form.nivelRisco.toUpperCase(),
        dsAlerta: `${form.dsAlerta} - ${form.logradouro}, ${form.numero}, ${form.bairro}, ${form.cidade}`,
        dtAlerta: new Date(),
        idRegiao: 1,
      };
      if (editingId) {
        await axios.put(`${api}/${editingId}`, {
          idAlerta: editingId,
          ...payload
        });

      } else {
        await axios.post(api, payload);
      }
      Alert.alert('Sucesso', 'Alerta salvo com sucesso!');
      setForm({ nivelRisco: 'ALTO', dsAlerta: '', logradouro: '', numero: '', bairro: '', cidade: '' });
      setEditingId(null);
      carregarAlertas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o alerta. Verifique a conexão ou os dados informados.');
      console.error('Erro ao salvar alerta:', error);
    }
  };

  const deletarAlerta = async (id: number) => {
    Alert.alert('Excluir', 'Deseja excluir este alerta?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: async () => {
          await axios.delete(`${api}/${id}`);
          carregarAlertas();
        },
      },
    ]);
  };

  const editar = (alerta: any) => {
  const partes = alerta.dsAlerta.split(' - ');
  const descricao = partes[0];
  const enderecoCompleto = partes[1] || '';
  const [logradouro = '', numero = '', bairro = '', cidade = ''] = enderecoCompleto.split(',').map(e => e.trim());

  setForm({
    nivelRisco: alerta.nivelRisco,
    dsAlerta: descricao,
    logradouro,
    numero,
    bairro,
    cidade,
  });

  setEditingId(alerta.idAlerta);
};


  useEffect(() => {
    carregarAlertas();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>🛠️ Gerenciar Alertas</Text>

        <Text style={styles.label}>Nível de Risco</Text>
        <Picker
          selectedValue={form.nivelRisco}
          onValueChange={(itemValue) => setForm({ ...form, nivelRisco: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Crítico" value="ALTO" />
          <Picker.Item label="Atenção" value="MEDIO" />
          <Picker.Item label="Leve" value="BAIXO" />
        </Picker>

        <TextInput style={styles.input} placeholder="Descrição do Alerta" value={form.dsAlerta} onChangeText={(t) => setForm({ ...form, dsAlerta: t })} />
        <TextInput style={styles.input} placeholder="Logradouro" value={form.logradouro} onChangeText={(t) => setForm({ ...form, logradouro: t })} />
        <TextInput style={styles.input} placeholder="Número" value={form.numero} onChangeText={(t) => setForm({ ...form, numero: t })} />
        <TextInput style={styles.input} placeholder="Bairro" value={form.bairro} onChangeText={(t) => setForm({ ...form, bairro: t })} />
        <TextInput style={styles.input} placeholder="Cidade" value={form.cidade} onChangeText={(t) => setForm({ ...form, cidade: t })} />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlerta}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.botaoTexto}>{editingId ? 'Atualizar' : 'Criar'} Alerta</Text>
        </TouchableOpacity>

        {alertas.map((a) => (
          <View key={a.idAlerta} style={styles.card}>
            <Text style={styles.cardTitulo}>{a.nivelRisco}</Text>
            <Text style={styles.cardTexto}>{a.dsAlerta}</Text>
            <Text style={styles.cardTexto}>📍 Região ID: {a.idRegiao}</Text>

            <View style={styles.cardAcoes}>
              <TouchableOpacity onPress={() => editar(a)}>
                <Ionicons name="pencil" size={20} color="#00BFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarAlerta(a.idAlerta)}>
                <Ionicons name="trash" size={20} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  container: { padding: 20 },
  titulo: { fontSize: 20, color: '#00BFFF', fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  label: { color: '#ccc', fontSize: 14, marginBottom: 4 },
  picker: {
    backgroundColor: '#1e1e1e', color: '#fff', marginBottom: 12, borderRadius: 6,
  },
  input: {
    backgroundColor: '#aaaaaa', color: '#fff', marginBottom: 12, padding: 10,
    borderRadius: 6, borderColor: '#333', borderWidth: 1,
  },
  botaoSalvar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#00BFFF', padding: 12, borderRadius: 6, marginBottom: 24,
  },
  botaoTexto: { color: '#fff', marginLeft: 6 },
  card: {
    backgroundColor: '#1e1e1e', padding: 16, borderRadius: 8, marginBottom: 12,
  },
  cardTitulo: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardTexto: { color: '#ccc', marginTop: 4 },
  cardAcoes: {
    flexDirection: 'row', gap: 12, marginTop: 8,
  },
  bottomMenu: {
    flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12,
    borderTopWidth: 1, borderColor: '#333', backgroundColor: '#1a1a1a',
  },
  menuText: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  logoIcon: {
    width: 36,
    height: 36,
    marginBottom: 4,
    resizeMode: 'contain',
  },
});
