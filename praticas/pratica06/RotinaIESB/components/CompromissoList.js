import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import { TextoLista } from '../labels.js';

function formatarData(dataIso) {
  const data = new Date(dataIso);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

export default function CompromissoList({ compromissos, onDelete, onToggle, mensagemListaVazia }) {
  return (
    <>
      <Text style={styles.tituloLista}>{TextoLista}</Text>

      <FlatList style={styles.lista} data={compromissos} keyExtractor={(compromisso) => compromisso.id} ListEmptyComponent={<Text style={styles.textoVazio}>{mensagemListaVazia}</Text>} renderItem={({ item }) => (

          <Pressable style={styles.itemLista} android_ripple={{ color: '#ff4f4f' }} onPress={() => onDelete(item.id)}>

            <Pressable style={[styles.checkbox, item.concluida && styles.checkboxMarcado]} onPress={() => onToggle(item.id)}>
                {item.concluida && <Text style={styles.checkboxTexto}>✓</Text>}
            </Pressable>

            <View style={styles.itemTextoContainer}>
              <Text style={[styles.textoItem, item.concluida && styles.textoConcluido]}>{item.texto}</Text>{item.categoria ? ( <Text style={styles.textoCategoria}>{item.categoria} • {formatarData(item.criadaEm)}</Text> ) : null}
            </View>

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
    color: '#DA2A38',
    marginBottom: 8,
    alignSelf: 'center',
  },
  lista: {
    flex: 1,
    backgroundColor: '#fff1f1',
    borderWidth: 1,
    borderColor: '#ff4f4f',
    borderRadius: 8,
    padding: 10,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#1a1a1a8c',
    marginTop: 12,
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ff4f4f',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#DA2A38',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxMarcado: {
    backgroundColor: '#DA2A38',
  },
  checkboxTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemTextoContainer: {
    flex: 1,
  },
  textoItem: {
    fontSize: 14,
    color: '#0D0D0D',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#0D0D0D',
  },
  textoCategoria: {
    fontSize: 11,
    color: '#1a1a1a8c',
    marginTop: 2,
  },
});