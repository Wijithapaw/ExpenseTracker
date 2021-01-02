import React from 'react';
import styled from 'styled-components/native';

import { FontSize, FontType } from '../types/enums';
import { DateRange } from '../types/shared.types';
import { StyledProps } from '../types/theme.types';
import { brighten } from '../utils/color.utils';
import {
  DATE_FORMATS,
  formatDate,
  getBackwardMonthRange,
} from '../utils/date.utils';
import IconButton from './IconButton';
import Text from './Text';

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  background: ${(props: StyledProps) =>
    brighten(props.theme.background.secondary, 100)};
  border-radius: 5px;
`;

const Nav = styled.View`
  align-items: center;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {
  startDate: Date;
  endDate: Date;
  onChange: (range: DateRange) => void;
}

export default function MonthRange({ startDate, endDate, onChange }: Props) {
  const handleDateTraverse = (direction: 1 | -1) => {
    const ref = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    ref.setMonth(ref.getMonth() + direction);
    const range = getBackwardMonthRange(ref, 6);
    onChange(range);
  };

  return (
    <Container>
      <Nav>
        <IconButton
          name='chevron-left'
          onPress={() => handleDateTraverse(-1)}
        />
      </Nav>
      <Body>
        <Text type={FontType.Header} size={FontSize.Increased} bold>
          {`${formatDate(startDate, DATE_FORMATS.monthYear)} - ${formatDate(
            endDate,
            DATE_FORMATS.monthYear,
          )}`}
        </Text>
      </Body>
      <Nav>
        <IconButton
          name='chevron-right'
          onPress={() => handleDateTraverse(1)}
        />
      </Nav>
    </Container>
  );
}
