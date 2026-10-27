import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

const LIMITE = 200;

function DespesaSumario({ despesas, periodo }) {
  const colors = getColors(useColorScheme());

  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + item.amount;
  }, 0);

  const quantidade = despesas.length;

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.mutedText }}>
        {periodo} · {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
      </Text>
      <Text
        style={[
          styles.total,
          { color: somaDespesas > LIMITE ? colors.error : colors.text },
        ]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8 },
  total: { fontSize: 22, fontWeight: 'bold' },
});
