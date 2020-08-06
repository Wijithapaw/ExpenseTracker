import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.button.primary};
  padding: 10px;
  align-items: center;
  border-radius: 5px;
`;

interface Props {
  title: string;
  onPress: () => void;
  icon?: string;
}

export default function Button({title, icon, onPress}: Props) {
  return (
    <ButtonContainer onPress={onPress}>
      <Text>{title}</Text>
    </ButtonContainer>
  );
}
