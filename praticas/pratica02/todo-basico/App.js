import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Programação para Dispositivos Móveis</Text>
      <Text>Olá, Kaio Alexandre!</Text>
      <Text>Meu segundo passo com Expo e React Native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2fdff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
