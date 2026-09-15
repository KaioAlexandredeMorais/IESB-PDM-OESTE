import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { PlaceholderInput, TextoBotao } from '../labels.js';

export default function MetaInput({ value, onChangeText, onAdd }) {
  const [pressionado, setPressionado] = useState(false);

  return (
    <View style={styles.linhaInput}>
      <TextInput style={styles.input} placeholder={PlaceholderInput} value={value} onChangeText={onChangeText} />
      <Pressable style={[styles.botao, pressionado && styles.botaoPressionado]} android_ripple={{ color: '#26305a' }}
        onPressIn={() => setPressionado(true)}
        onPressOut={() => setPressionado(false)}
        onPress={onAdd}
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