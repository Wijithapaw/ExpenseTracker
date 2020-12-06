import React, { useState } from 'react';
import RNDatePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import Button from './Button';

interface Props {
  date?: Date;
  onChange?: (date: Date) => void;
}

export default function DatePicker2({ date, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <Button
        title={(date && date.toLocaleDateString()) || 'Select Date'}
        outline
        onPress={() => setShow(true)}
      />
      {show && (
        <RNDatePicker
          value={date || new Date()}
          onChange={(e, dateSelected) => {
            setShow(false);
            dateSelected && onChange && onChange(dateSelected);
          }}
        />
      )}
    </View>
  );
}
