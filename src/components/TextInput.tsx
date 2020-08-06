import React from 'react';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput<Props>`
  height: 30px;
  padding: 5px;
  border: 1px solid
    ${(props: any) =>
      props.invalid ? props.theme.border.error : props.theme.border.secondary};
`;

interface Props {
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  invalid?: boolean;
}

export default function TextInput({
  value,
  placeholder,
  maxLength,
  onChangeText,
  invalid,
}: Props) {
  return (
    <StyledTextInput
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChangeText={onChangeText}
      invalid={invalid}
    />
  );
}
