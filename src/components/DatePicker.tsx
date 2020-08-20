import * as React from 'react';
import RNDatePicker from 'react-native-datepicker';
import styled from 'styled-components/native';

interface Props {
  date?: Date;
  onChange?: (date: Date) => void;
}

const StyledDatePicker = styled(RNDatePicker).attrs((props: any)=> ({
  customStyles: {
    dateInput: {
      borderColor: props.theme.border.primary,
      borderRadius: 5,
      dateIcon: 'times'
    }
  }
}))``

export default function DatePicker({date, onChange}: Props) {
  return (
    <StyledDatePicker
      showIcon={false}
      style={{width: 'auto'}}
      date={date}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={(dateStr, date) => {
        onChange && onChange(date);
      }}
    />
  );
}
