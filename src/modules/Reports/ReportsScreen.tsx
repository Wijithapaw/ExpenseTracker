import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

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

export default function ReportScreen() {
  const [data, setData] = useState<ExpenseDto[]>();
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
      const expenses = expenseService.getExpensesByDuration(
        dateRange.startDate,
        dateRange.endDate,
      );
      setData(expenses);
    }
  }, [dateRange]);

  useEffect(() => {
    if (dateRange && data) {
      const month = new Date(dateRange.startDate);
      let monthlyTotal: MonthlySummary = {};

      while (month < dateRange.endDate) {
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 1);
        const total = data
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
  }, [data, dateRange]);

  useEffect(() => {
    if (selectedMonth && data && data.length) {
      const selectedMonthEnd = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1,
      );

      const monthlyData = data.filter(
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
      console.log(catSummary);
    }
  }, [data, selectedMonth]);

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
          listTitle='Expenses in Month'
          actions={listActions}
        />
      </Grid>
    </Container>
  );
}
