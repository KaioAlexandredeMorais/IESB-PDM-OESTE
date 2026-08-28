import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import MetaList from './components/Metalist.js';
import MetaInput from './components/Metainput.js';

export default function App() {

  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    if (inputMeta.trim() === '') {
      alert('Digite uma meta válida!');
      return;
    }
    setMetas([...metas, inputMeta]);
  }
  
  return (
    <View style={styles.mainContainer}>
      
        <MetaInput onAddMeta={adicionarMetaHandler} />
      
      <View style={styles.metaContainer}>
          <MetaList array={metas} />
      </View>
    </View>
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

});
