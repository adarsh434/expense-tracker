import {createSlice} from '@reduxjs/toolkit';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-28'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e7',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-01'),
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
];

const allExpenses = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpense: (state, action) => {
      state.expenses = action.payload.reverse();
    },
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    updateExpense: (state, action) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        expense => expense.id === action.payload.id,
      );
      state.expenses[updatableExpenseIndex] = {
        id: action.payload.id,
        ...action.payload.data,
      };
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload.id,
      );
    },
  },
});

export const setExpense = allExpenses.actions.setExpense;
export const addExpense = allExpenses.actions.addExpense;
export const updateExpense = allExpenses.actions.updateExpense;
export const removeExpense = allExpenses.actions.removeExpense;
export default allExpenses.reducer;
