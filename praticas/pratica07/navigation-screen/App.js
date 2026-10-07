import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TodasDespesas from './screens/TodasDespesas';
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';


export default function App() {
  const Tab = createBottomTabNavigator();

  function BottomTabScreen() {
    return(
      <Tab.Navigator>
        <Tab.Screen name="Todas Despesas" component={TodasDespesas} />
        <Tab.Screen name="Despesas Recentes" component={DespesasRecentes} /> 
      </Tab.Navigator>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{headerShown:false}} />
        <Stack.Screen name="Gerenciar Despesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
