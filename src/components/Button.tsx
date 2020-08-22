import React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {COLORS} from '../types/colors';
import Gradient from './Gradient';

const StyledText = styled(Text).attrs((props: any) => ({
  color: props.outline ? props.theme.button.primary : COLORS.white,
}))<any>``;

const ButtonContainer = styled.TouchableOpacity<any>`
  border-color: ${(props: any) => props.theme.button.primary};
  border-width: ${(props: any) => (props.outline ? '2px' : 0)};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 35px;
  min-width: 100px;
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
      {outline ? (
        <StyledText outline={outline}>{title}</StyledText>
      ) : (
        <Gradient>
          <StyledText outline={outline}>{title}</StyledText>
        </Gradient>
      )}
    </ButtonContainer>
  );
}
