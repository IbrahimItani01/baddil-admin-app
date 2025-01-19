import { createSlice } from '@reduxjs/toolkit';

// Enums
export enum ExpenseType {
  SALARY = 'salary',
  BROKER_COMPENSATION = 'broker_compensation',
  OTHER = 'other',
}

// Interfaces
export interface Expense {
  id: string;
  created_at: Date;
  updated_at: Date;
  amount: number;
  date: Date;
  description: string;
  expense_type: ExpenseType;
}

interface ExpensesState {
  expensesData: Expense[];
}

// Initial State
const initialState: ExpensesState = {
  expensesData: [],
};

// Slice
const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpensesData(state, action: { payload: Expense[] }) {
      state.expensesData = action.payload;
    },
    addExpense(state, action: { payload: Expense }) {
      state.expensesData.push(action.payload);
    },
    deleteExpense(state, action: { payload: string }) {
      state.expensesData = state.expensesData.filter(expense => expense.id !== action.payload);
    },
    editExpense(state, action: { payload: { id: string; updatedExpense: Partial<Expense> } }) {
      const { id, updatedExpense } = action.payload;
      const index = state.expensesData.findIndex(expense => expense.id === id);
      if (index !== -1) {
        state.expensesData[index] = {
          ...state.expensesData[index],
          ...updatedExpense,
        };
      }
    },
  },
});

// Export Actions and Reducer
export const { setExpensesData, addExpense, deleteExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
