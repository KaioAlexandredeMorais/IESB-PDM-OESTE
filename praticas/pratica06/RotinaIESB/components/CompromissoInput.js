import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { PlaceholderInput, TextoBotao } from '../labels.js';

export default function CompromissoInput({ value, onChangeText, onAdd, categorias, categoriaSelecionada, onSelectCategoria }) {
  const [pressionado, setPressionado] = useState(false);

  return (
    <View style={styles.wrapper}>

      <View style={styles.linhaCategorias}>
        {categorias.map((categoria) => (
          <Pressable key={categoria} style={[styles.chip, categoriaSelecionada === categoria && styles.chipSelecionado]} onPress={() => onSelectCategoria(categoria)}>
            <Text style={[styles.chipTexto, categoriaSelecionada === categoria && styles.chipTextoSelecionado]}>{categoria}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.linhaInput}>
        <TextInput style={styles.input} placeholder={PlaceholderInput} value={value} onChangeText={onChangeText} />
        <Pressable style={[styles.botao, pressionado && styles.botaoPressionado]} android_ripple={{ color: '#aa232e' }} onPressIn={() => setPressionado(true)} onPressOut={() => setPressionado(false)} onPress={onAdd}>
          <Text style={styles.textoBotao}>{TextoBotao}</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  linhaCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  linhaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    width: '70%',
    borderWidth: 1.5,
    borderColor: '#ff4f4f',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    color: '#0D0D0D',
    backgroundColor: '#fff1f1',
  },
  botao: {
    flex: 1,
    backgroundColor: '#DA2A38',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: '#aa232e',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 13,
  },
});