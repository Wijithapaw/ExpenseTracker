import * as React from 'react';
import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {expenseService} from '../../services/expense.service';
import {SimpleListItem} from '../../types/shared.types';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import DatePicker from '../../components/DatePicker';
import CategorySelect from '../categories/CategorySelect';
import { InputType } from '../../types/enums';

interface Props {
  expenseId?: string;
  onSaved: () => void;
}

const EntryForm = ({expenseId, onSaved}: Props) => {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState<SimpleListItem>();
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState<string>();
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  useEffect(() => {
    if (expenseId) {
      let expense = expenseService.getExpense(expenseId);
      setValue(expense.amount);
      let category: SimpleListItem = {
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
    let sanitised = text.replace(/[^0-9][.]/g, '');

    let val = +sanitised;

    setValue(val);
  };

  const descriptionChange = (text: string) => {
    setDescription(text);
  };

  const save = () => {
    if (value > 0 && category) {
      if (expenseId)
        expenseService.updateExpense(
          expenseId,
          value,
          category.id,
          date,
          description,
        );
      else expenseService.createExpense(value, category.id, date, description);

      setValue(0);
      setCategory(undefined);
      setDescription(undefined);
      onSaved && onSaved();
    }
  };

  const onCategorySelect = (e: SimpleListItem) => {
    setCategory(e);
    setShowCategorySelect(false);
  };

  return (
    <View>
      <View
        style={{height: 50, alignContent: 'center', justifyContent: 'center'}}>
        <TextInput
          value={value > 0 ? value.toString() : undefined}
          onChangeText={valueChange}
          placeholder="Amount"
          type={InputType.Numeric}
          maxLength={12}
        />
      </View>
      <View style={{height: 50}}>
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
      </View>
      <View style={{height: 50}}>
        <DatePicker date={date} onChange={setDate} />
      </View>
      <View style={{height: 50}}>
        <TextInput
          maxLength={50}
          value={description}
          placeholder="Description (optional)"
          onChangeText={descriptionChange}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={{height: 50}}>
        <Button title="Save" onPress={save} icon="save" />
      </View>
      <CategorySelect
        visible={showCategorySelect}
        onClose={() => setShowCategorySelect(false)}
        onSelect={onCategorySelect}
      />
    </View>
  );
};

export default EntryForm;
