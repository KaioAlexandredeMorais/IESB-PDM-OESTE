import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TasksScreen() {
  return (
    <View style={styles.screen}>
      <Link href="/new-task" style={styles.link}>
        + Nova tarefa
      </Link>
      <Link href="/task/42" style={styles.link}>
        Abrir tarefa 42
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  link: { fontSize: 18, color: '#4757B8' },
});
