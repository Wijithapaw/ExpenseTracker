import * as React from 'react';
import {utils} from '../../utils/utils';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import {FontSize} from '../../types/enums';
import {MonthNames, ConfigSettings} from '../../types/constants';
import {configService} from '../../services/_shared/config.service';
import {rgba} from '../../utils/color.utils';

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
  color: props.orderBudger ? props.theme.text.error : props.theme.text.success,
}))<any>``;

interface Props {
  total: number;
}

export default function MonthTotal({total}: Props) {
  var month = MonthNames[new Date().getMonth()];
  var totalFormatted = utils.formatCurrency(total, true, true);
  var budget = +configService.getValue(ConfigSettings.monthlyBudget);
  var currencySymbol = configService.getValue(ConfigSettings.currencySymbol);

  const overBudget = budget > 0 && total > budget;

  return (
    <Container overBudget={overBudget}>
      <StyledText bold orderBudger={overBudget} size={FontSize.Regular}>
        {currencySymbol}
      </StyledText>
      <StyledText
        orderBudger={overBudget}
        bold
        size={totalFormatted.length > 8 ? FontSize.Regular : FontSize.Large}>
        {totalFormatted}
      </StyledText>
      <StyledText orderBudger={overBudget} size={FontSize.Regular}>
        {month}
      </StyledText>
    </Container>
  );
}
