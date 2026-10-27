import { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet, useColorScheme, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/Categorias';
import { getColors } from '../constants/theme';

function validate(values) {
  const errors = {};
  const amount = Number(String(values.amount).replace(',', '.'));
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  if (values.description.trim().length < 3)
    errors.description = 'Mínimo de 3 caracteres';
  if (isNaN(amount) || amount <= 0)
    errors.amount = 'Informe um valor maior que zero';
  if (values.date > endOfToday) errors.date = 'A data não pode ser futura';
  if (!values.category) errors.category = 'Escolha uma categoria';

  return errors;
}

function dateToInput(d) {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function Field({ label, error, styles, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function GerenciarDespesa({ navigation, route }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const styles = createStyles(colors);

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selected = expenses.find((e) => e.id === expenseId);

  const [form, setForm] = useState({
    description: selected?.description ?? '',
    amount: selected ? String(selected.amount) : '',
    date: selected?.date ?? new Date(),
    category: selected?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleChangeAmount(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowPicker(false);
    if (event.type !== 'dismissed' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function selectCategory(category) {
    handleChange('category', category);
    setIsPickerOpen(false);
  }

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      ...form,
      description: form.description.trim(),
      amount: parseFloat(String(form.amount).replace(',', '.')),
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);

    navigation.goBack();
  }

  function removeExpense() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  function confirmDelete() {
    if (Platform.OS === 'web') {
      if (window.confirm('Excluir despesa? Esta ação não pode ser desfeita.')) {
        removeExpense();
      }
      return;
    }

    Alert.alert('Excluir despesa', 'Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: removeExpense },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Field label="Descrição" error={errors.description} styles={styles}>
          <TextInput
            style={[styles.input, !!errors.description && styles.inputError]}
            maxLength={20}
            value={form.description}
            onChangeText={(t) => handleChange('description', t)}
          />
        </Field>

        <Field label="Valor (R$)" error={errors.amount} styles={styles}>
          <TextInput
            style={[styles.input, !!errors.amount && styles.inputError]}
            keyboardType="decimal-pad"
            value={form.amount}
            onChangeText={handleChangeAmount}
          />
        </Field>

        <Field label="Data" error={errors.date} styles={styles}>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={dateToInput(form.date)}
              onChange={(e) => {
                if (e.target.value) {
                  const [year, month, day] = e.target.value.split('-').map(Number);
                  handleChange('date', new Date(year, month - 1, day));
                }
              }}
              style={{
                border: `${errors.date ? 2 : 1}px solid ${
                  errors.date ? colors.error : colors.border
                }`,
                borderRadius: 6,
                padding: 10,
                backgroundColor: colors.inputBackground,
                color: colors.text,
                fontSize: 14,
              }}
            />
          ) : (
            <>
              <Pressable
                onPress={() => setShowPicker(true)}
                style={[styles.input, !!errors.date && styles.inputError]}
              >
                <Text style={styles.inputText}>
                  {form.date.toLocaleDateString('pt-BR')}
                </Text>
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  value={form.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}
        </Field>

        <Field label="Categoria" error={errors.category} styles={styles}>
          <Pressable
            onPress={() => setIsPickerOpen(true)}
            style={[styles.input, !!errors.category && styles.inputError]}
          >
            <Text style={form.category ? styles.inputText : styles.placeholder}>
              {form.category || 'Escolha a categoria'} ▾
            </Text>
          </Pressable>
        </Field>

        <View style={styles.buttons}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.buttonCancel]}
          >
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </Pressable>
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable onPress={confirmDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={isPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setIsPickerOpen(false)}>
          <View style={styles.sheet}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => selectCategory(category)}
                style={[
                  styles.option,
                  form.category === category && styles.optionActive,
                ]}
              >
                <Text style={styles.inputText}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default GerenciarDespesa;

function createStyles(colors) {
  return StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.background },
    container: { padding: 16 },
    field: { marginBottom: 16 },
    label: { fontWeight: 'bold', marginBottom: 4, color: colors.text },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      padding: 10,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    inputText: { color: colors.text },
    placeholder: { color: colors.mutedText },
    inputError: { borderColor: colors.error, borderWidth: 2 },
    errorText: { color: colors.error, fontSize: 12, marginTop: 4 },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      marginTop: 8,
    },
    button: {
      minWidth: 110,
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    buttonText: { color: colors.onPrimary, fontWeight: 'bold' },
    buttonCancel: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonCancelText: { color: colors.text },
    deleteButton: {
      marginTop: 16,
      padding: 12,
      borderRadius: 6,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.error,
    },
    deleteText: { color: colors.error, fontWeight: 'bold' },
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
      backgroundColor: colors.background,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    option: { padding: 14, borderRadius: 6 },
    optionActive: { backgroundColor: colors.card },
  });
}
