import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { titulo } from './labels.js';
import Materiainput from './components/Materiainput.js'; 
import Materialista from './components/Materialist.js';

export default function App() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [mostrarObrigatorias, setMostrarObrigatorias] = useState(false);

  function adicionarDisciplina(materia) {
    setDisciplinas((atual) => [...atual, materia]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>{titulo}</Text>

          <Materiainput onAdicionar={adicionarDisciplina} />

          <View style={styles.linhaSwitch}>
            <Text style={styles.textoSwitch}>Mostrar apenas obrigatórias</Text>
            <Switch value={mostrarObrigatorias} onValueChange={setMostrarObrigatorias} />
          </View>

          <Materialista disciplinas={disciplinas} />
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
    marginBottom: 16,
    color: '#364277',
  },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textoSwitch: {
    fontSize: 14,
    color: '#364277',
  },
});