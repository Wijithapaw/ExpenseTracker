import { realmService, realm } from '../data/realm.service';
import { utils } from '../utils/utils';
import { Expense } from '../data/entity-types';
import { categoryService } from './category.service';
import { ExpenseDto } from '../types/expense.types';

export const expenseService = {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
  getExpenseSummary,
  getExpensesByDuration,
};
ß;

function getAllExpenses() {
  const vals = realmService.getRealm().objects<Expense>(Expense.schema.name);
  return vals;
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

  const expences = realm
    .objects<Expense>(Expense.schema.name)
    .filtered('date >= $0 AND date < $1', startDate, endDate)
    .map(e => ({
      category: e.type.parentType ? e.type.parentType : e.type,
      amount: e.amount,
    }));

  const uniqueCats = Array.from(new Set(expences.map(e => e.category.code)));

  const catSummary = uniqueCats.map(code => {
    const amount = expences
      .filter(e => e.category.code == code)
      .map(e => e.amount)
      .reduce((a, b) => a + b, 0);
    const name = expences.filter(e => e.category.code == code)[0].category
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
  const expences = realm
    .objects<Expense>(Expense.schema.name)
    .filtered('date >= $0 AND date < $1', startDate, endDate);
  return expences.map(
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
