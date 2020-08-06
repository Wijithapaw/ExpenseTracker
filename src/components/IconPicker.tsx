import * as React from 'react';
import {View} from 'react-native';
import {Icons} from '../types/icons';
import Icon from './Icon';
import styled from 'styled-components/native';

const Cell = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface Props {
  onSelect?: (icon: string) => void;
  onHide?: () => void;
}

export default function IconPicker({onSelect, onHide}: Props) {
  return (
    <Container>
      {Icons.map(s => (
        <Cell key={s}>
          <Icon name={s} size={25} onPress={() => onSelect(s)} />
        </Cell>
      ))}
    </Container>
  );
}
