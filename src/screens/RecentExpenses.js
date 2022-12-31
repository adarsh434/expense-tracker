import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useDispatch, useSelector} from 'react-redux';
import {getDateMinusDay} from '../util/date';
import {useEffect, useState} from 'react';
import {fetchExpenses} from '../util/http';
import {setExpense} from '../store/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expense = await fetchExpenses();
        dispatch(setExpense(expense));
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const myExpenses = useSelector(state => state.expenses.expenses);
  const recentExpenses = myExpenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
