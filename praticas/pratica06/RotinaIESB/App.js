import { Titulo, MensagemVazia, MensagemErroCarregar, MensagemErroSalvar, TextoSwitch, MensagemListaVazia, CategoriaAula, CategoriaEstudo, CategoriaTrabalho, CategoriaAtividade, TextoFiltrarCategoria, TextoTodasCategorias } from './labels.js';
import { StyleSheet, Text, View, Image, Alert, Switch, Pressable, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import CompromissoList from './components/CompromissoList.js';
import CompromissoInput from './components/CompromissoInput.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';
const CATEGORIAS = [CategoriaAula, CategoriaEstudo, CategoriaTrabalho, CategoriaAtividade];

function exibirAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export default function App() {
  const [inputCompromissoText, setInputCompromissoText] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarApenasPendentes, setMostrarApenasPendentes] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(CATEGORIAS[0]);
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        exibirAlerta('Erro', MensagemErroCarregar);
      } finally {
        setCarregando(false);
      }
    }
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (carregando) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
      } catch (erro) {
        exibirAlerta('Erro', MensagemErroSalvar);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregando]);

  function adicionarCompromissoHandler() {

    const texto = inputCompromissoText.trim();
    if (texto === '') {
      exibirAlerta('Atenção', MensagemVazia);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto,
      criadaEm: new Date().toISOString(),
      concluida: false,
      categoria: categoriaSelecionada,
    };

    setCompromissos((atual) => [...atual, novoCompromisso]);
    setInputCompromissoText('');

  }

  function removerCompromissoHandler(id) {
    setCompromissos((atual) => atual.filter((compromisso) => compromisso.id !== id));
  }

  function alternarConcluidaHandler(id) {
    setCompromissos((atual) =>
      atual.map((compromisso) =>
        compromisso.id === id ? { ...compromisso, concluida: !compromisso.concluida } : compromisso
      )
    );
  }

  function selecionarFiltroCategoriaHandler(categoria) {
    setFiltroCategoria((atual) => (atual === categoria ? null : categoria));
  }

  const pendentes = compromissos.filter((compromisso) => !compromisso.concluida).length;
  const concluidas = compromissos.filter((compromisso) => compromisso.concluida).length;

  const compromissosExibidos = compromissos
    .filter((compromisso) => !mostrarApenasPendentes || !compromisso.concluida)
    .filter((compromisso) => !filtroCategoria || compromisso.categoria === filtroCategoria);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <View style={styles.cabecalho}>
            <Image source={require('./assets/iesb-icone.png')} style={styles.image} resizeMode="contain" />
            <View style={styles.cabecalhoTextos}>
              <Text style={styles.header}>{Titulo}</Text>
              <Text style={styles.contador}>{pendentes} pendentes / {concluidas} concluídas</Text>
            </View>
          </View>

          <CompromissoInput
            value={inputCompromissoText}
            onChangeText={setInputCompromissoText}
            onAdd={adicionarCompromissoHandler}
            categorias={CATEGORIAS}
            categoriaSelecionada={categoriaSelecionada}
            onSelectCategoria={setCategoriaSelecionada}
          />

          <View style={styles.linhaSwitch}>
            <Text style={styles.textoSwitch}>{TextoSwitch}</Text>
            <Switch value={mostrarApenasPendentes} onValueChange={setMostrarApenasPendentes} />
          </View>

          <View style={styles.linhaFiltroCategoria}>
            <Text style={styles.textoFiltro}>{TextoFiltrarCategoria}</Text>
            <View style={styles.chipsFiltro}>
              <Pressable
                style={[styles.chip, filtroCategoria === null && styles.chipSelecionado]}
                onPress={() => setFiltroCategoria(null)}
              >
                <Text style={[styles.chipTexto, filtroCategoria === null && styles.chipTextoSelecionado]}>{TextoTodasCategorias}</Text>
              </Pressable>
              {CATEGORIAS.map((categoria) => (
                <Pressable key={categoria} style={[styles.chip, filtroCategoria === categoria && styles.chipSelecionado]} onPress={() => selecionarFiltroCategoriaHandler(categoria)}>
                  <Text style={[styles.chipTexto, filtroCategoria === categoria && styles.chipTextoSelecionado]}>{categoria}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <CompromissoList compromissos={compromissosExibidos} onDelete={removerCompromissoHandler} onToggle={alternarConcluidaHandler} mensagemListaVazia={MensagemListaVazia} />
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
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  cabecalhoTextos: {
    marginLeft: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DA2A38',
  },
  contador: {
    fontSize: 13,
    color: '#1a1a1a8c',
    marginTop: 2,
  },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  textoSwitch: {
    fontSize: 14,
    color: '#1a1a1a8c',
  },
  linhaFiltroCategoria: {
    marginBottom: 12,
  },
  textoFiltro: {
    fontSize: 14,
    color: '#1a1a1a8c',
    marginBottom: 6,
  },
  chipsFiltro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4f4f',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelecionado: {
    backgroundColor: '#DA2A38',
  },
  chipTexto: {
    fontSize: 12,
    color: '#DA2A38',
  },
  chipTextoSelecionado: {
    color: '#fff',
  },
  image: {
    width: 55,
    height: 55,
  },
});