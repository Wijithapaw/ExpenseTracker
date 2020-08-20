import React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {COLORS} from '../types/colors';

const StyledText = styled(Text).attrs((props: any) => ({
  color: props.outline ? props.theme.button.primary : COLORS.white,
}))<any>``;

const ButtonContainer = styled.TouchableOpacity<any>`
  background-color: ${(props: any) =>
    props.outline ? COLORS.transparent : props.theme.button.primary};
  border-color: ${(props: any) => props.theme.button.primary};
  border-width: ${(props: any) => (props.outline ? '2px' : 0)};
  padding: ${(props: any) => (props.outline ? 8 : 10)}px;
  align-items: center;
  border-radius: 5px;
`;

interface Props {
  title: string;
  onPress: () => void;
  icon?: string;
  outline?: boolean;
}

export default function Button({title, icon, onPress, outline = false}: Props) {
  return (
    <ButtonContainer onPress={onPress} outline={outline}>
      <StyledText outline={outline}>{title}</StyledText>
    </ButtonContainer>
  );
}
