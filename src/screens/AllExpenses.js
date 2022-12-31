import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useSelector} from 'react-redux';

function AllExpenses() {
  const myExpenses = useSelector(state => state.expenses.expenses);
  return (
    <ExpensesOutput
      expenses={myExpenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
