import express from 'express';
import { addIncome, getIncomes, deleteIncome } from '../controllers/income.js';
import { addExpense, getExpenses, deleteExpense } from '../controllers/expense.js';

const router = express.Router();

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpenses)
      .delete('/delete-expense/:id', deleteExpense);

export default router;
