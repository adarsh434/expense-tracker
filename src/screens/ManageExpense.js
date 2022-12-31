import {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';

import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {GlobalStyles} from '../config/styles';
import {addExpense, removeExpense, updateExpense} from '../store/expenses';
import {storeExpense, updateExpenses, deleteExpenses} from '../util/http';

function ManageExpense({route, navigation}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const myExpenses = useSelector(state => state.expenses.expenses);
  const dispatch = useDispatch();

  const selectedExpense = myExpenses.find(
    expense => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpenses(editedExpenseId);
      dispatch(removeExpense({id: editedExpenseId}));
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(
          updateExpense({
            id: editedExpenseId,
            data: expenseData,
          }),
        );
        await updateExpenses(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        dispatch(addExpense({id: id, ...expenseData}));
      }
    } catch (error) {
      setError('Could not update the expense');
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
