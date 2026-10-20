import { useContext, useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/despesa/FiltroCategorias';
import { DespesasContext } from '../context/DespesasContext';
import { filtrarPorCategoria } from '../utils/filtros';

function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);

  return (
    <View style={{ flex: 1 }}>
      <FiltroCategorias
        categoriaSelecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida despesas={despesasFiltradas} periodo={'Total'} />
    </View>
  );
}

export default TodasDespesas;
