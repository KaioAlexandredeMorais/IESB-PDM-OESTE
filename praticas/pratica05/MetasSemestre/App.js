import { Titulo, MensagemMetaVazia, MensagemErroCarregar, MensagemErroSalvar } from './labels.js';
import { StyleSheet, Text, View, Image, Alert, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MetaInput from './components/Metainput.js';
import MetaList from './components/Metalist.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@metas_semestre';
function exibirAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export default function App() {
  const [inputMetaText, setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarApenasPendentes, setMostrarApenasPendentes] = useState(false);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        exibirAlerta('Erro', MensagemErroCarregar);
      } finally {
        setCarregando(false);
      }
    }
    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregando) return;
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(metas));
      } catch (erro) {
        exibirAlerta('Erro', MensagemErroSalvar);
      }
    }
    salvarMetas();
  }, [metas, carregando]);

  function adicionarMetaHandler() {

    const texto = inputMetaText.trim();
    if (texto === '') {
      exibirAlerta('Atenção', MensagemMetaVazia);
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((atual) => [...atual, novaMeta]);
    setInputMetaText('');

  }

  function removerMetaHandler(id) {
    setMetas((atual) => atual.filter((meta) => meta.id !== id));
  }

  function alternarConcluidaHandler(id) {
    setMetas((atual) =>
      atual.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.filter((meta) => meta.concluida).length;
  const metasExibidas = mostrarApenasPendentes ? metas.filter((meta) => !meta.concluida) : metas;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('./assets/pokemons/rayquaza-mega-shiny.gif')} style={styles.image} resizeMode="contain" />
          
          <Text style={styles.header}>{Titulo}</Text>
          <Text style={styles.contador}> {pendentes} pendentes / {concluidas} concluídas</Text>

          <MetaInput value={inputMetaText} onChangeText={setInputMetaText} onAdd={adicionarMetaHandler} />
          <MetaList metas={metasExibidas} onDelete={removerMetaHandler} onToggle={alternarConcluidaHandler} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#364277',
  },
  contador: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    color: '#6a76a8',
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#364277',
    backgroundColor: '#eaefff',
    marginBottom: 8,
  },
});