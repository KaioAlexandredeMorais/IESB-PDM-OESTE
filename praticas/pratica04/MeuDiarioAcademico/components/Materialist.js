import { StyleSheet, View, Text } from 'react-native';
import { TextoLista } from '../labels.js';

export default function Materialista({ disciplinas }) {
  return (
    <>
      <Text style={styles.tituloLista}>{TextoLista}</Text>
      <View style={styles.lista}>
        {disciplinas.map((materia, index) => (
          <View key={index} style={styles.itemLista}>
            <Text style={styles.textoItem}>{materia}</Text>
          </View>
        ))}
      </View>
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
  },
});