import * as React from 'react';
import styled from 'styled-components/native';

import Text from '../../components/Text';
import { configService } from '../../services/_shared/config.service';
import { ConfigSettings, MonthNames } from '../../types/constants';
import { FontSize } from '../../types/enums';
import { rgba } from '../../utils/color.utils';
import { utils } from '../../utils/utils';

const Container = styled.View<any>`
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  border: 4px;
  height: 90px;
  width: 90px;
  padding: 4px;
  border-color: ${(props: any) =>
    props.overBudget ? props.theme.border.error : props.theme.border.success};
  background-color: ${(props: any) =>
    rgba(
      props.overBudget ? props.theme.border.error : props.theme.border.success,
      0.1,
    )};
`;

const StyledText = styled(Text).attrs((props: any) => ({
  color: props.overBudget ? props.theme.text.error : props.theme.text.success,
}))<{ overBudget: boolean }>``;

interface Props {
  total: number;
}

export default function MonthTotal({ total }: Props) {
  const month = MonthNames[new Date().getMonth()];
  const totalFormatted = utils.formatCurrency(total, true, true);
  const budget = +configService.getValue(ConfigSettings.monthlyBudget);
  const currencySymbol = configService.getValue(ConfigSettings.currencySymbol);

  const overBudget = budget > 0 && total > budget;

  return (
    <Container overBudget={overBudget}>
      <StyledText bold overBudget={overBudget} size={FontSize.Regular}>
        {currencySymbol}
      </StyledText>
      <StyledText
        overBudget={overBudget}
        bold
        size={totalFormatted.length > 8 ? FontSize.Regular : FontSize.Large}
      >
        {totalFormatted}
      </StyledText>
      <StyledText overBudget={overBudget} size={FontSize.Regular}>
        {month}
      </StyledText>
    </Container>
  );
}
