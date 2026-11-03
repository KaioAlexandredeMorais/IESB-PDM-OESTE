import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, addExpense } = useExpenses();

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  function shareSummary() {
    Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
  }

  function addSample() {
    addExpense({
      description: 'Exemplo',
      amount: 12.5,
      category: 'Outros',
      date: new Date(),
    });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={shareSummary} />
      <Button title="Adicionar despesa de exemplo" onPress={addSample} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  label: { fontSize: 16 },
  total: { fontSize: 32, fontWeight: 'bold' },
});
