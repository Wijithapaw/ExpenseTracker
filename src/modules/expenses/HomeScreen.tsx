import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { expenseService } from '../../services/expense.service';
import * as Realm from 'realm';
import { Expense } from '../../data/entity-types';
import EntryForm from './EntryForm';
import { messagingService } from '../../services/_shared/messaging.service';
import Screen from '../../components/Screen';
import MonthTotal from './MonthTotal';
import ListView, {
  ListActionType,
  ListAction,
  ListViewColumn,
  ListDataFormat,
} from '../../components/ListView';
import ExpenseEdit from './ExpenseEdit';
import styled from 'styled-components/native';

const TotalSection = styled.View`
  padding: 5px 0;
  align-items: center;
`;

const EntrySection = styled.View`
  margin-bottom: 20px;
`;

const ListSection = styled.View`
  flex: 1;
  margin-bottom: 30px;
`;

const columns: ListViewColumn[] = [
  { field: 'date', format: ListDataFormat.Date },
  { field: 'category' },
  { field: 'amount', format: ListDataFormat.Currency, textAlign: 'right' },
];

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Realm.Results<Expense>>();
  const [refresh, toggleRefresh] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string>();

  // useEffect(() => {
  //   setExpenses(expenseService.getAllExpenses());
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setExpenses(expenseService.getAllExpenses());
    }, []),
  );

  const getCurrentMonthTotal = () => {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const total =
      (expenses && expenses.filtered('date >= $0', firstDay).sum('amount')) ||
      0;
    return total;
  };

  const last5Records =
    expenses &&
    expenses
      .sorted('createdDate', true)
      .slice(0, 5)
      .map((item: Expense) => ({
        category: item.type.displayText,
        amount: item.amount,
        date: item.date,
        id: item.id,
      }));

  const listActions: ListAction[] = [
    {
      action: ListActionType.Edit,
      onPress: (item: any) => {
        setEditingExpenseId(item.id);
      },
    },
    {
      action: ListActionType.Delete,
      onPress: (item: any) => {
        messagingService.confirm('Delete Record', 'Are you sure?', () => {
          expenseService.deleteExpense(item.id);
          refreshComponent();
        });
      },
    },
  ];

  const refreshComponent = () => toggleRefresh(!refresh);

  return (
    <Screen>
      <TotalSection>
        <MonthTotal total={getCurrentMonthTotal()} />
      </TotalSection>
      <EntrySection>
        <EntryForm onSaved={() => refreshComponent()} />
      </EntrySection>
      <ListSection>
        <ListView
          data={last5Records}
          columns={columns}
          actions={listActions}
          listTitle='Last 5 Expenses...'
        />
        <ExpenseEdit
          expenseId={editingExpenseId}
          onClose={() => setEditingExpenseId(undefined)}
          onSave={() => {
            refreshComponent();
            setEditingExpenseId(undefined);
          }}
        />
      </ListSection>
    </Screen>
  );
}
