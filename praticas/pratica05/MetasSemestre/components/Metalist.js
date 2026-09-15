import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import { TextoLista, TextoRemover } from '../labels.js';

export default function MetaList({ metas, onDelete, onToggle }) {
  return (
    <>
      <Text style={styles.tituloLista}>{TextoLista}</Text>

      <FlatList style={styles.lista} data={metas} keyExtractor={(meta) => meta.id} renderItem={({ item }) => (

          <Pressable style={styles.itemLista} android_ripple={{ color: '#c7cfef' }} onPress={() => onToggle(item.id)}>

            <Text style={[styles.textoItem, item.concluida && styles.textoConcluido]}>{item.texto}</Text>

            <Pressable style={styles.botaoRemover} onPress={() => onDelete(item.id)}>
              <Text style={styles.textoRemover}>{TextoRemover}</Text>
            </Pressable>

          </Pressable>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#364277',
    marginBottom: 8,
    alignSelf: 'center',
  },
  lista: {
    flex: 1,
    backgroundColor: '#eef1fb',
    borderWidth: 1,
    borderColor: '#98a5dc',
    borderRadius: 8,
    padding: 10,
  },
  itemLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#98a5dc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  textoItem: {
    fontSize: 14,
    color: '#364277',
    flexShrink: 1,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#98a5dc',
  },
  botaoRemover: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textoRemover: {
    color: '#c0392b',
    fontSize: 12,
    fontWeight: 'bold',
  },
});