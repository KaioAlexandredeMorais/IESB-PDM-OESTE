import { View, Text, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

function EmptyList() {
  const colors = getColors(useColorScheme());

  return (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={56} color={colors.mutedText} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Nenhuma despesa.
      </Text>
      <Text style={{ color: colors.mutedText }}>Toque em + para adicionar.</Text>
    </View>
  );
}

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem item={item} />}
      ListEmptyComponent={EmptyList}
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingTop: 48, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold' },
});
