import RNDatePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View } from 'react-native';

import { DATE_FORMATS, formatDate } from '../utils/date.utils';
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
        title={
          (date && formatDate(date, DATE_FORMATS.dateUniversal)) ||
          'Select Date'
        }
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
