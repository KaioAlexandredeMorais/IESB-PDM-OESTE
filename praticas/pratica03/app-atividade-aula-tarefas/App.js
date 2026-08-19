import { TextInput, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagens.js'
import { useState } from 'react';

export default function App() {

  const [inputMetaText  , setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  };

  function adicionarMetaHandler() {
    if (inputMetaText.trim() === '') {
      alert('Digite uma meta válida!');
      return;
    }
    setMetas([...metas, inputMetaText]);
  };
  
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '65%'}}>
          <TextInput onChangeText={metaInputHandler} style={styles.inputText} placeholder={rotulo_input_meta} />
        </View>

        <View style={{width: '30%'}}>
          <Button onPress={adicionarMetaHandler} title={rotulo_btn_cadastro_meta} />
        </View>
      </View>
      
      <View style={styles.metaContainer}>
        <View style={{width: 250, alignSelf: 'center'}}>
          <Text style={styles.Text}>{rotulo_lista_metas}</Text>
        </View>

        <ScrollView>
          {metas.map((meta, index) => <Text style={styles.item} key={index}>{meta}</Text>)}
        </ScrollView>
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
  inputText: {
    backgroundColor: '#eaefff',
    borderColor: '#364277',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontSize: 18,
    color: '#364277',
  },
  Text: {
    backgroundColor: '#364277',
    borderColor: '#29325b',
    borderWidth: 3,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    padding: 3,
    marginBottom: 10,
    marginTop: 20,
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
