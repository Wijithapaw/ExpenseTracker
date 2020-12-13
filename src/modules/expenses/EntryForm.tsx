import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { GlobalContextType, withGlobalContext } from '../../../GlobalContext';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import TextInput from '../../components/TextInput';
import showToast, { ToastType } from '../../components/Toast';
import { expenseService } from '../../services/expense.service';
import { InputType } from '../../types/enums';
import { SimpleListItem } from '../../types/shared.types';
import { utils } from '../../utils/utils';
import CategorySelect from '../categories/CategorySelect';

const FormGroup = styled.View`
  padding: 5px 0;
`;

const DoubleCol = styled(FormGroup)`
  flex-direction: row;
`;

const FormCol = styled.View`
  flex: 1;
`;
const FormColSpace = styled.View`
  width: 10px;
`;

interface Props extends GlobalContextType {
  expenseId?: string;
  onSaved: () => void;
}

const EntryForm = ({ expenseId, onSaved }: Props) => {
  const [value, setValue] = useState<string>();
  const [category, setCategory] = useState<SimpleListItem>();
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState<string>();
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  useEffect(() => {
    if (expenseId) {
      const expense = expenseService.getExpense(expenseId);
      setValue(utils.formatNumber(expense.amount));
      const category: SimpleListItem = {
        id: expense.type.id,
        title: expense.type.displayText,
        parentTitle:
          expense.type.parentType && expense.type.parentType.displayText,
      };
      setCategory(category);
      setDate(expense.date);
      setDescription(expense.description);
    }
  }, []);

  const valueChange = (text: string) => {
    const sanitized = text.replace(/[^0-9][.]/g, '');
    setValue(sanitized);
  };

  const descriptionChange = (text: string) => {
    setDescription(text);
  };

  const save = () => {
    if (value && category) {
      if (expenseId) {
        expenseService.updateExpense(
          expenseId,
          parseFloat(value),
          category.id,
          date,
          description,
        );
        showToast('Expense updated');
      } else {
        expenseService.createExpense(
          parseFloat(value),
          category.id,
          date,
          description,
        );
        showToast('Expense added');
      }

      setValue(undefined);
      setCategory(undefined);
      setDescription(undefined);
      onSaved && onSaved();
    } else {
      const missingFields = [];
      if (!value) missingFields.push('Amount');
      if (!category) missingFields.push('Category');

      const allMissingFields = missingFields.join(' and ');

      showToast(
        `${allMissingFields} ${
          missingFields.length === 1 ? 'is' : 'are'
        } required`,
        ToastType.Error,
      );
    }
  };

  const onCategorySelect = (e: SimpleListItem) => {
    setCategory(e);
    setShowCategorySelect(false);
  };

  return (
    <View>
      <FormGroup>
        <TextInput
          value={value}
          onChangeText={valueChange}
          placeholder='Amount'
          textAlign={'center'}
          maxLength={12}
          type={InputType.Numeric}
        />
      </FormGroup>
      <DoubleCol>
        <FormCol>
          <Button
            outline
            title={
              category
                ? category.title +
                  ((category.parentTitle && ` (${category.parentTitle})`) || '')
                : 'Select Category'
            }
            onPress={() => setShowCategorySelect(true)}
          />
        </FormCol>
        <FormColSpace />
        <FormCol>
          <DatePicker date={date} onChange={setDate} />
        </FormCol>
      </DoubleCol>
      <FormGroup>
        <TextInput
          maxLength={50}
          value={description}
          placeholder='Description (optional)'
          onChangeText={descriptionChange}
          textAlign={'center'}
        />
      </FormGroup>
      <FormGroup>
        <Button title={expenseId ? 'Update' : 'Add'} onPress={save} />
      </FormGroup>
      <CategorySelect
        visible={showCategorySelect}
        onClose={() => setShowCategorySelect(false)}
        onSelect={onCategorySelect}
      />
    </View>
  );
};

export default withGlobalContext(EntryForm);
