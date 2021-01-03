import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { GlobalContextType, withGlobalContext } from '../../../GlobalContext';
import ListView, {
  ListAction,
  ListActionType,
  ListDataFormat,
  ListViewColumn,
} from '../../components/ListView';
import Text from '../../components/Text';
import { messagingService } from '../../services/_shared/messaging.service';
import { expenseService } from '../../services/expense.service';
import { COLORS } from '../../types/colors';
import { ConfigSettings } from '../../types/constants';
import { ExpenseDto } from '../../types/expense.types';
import { DATE_FORMATS, formatDate } from '../../utils/date.utils';
import { utils } from '../../utils/utils';
import ExpenseEdit from '../expenses/ExpenseEdit';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const HeaderCol = styled.View``;

interface Props extends GlobalContextType {
  navigation: any;
  route: any;
}

function DetailedExpenses({
  route,
  refreshCounter,
  refreshData,
  configSettings,
}: Props) {
  const { expenseCode, month, expenseDesc } = route.params;
  const [expenses, setExpenses] = useState<ExpenseDto[]>();
  const [editingExpenseId, setEditingExpenseId] = useState<string>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);

    const data = expenseService.getExpensesByDuration(
      month,
      endDate,
      expenseCode,
    );
    setExpenses(data);

    const monthlyTotal = data.reduce((sum, cur) => sum + cur.amount, 0);
    setTotal(monthlyTotal);
  }, [refreshCounter]);

  const columns: ListViewColumn[] = [
    { field: 'date', format: ListDataFormat.Date },
    { field: 'subCategoryDesc' },
    { field: 'amount', format: ListDataFormat.Currency, textAlign: 'right' },
  ];

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

  const MonthName = formatDate(month, DATE_FORMATS.monthYear);

  const currencySymbol =
    configSettings.get(ConfigSettings.currencySymbol) || '';

  const getHeader = () => (
    <HeaderRow>
      <HeaderCol>
        <Text color={COLORS.white}>{MonthName}</Text>
      </HeaderCol>
      <HeaderCol>
        <Text color={COLORS.white}>{expenseDesc}</Text>
      </HeaderCol>
      <HeaderCol>
        <Text color={COLORS.white}>{`Total: ${utils.formatCurrency(
          total,
          true,
          currencySymbol,
        )}`}</Text>
      </HeaderCol>
    </HeaderRow>
  );

  return (
    <Container>
      <ListView
        data={expenses}
        columns={columns}
        title={`${MonthName} | Total: ${utils.formatCurrency(total, true)}`}
        headerComponent={getHeader()}
        actions={listActions}
      />
      <ExpenseEdit
        expenseId={editingExpenseId}
        onClose={() => setEditingExpenseId(undefined)}
        onSave={() => {
          setEditingExpenseId(undefined);
        }}
      />
    </Container>
  );
}

export default withGlobalContext(DetailedExpenses);
