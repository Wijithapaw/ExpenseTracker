import * as React from 'react';
import {utils} from '../../utils/utils';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import {FontSize} from '../../types/enums';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

interface Props {
  total: number;
}

export default function MonthTotal({total}: Props) {
  return (
    <Container>
      <Text size={FontSize.Increased}>{utils.currencyFormat(total)}</Text>
      <Text size={FontSize.Increased}>[Month Total]</Text>
    </Container>
  );
}
