import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import MetaList from './components/Metalist.js';
import MetaInput from './components/Metainput.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    if (inputMeta.trim() === '') {
      alert('Digite uma meta válida!');
      return;
    }
    const novaMeta = { id: Math.random().toString(), texto: inputMeta };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    console.log(id);
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
            <Image source={require('./assets/shedinja.gif')} style={styles.image} resizeMode="contain"/>
            <MetaInput onAddMeta={adicionarMetaHandler} />
          
          <View style={styles.metaContainer}>
              <MetaList array={metas} onDeleteItem={deletarMetaHandler} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  metaContainer: {
    flex: 1,
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#98a5dc',
    borderColor: '#364277',
    borderWidth: 2,
    color: '#364277',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: '#364277',
    backgroundColor: '#eaefff',
  },
});
