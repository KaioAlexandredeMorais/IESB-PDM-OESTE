import { View, Text, StyleSheet } from 'react-native';

const LIMITE = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text>{periodo}</Text>
      <Text style={somaDespesas > LIMITE && styles.valorAlto}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, paddingTop: 4 },
  valorAlto: { color: 'red' },
});
