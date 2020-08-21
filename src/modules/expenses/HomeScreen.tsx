import * as React from 'react';
import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {expenseService} from '../../services/expense.service';
import * as Realm from 'realm';
import {Expense} from '../../data/entity-types';
import EntryForm from './EntryForm';
import {messagingService} from '../../services/_shared/messaging.service';
import Screen from '../../components/Screen';
import MonthTotal from './MonthTotal';
import ListView, {
  ListActionType,
  ListAction,
  ListViewColumn,
  ListDataFormat,
} from '../../components/ListView';
import ExpenseEdit from './ExpenseEdit';

const columns: ListViewColumn[] = [
  {field: 'date', format: ListDataFormat.Date},
  {field: 'category'},
  {field: 'amount', format: ListDataFormat.Currency, textAlign: 'right'},
];

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Realm.Results<Expense>>();
  const [refresh, toggleRefresh] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string>();

  useEffect(() => {
    setExpenses(expenseService.getAllExpenses());
  }, []);

  const getCurrentMonthTotal = () => {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var total =
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
        setEditingExpenseId(item.id)
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
      <View
        style={{
          height: 40,
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MonthTotal total={getCurrentMonthTotal()} />
      </View>
      <View style={{paddingBottom: 20}}>
        <EntryForm onSaved={() => refreshComponent()} />
      </View>
      <View style={{flex: 1}}>
        <ListView
          data={last5Records}
          columns={columns}
          actions={listActions}
          listTitle="Last 5 Expenses..."
        />
        <ExpenseEdit expenseId={editingExpenseId} onClose={() => setEditingExpenseId(undefined)}
        onSave={() => { refreshComponent(); setEditingExpenseId(undefined); }} />
      </View>
    </Screen>
  );
}
