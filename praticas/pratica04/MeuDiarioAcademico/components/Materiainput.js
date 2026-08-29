import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { placeholderInput, TextoBotao } from '../labels.js';

export default function Materiainput({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const [pressionado, setPressionado] = useState(false);

  function lidarComAdicionar() {
    const materia = texto.trim();
    if (materia === '') return;
    onAdicionar(materia);
    setTexto('');
  }

  return (
    <View style={styles.linhaInput}>
      <TextInput style={styles.input} placeholder={placeholderInput}
        value={texto} onChangeText={setTexto}
      />
      <Pressable style={[styles.botao, pressionado && styles.botaoPressionado]} onPressIn={() => setPressionado(true)}
        onPressOut={() => setPressionado(false)} onPress={lidarComAdicionar}
      >
        <Text style={styles.textoBotao}>{TextoBotao}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linhaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    width: '70%',
    borderWidth: 1.5,
    borderColor: '#98a5dc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    color: '#26305a',
    backgroundColor: '#eef1fb',
  },
  botao: {
    flex: 1,
    backgroundColor: '#364277',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: '#26305a',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});