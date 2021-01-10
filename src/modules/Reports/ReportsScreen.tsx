import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { GlobalContextType, withGlobalContext } from '../../../GlobalContext';
import ListView, {
  ListAction,
  ListActionType,
  ListDataFormat,
  ListViewColumn,
} from '../../components/ListView';
import MonthRange from '../../components/MonthRange';
import Text from '../../components/Text';
import { categoryService } from '../../services/category.service';
import { expenseService } from '../../services/expense.service';
import { COLORS } from '../../types/colors';
import { ConfigSettings, MonthNames } from '../../types/constants';
import {
  CategorySummary,
  ExpenseCategoryMap,
  ExpenseDto,
  MonthlySummary,
} from '../../types/expense.types';
import { DateRange } from '../../types/shared.types';
import {
  DATE_FORMATS,
  formatDate,
  getBackwardMonthRange,
} from '../../utils/date.utils';
import { utils } from '../../utils/utils';
import ExpensesChart from './ExpensesChart';

const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const Range = styled.View``;

const Chart = styled.View`
  align-items: center;
  margin-top: 10px;
`;

const Grid = styled.View`
  flex: 1;
  margin-top: 10px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const HeaderCol = styled.View``;

const getCurrentMonth = (): Date => {
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return currentMonth;
};

interface Props extends GlobalContextType {
  navigation: any;
}

function ReportScreen({ refreshTrigger, navigation, configSettings }: Props) {
  const [expenses, setExpenses] = useState<ExpenseDto[]>();
  const [dateRange, setDateRange] = useState<DateRange>(
    getBackwardMonthRange(new Date(), 6),
  );
  const [selectedMonth, setSelectedMonth] = useState<Date>(getCurrentMonth());
  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>();
  const [categoryMap, setCategoryMap] = useState<ExpenseCategoryMap>();
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary>({});

  useEffect(() => {
    setCategoryMap(categoryService.getCategoryCodeMap());
  }, []);

  useEffect(() => {
    if (dateRange) {
      const expensesOfDuration = expenseService.getExpensesByDuration(
        dateRange.start,
        dateRange.end,
      );
      setExpenses(expensesOfDuration);
      setSelectedMonth(
        new Date(dateRange.end.getFullYear(), dateRange.end.getMonth(), 1),
      );
    }
  }, [dateRange, refreshTrigger]);

  useEffect(() => {
    if (dateRange && expenses) {
      const month = new Date(dateRange.start);
      let monthlyTotal: MonthlySummary = {};

      while (month < dateRange.end) {
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

      const catSummary = Array.from(catSummaryMap)
        .sort((a, b) => b[1] - a[1])
        .map(v => {
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
    } else {
      setCategorySummary([]);
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

  const handleDataPointClick = (index: number) => {
    const month = new Date(dateRange.start);
    month.setMonth(month.getMonth() + index);
    setSelectedMonth(month);
  };

  const handleViewCategory = (item: CategorySummary) => {
    navigation.navigate('DetailedExpenses', {
      expenseCode: item.code,
      month: selectedMonth,
      expenseDesc: item.description,
    });
  };

  const listActions: ListAction[] = [
    {
      action: ListActionType.View,
      onPress: handleViewCategory,
    },
  ];

  const MonthName = formatDate(selectedMonth, DATE_FORMATS.monthYear);

  const currencySymbol =
    configSettings.get(ConfigSettings.currencySymbol) || '';

  const getHeader = () => (
    <HeaderRow>
      <HeaderCol>
        <Text color={COLORS.white}>{MonthName}</Text>
      </HeaderCol>
      <HeaderCol>
        <Text color={COLORS.white}>
          {`Total: ${utils.formatCurrency(
            monthlySummary[MonthNames[selectedMonth.getMonth()]] || 0,
            true,
            currencySymbol,
          )}`}
        </Text>
      </HeaderCol>
    </HeaderRow>
  );

  return (
    <Container>
      <Range>
        {dateRange && (
          <MonthRange
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={setDateRange}
          />
        )}
      </Range>
      <Chart>
        {monthlyValues?.length && monthLabels?.length ? (
          <ExpensesChart
            labels={monthLabels}
            values={monthlyValues}
            onDataPointClick={handleDataPointClick}
          />
        ) : null}
      </Chart>
      <Grid>
        <ListView
          data={categorySummary}
          columns={columns}
          title={`${MonthName} | Total: ${utils.formatCurrency(
            monthlySummary[MonthNames[selectedMonth.getMonth()]] || 0,
            true,
          )}`}
          headerComponent={getHeader()}
          actions={listActions}
        />
      </Grid>
    </Container>
  );
}

export default withGlobalContext(ReportScreen);
