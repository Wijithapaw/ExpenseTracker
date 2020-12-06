import * as React from 'react';
import { Icons } from '../types/icons';
import IconButton from './IconButton';
import styled from 'styled-components/native';
import { COLORS } from '../types/colors';

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

export default function IconPicker({ onSelect, onHide }: Props) {
  return (
    <Container>
      {Icons.map(s => (
        <Cell key={s}>
          <IconButton
            name={s}
            size={25}
            onPress={() => onSelect(s)}
            color={COLORS.black}
          />
        </Cell>
      ))}
    </Container>
  );
}
