import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpensesContext = createContext(null);

const STORAGE_KEY = '@expenses';

function expensesReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return [{ id: Date.now().toString(), ...payload }, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === payload.id ? { ...item, ...payload.data } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== payload);
    case 'SET':
      return payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const saved = JSON.parse(json).map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          dispatch({ type: 'SET', payload: saved });
        }
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const addExpense = (data) => dispatch({ type: 'ADD', payload: data });
  const updateExpense = (id, data) =>
    dispatch({ type: 'UPDATE', payload: { id, data } });
  const deleteExpense = (id) => dispatch({ type: 'DELETE', payload: id });

  const value = { expenses, addExpense, updateExpense, deleteExpense };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  return ctx;
}
