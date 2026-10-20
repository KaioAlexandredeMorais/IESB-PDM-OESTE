import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../context/DespesasContext';
import { CATEGORIAS } from '../constants/Categorias';

function GerenciarDespesa() {
  const navigation = useNavigation();
  const { adicionarDespesa } = useContext(DespesasContext);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  function onChange(event, selectedDate) {
    setShowPicker(false);
    if (event.type !== 'dismissed' && selectedDate) {
      setData(selectedDate);
    }
  }

  function handleChangeValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  const formularioValido =
    descricao.trim() !== '' && valor !== '' && Number(valor) > 0 && categoria !== '';

  function handleSalvar() {
    if (!formularioValido) {
      Alert.alert('Atenção', 'Preencha descrição, valor e categoria.');
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: Number(valor),
      categoria,
      data,
    };

    adicionarDespesa(novaDespesa);
    navigation.goBack();
  }

  function dataParaInput(d) {
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategoria(cat)}
              style={[styles.categoria, categoria === cat && styles.categoriaAtiva]}
            >
              <Text style={categoria === cat && styles.categoriaTextoAtivo}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>

        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={dataParaInput(data)}
            onChange={(e) => {
              if (e.target.value) {
                const [ano, mes, dia] = e.target.value.split('-').map(Number);
                setData(new Date(ano, mes - 1, dia));
              }
            }}
            style={{
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 10,
              backgroundColor: '#fff',
              fontSize: 14,
            }}
          />
        ) : (
          <>
            <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
              <Text>{data.toLocaleDateString('pt-BR')}</Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker value={data} mode="date" display="default" onChange={onChange} />
            )}
          </>
        )}
      </View>

      <View style={styles.botoes}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.botao, styles.botaoCancelar]}
        >
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={handleSalvar}
          style={[styles.botao, !formularioValido && styles.botaoDesabilitado]}
        >
          <Text style={styles.botaoTexto}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputContainer: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoria: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  categoriaAtiva: { backgroundColor: '#3f51b5', borderColor: '#3f51b5' },
  categoriaTextoAtivo: { color: '#fff' },
  botoes: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 8 },
  botao: {
    minWidth: 110,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  botaoCancelar: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' },
  botaoCancelarTexto: { color: '#333' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  botaoDesabilitado: { opacity: 0.5 },
});
