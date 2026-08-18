import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagens.js'

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
        <View style={{width: '65%'}}>
          <TextInput style={styles.inputText} placeholder={rotulo_input_meta} />
        </View>

        <View style={{width: '30%'}}>
          <Button title={rotulo_btn_cadastro_meta} />
        </View>
      </View>

      <View style={styles.metaContainer}>
        <Text style={styles.Text}>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaefff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },
  inputText: {
    borderColor: '#364277',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#364277',
    textAlign: 'center',
  },
  metaContainer: {
    flex: 1,
  },

});
