import React, { useEffect, useState } from 'react';
import Realm from 'realm';
import styled from 'styled-components/native';

import { GlobalContextType, withGlobalContext } from '../../../GlobalContext';
import ListView, {
  ListAction,
  ListActionType,
  ListDataFormat,
  ListViewColumn,
} from '../../components/ListView';
import Screen from '../../components/Screen';
import { Expense } from '../../data/entity-types';
import { messagingService } from '../../services/_shared/messaging.service';
import { expenseService } from '../../services/expense.service';
import EntryForm from './EntryForm';
import ExpenseEdit from './ExpenseEdit';
import MonthTotal from './MonthTotal';

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

function HomeScreen({ refreshCounter, refreshData }: GlobalContextType) {
  const [expenses, setExpenses] = useState<Realm.Results<Expense>>();
  const [editingExpenseId, setEditingExpenseId] = useState<string>();

  useEffect(() => {
    setExpenses(expenseService.getAllExpenses());
  }, [refreshCounter]);

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
          refreshData();
        });
      },
    },
  ];

  return (
    <Screen>
      <TotalSection>
        <MonthTotal total={getCurrentMonthTotal()} />
      </TotalSection>
      <EntrySection>
        <EntryForm />
      </EntrySection>
      <ListSection>
        <ListView
          data={last5Records}
          columns={columns}
          actions={listActions}
          listTitle='Last 5 Expenses'
        />
        <ExpenseEdit
          expenseId={editingExpenseId}
          onClose={() => setEditingExpenseId(undefined)}
          onSave={() => {
            setEditingExpenseId(undefined);
          }}
        />
      </ListSection>
    </Screen>
  );
}

export default withGlobalContext(HomeScreen);
