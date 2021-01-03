import { ExpenseType } from '../data/entity-types';

export interface ExpenseDto {
  id: string;
  category: ExpenseType;
  subCategory?: ExpenseType;
  categoryDesc: string;
  subCategoryDesc?: string;
  amount: number;
  date: Date;
  description?: string;
  createdDate: Date;
}

export interface ExpenseCategoryMap {
  [id: string]: ExpenseType;
}

export interface MonthlySummary {
  [id: string]: number;
}

export interface CategorySummary {
  id: string;
  code: string;
  description: string;
  amount: number;
  percentage: number;
}
