import React from 'react';
import styled from 'styled-components/native';

import { InputType } from '../types/enums';

const StyledTextInput = styled.TextInput<any>`
  height: 35px;
  padding: 5px;
  border: 1px solid
    ${(props: any) =>
      props.invalid ? props.theme.border.error : props.theme.border.primary};
  border-radius: 5px;
`;

interface Props {
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  invalid?: boolean;
  type?: InputType;
  textAlign?: 'center' | 'left' | 'right';
}

export default function TextInput({
  value,
  placeholder,
  maxLength,
  onChangeText,
  invalid,
  type = InputType.Default,
  textAlign = 'left',
}: Props) {
  let keyboardType = 'default';
  switch (type) {
    case InputType.Numeric:
      keyboardType = 'number-pad';
      break;
  }

  return (
    <StyledTextInput
      keyboardType={keyboardType}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChangeText={onChangeText}
      invalid={invalid}
      textAlign={textAlign}
    />
  );
}
