import { Expense } from '../data/entity-types';
import { realm, realmService } from '../data/realm.service';
import { ExpenseDto } from '../types/expense.types';
import { utils } from '../utils/utils';
import { categoryService } from './category.service';

export const expenseService = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
  getExpenseSummary,
  getExpensesByDuration,
};

function getAllExpenses() {
  const expenses = realmService
    .getRealm()
    .objects<Expense>(Expense.schema.name);
  return expenses;
}

function createExpense(
  amount: number,
  typeId: string,
  date: Date,
  description?: string,
) {
  realm.write(() => {
    const id = utils.uuid();
    const type = categoryService.getCategory(typeId);
    const now = new Date();

    realm.create(
      Expense.schema.name,
      new Expense(id, amount, date, now, type, description),
    );
  });
}

function updateExpense(
  id: string,
  amount: number,
  typeId: string,
  date: Date,
  description?: string,
) {
  realm.write(() => {
    const expense = realm
      .objects<Expense>(Expense.schema.name)
      .find(e => e.id == id);
    expense.amount = amount;
    expense.type = categoryService.getCategory(typeId);
    expense.date = date;
    expense.description = description;
  });
}

function getExpense(id: string) {
  const expense = realm
    .objects<Expense>(Expense.schema.name)
    .find(e => e.id == id);
  return expense;
}

function deleteExpense(id: string) {
  realm.write(() => {
    const item = realm
      .objects<Expense>(Expense.schema.name)
      .find(e => e.id == id);
    realm.delete(item);
  });
}

function getExpenseSummary(month: Date) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  console.log(startDate);
  console.log(endDate);

  const expenses = realm
    .objects<Expense>(Expense.schema.name)
    .filtered('date >= $0 AND date < $1', startDate, endDate)
    .map(e => ({
      category: e.type.parentType ? e.type.parentType : e.type,
      amount: e.amount,
    }));

  const uniqueCats = Array.from(new Set(expenses.map(e => e.category.code)));

  const catSummary = uniqueCats.map(code => {
    const amount = expenses
      .filter(e => e.category.code == code)
      .map(e => e.amount)
      .reduce((a, b) => a + b, 0);
    const name = expenses.filter(e => e.category.code == code)[0].category
      .displayText;
    return {
      amount,
      name,
      code,
    };
  });

  console.log(catSummary);

  return catSummary;
}

function getExpensesByDuration(startDate: Date, endDate: Date) {
  const expenses = realm
    .objects<Expense>(Expense.schema.name)
    .filtered('date >= $0 AND date < $1', startDate, endDate);
  return expenses.map(
    (e): ExpenseDto => ({
      id: e.id,
      date: e.date,
      amount: e.amount,
      description: e.description,
      category: e.type.parentType || e.type,
      subCategory: e.type.parentType ? e.type : undefined,
      createdDate: e.createdDate,
    }),
  );
}
