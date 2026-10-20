import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../constants/Categorias';

function FiltroCategorias({ categoriaSelecionada, onSelecionar }) {
  const opcoes = ['', ...CATEGORIAS]; // '' representa "Todas"

  return (
    <View style={styles.container}>
      {opcoes.map((cat) => {
        const ativo = categoriaSelecionada === cat;
        return (
          <Pressable
            key={cat || 'todas'}
            onPress={() => onSelecionar(cat)}
            style={[styles.chip, ativo && styles.chipAtivo]}
          >
            <Text style={ativo && styles.chipTextoAtivo}>{cat || 'Todas'}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default FiltroCategorias;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  chipAtivo: { backgroundColor: '#3f51b5', borderColor: '#3f51b5' },
  chipTextoAtivo: { color: '#fff' },
});
