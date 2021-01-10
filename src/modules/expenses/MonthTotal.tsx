import * as React from 'react';
import styled from 'styled-components/native';

import Text from '../../components/Text';
import {
  GlobalContextType,
  withGlobalContext,
} from '../../store/GlobalContext';
import { ConfigSettings, MonthNames } from '../../types/constants';
import { FontSize, FontType } from '../../types/enums';
import { Theme } from '../../types/theme.types';
import { rgba } from '../../utils/color.utils';
import { utils } from '../../utils/utils';

const Container = styled.View<{ overBudget: boolean; theme: Theme }>`
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  border: 4px;
  height: 90px;
  width: 90px;
  padding: 4px;
  border-color: ${props =>
    props.overBudget ? props.theme.border.error : props.theme.border.success};
  background-color: ${props =>
    rgba(
      props.overBudget ? props.theme.border.error : props.theme.border.success,
      0.1,
    )};
`;

interface Props extends GlobalContextType {
  total: number;
}

function MonthTotal({ total, configSettings }: Props) {
  const month = MonthNames[new Date().getMonth()];

  const budget = +configSettings.get(ConfigSettings.monthlyBudget) || 0;
  const currencySymbol =
    configSettings.get(ConfigSettings.currencySymbol) || '';

  const totalFormatted = utils.formatCurrency(total, true);

  const overBudget = budget > 0 && total > budget;
  const fontType = overBudget ? FontType.Error : FontType.Success;

  return (
    <Container overBudget={overBudget}>
      <Text bold type={fontType} size={FontSize.Regular}>
        {currencySymbol}
      </Text>
      <Text
        type={fontType}
        bold
        size={totalFormatted.length > 8 ? FontSize.Regular : FontSize.Large}
      >
        {totalFormatted}
      </Text>
      <Text type={fontType} size={FontSize.Regular}>
        {month}
      </Text>
    </Container>
  );
}

export default withGlobalContext(MonthTotal);
