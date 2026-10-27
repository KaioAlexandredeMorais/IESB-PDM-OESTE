import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { CATEGORIES } from '../../constants/Categorias';
import { getColors } from '../../constants/theme';

function FiltroCategorias({ categoriaSelecionada, onSelecionar }) {
  const colors = getColors(useColorScheme());
  const opcoes = ['', ...CATEGORIES];

  return (
    <View style={styles.container}>
      {opcoes.map((cat) => {
        const ativo = categoriaSelecionada === cat;
        return (
          <Pressable
            key={cat || 'todas'}
            onPress={() => onSelecionar(cat)}
            style={[
              styles.chip,
              {
                backgroundColor: ativo ? colors.primary : colors.inputBackground,
                borderColor: ativo ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={{ color: ativo ? colors.onPrimary : colors.text }}>
              {cat || 'Todas'}
            </Text>
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
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
