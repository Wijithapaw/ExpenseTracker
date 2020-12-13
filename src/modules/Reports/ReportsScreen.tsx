import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { GlobalContextType, withGlobalContext } from '../../../GlobalContext';
import ListView, {
  ListAction,
  ListActionType,
  ListDataFormat,
  ListViewColumn,
} from '../../components/ListView';
import { categoryService } from '../../services/category.service';
import { expenseService } from '../../services/expense.service';
import { MonthNames } from '../../types/constants';
import {
  CategorySummary,
  ExpenseCategoryMap,
  ExpenseDto,
  MonthlySummary,
} from '../../types/expense.types';
import ExpensesChart from './ExpensesChart';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const Chart = styled.View`
  align-items: center;
`;

const Grid = styled.View`
  flex: 1;
  margin-top: 20px;
`;

function ReportScreen({ refreshCounter }: GlobalContextType) {
  const [expenses, setExpenses] = useState<ExpenseDto[]>();
  const [dateRange, setDateRange] = useState(undefined);
  const [selectedMonth, setSelectedMonth] = useState<Date>();
  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>();
  const [categoryMap, setCategoryMap] = useState<ExpenseCategoryMap>();
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary>({});

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    setSelectedMonth(currentMonth);
    setDateRange({ startDate, endDate });
    setCategoryMap(categoryService.getCategoryCodeMap());
  }, []);

  useEffect(() => {
    if (dateRange) {
      const expensesOfDuration = expenseService.getExpensesByDuration(
        dateRange.startDate,
        dateRange.endDate,
      );
      setExpenses(expensesOfDuration);
    }
  }, [dateRange, refreshCounter]);

  useEffect(() => {
    if (dateRange && expenses) {
      const month = new Date(dateRange.startDate);
      let monthlyTotal: MonthlySummary = {};

      while (month < dateRange.endDate) {
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 1);
        const total = expenses
          .filter(e => e.date >= month && e.date < monthEnd)
          .map(e => e.amount)
          .reduce((p, c) => p + c, 0);

        monthlyTotal = {
          ...monthlyTotal,
          [MonthNames[month.getMonth()]]: total,
        };

        month.setMonth(month.getMonth() + 1);
      }
      setMonthlySummary(monthlyTotal);
    }
  }, [expenses, dateRange]);

  useEffect(() => {
    if (selectedMonth && expenses && expenses.length) {
      const selectedMonthEnd = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1,
      );

      const monthlyData = expenses.filter(
        e => e.date >= selectedMonth && e.date < selectedMonthEnd,
      );

      const catSummaryMap = new Map<string, number>();

      let monthlyTotal = 0;

      for (const { category, amount } of monthlyData) {
        catSummaryMap.set(
          category.code,
          (catSummaryMap.get(category.code) || 0) + amount,
        );
        monthlyTotal += amount;
      }

      const catSummary = Array.from(catSummaryMap).map(v => {
        const [code, amount] = v;
        const cat = categoryMap[code];

        return {
          id: cat.id,
          code: code,
          description: cat.displayText,
          amount,
          percentage: Math.round((amount * 100) / monthlyTotal),
        };
      });
      setCategorySummary(catSummary);
    }
  }, [expenses, selectedMonth]);

  const monthLabels = Object.keys(monthlySummary);
  const monthlyValues = Object.values(monthlySummary);

  const columns: ListViewColumn[] = [
    { field: 'description' },
    {
      field: 'percentage',
      format: ListDataFormat.Percentage,
      textAlign: 'center',
    },
    { field: 'amount', format: ListDataFormat.Currency, textAlign: 'right' },
  ];

  const handleViewCategory = (item: CategorySummary) => {
    console.log(item);
  };

  const listActions: ListAction[] = [
    {
      action: ListActionType.View,
      onPress: handleViewCategory,
    },
  ];

  const MonthName = selectedMonth.toLocaleString('default', { month: 'long' });

  return (
    <Container>
      <Chart>
        {monthlyValues?.length && monthLabels?.length ? (
          <ExpensesChart labels={monthLabels} values={monthlyValues} />
        ) : null}
      </Chart>
      <Grid>
        <ListView
          data={categorySummary}
          columns={columns}
          listTitle={`Expenses in ${MonthName}`}
          actions={listActions}
        />
      </Grid>
    </Container>
  );
}

export default withGlobalContext(ReportScreen);
