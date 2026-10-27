import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColors } from '../../constants/theme';

function getDataFormatada(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

function DespesaItem({ item }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: item.id });
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>{getDataFormatada(item.date)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>{item.description}</Text>
          <View style={[styles.tag, { backgroundColor: colors.background }]}>
            <Text style={[styles.tagTexto, { color: colors.text }]}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.itemText}>
          <Text style={{ color: colors.text }}>R$ {item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
      default: { boxShadow: '0px 2px 6px rgba(0,0,0,0.15)' },
    }),
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginHorizontal: 2,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  tagTexto: { fontSize: 12 },
});
