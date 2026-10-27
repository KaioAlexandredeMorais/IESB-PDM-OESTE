import { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/despesa/FiltroCategorias';
import { useExpenses } from '../store/expenses-context';
import { filtrarPorCategoria } from '../utils/filtros';
import { getColors } from '../constants/theme';

function filtrarUltimos7Dias(lista) {
  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);

  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
  seteDiasAtras.setHours(0, 0, 0, 0);

  return lista.filter((e) => e.date >= seteDiasAtras && e.date <= fimDeHoje);
}

function DespesasRecentes() {
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());
  const [categoryFilter, setCategoryFilter] = useState('');

  const recentes = filtrarPorCategoria(filtrarUltimos7Dias(expenses), categoryFilter);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FiltroCategorias
        categoriaSelecionada={categoryFilter}
        onSelecionar={setCategoryFilter}
      />
      <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
});
