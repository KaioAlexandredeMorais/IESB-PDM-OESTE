import { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/despesa/FiltroCategorias';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { filtrarPorCategoria } from '../utils/filtros';
import { getColors } from '../constants/theme';

function TodasDespesas() {
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const filtered = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    return filtrarPorCategoria(expenses, categoryFilter).filter((e) =>
      e.description.toLowerCase().includes(term)
    );
  }, [expenses, debouncedQuery, categoryFilter]);

  const periodo = debouncedQuery.trim() || categoryFilter ? 'Resultado' : 'Total';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[
          styles.search,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
        placeholder="Buscar despesa..."
        placeholderTextColor={colors.mutedText}
        value={query}
        onChangeText={setQuery}
      />
      <FiltroCategorias
        categoriaSelecionada={categoryFilter}
        onSelecionar={setCategoryFilter}
      />
      <DespesaSaida despesas={filtered} periodo={periodo} />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    margin: 12,
  },
});
