import React from 'react';
import styled from 'styled-components/native';

import { COLORS } from '../types/colors';
import { StyledProps } from '../types/theme.types';
import Text from './Text';

const StyledText = styled(Text).attrs((props: any) => ({
  color: props.outline ? props.theme.button.primary : COLORS.white,
}))<{ outline: boolean }>``;

const ButtonContainer = styled.TouchableOpacity<any>`
  border-color: ${(props: StyledProps) => props.theme.button.primary};
  border-width: ${(props: any) => (props.outline ? '2px' : 0)};
  background: ${(props: any) =>
    props.outline ? COLORS.transparent : props.theme.button.primary};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 35px;
  min-width: 100px;
`;

interface Props {
  title: string;
  onPress: () => void;
  outline?: boolean;
}

export default function Button({ title, onPress, outline = false }: Props) {
  return (
    <ButtonContainer onPress={onPress} outline={outline}>
      <StyledText outline={outline}>{title}</StyledText>
    </ButtonContainer>
  );
}
