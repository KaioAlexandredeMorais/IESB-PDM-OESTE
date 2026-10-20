import { useContext, useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/despesa/FiltroCategorias';
import { DespesasContext } from '../context/DespesasContext';
import { filtrarPorCategoria } from '../utils/filtros';

function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  function filtrarUltimos7Dias(lista) {
    const fimDeHoje = new Date();
    fimDeHoje.setHours(23, 59, 59, 999);

    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    seteDiasAtras.setHours(0, 0, 0, 0);

    return lista.filter((d) => d.data >= seteDiasAtras && d.data <= fimDeHoje);
  }

  const despesasFiltradas = filtrarPorCategoria(filtrarUltimos7Dias(despesas), categoriaFiltro);

  return (
    <View style={{ flex: 1 }}>
      <FiltroCategorias
        categoriaSelecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida despesas={despesasFiltradas} periodo={'Últimos 7 dias'} />
    </View>
  );
}

export default DespesasRecentes;
