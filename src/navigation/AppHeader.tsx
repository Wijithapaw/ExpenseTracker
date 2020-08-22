import React from 'react';
import {View, Image} from 'react-native';
import Text from '../components/Text';
import styled from 'styled-components/native';
import {FontSize} from '../types/enums';

const HeaderContainer = styled.View`
  flex-direction: row;
`;

const HeaderText = styled.View`
  flex: 1;
  justify-content: center;
`;

const Title = styled(Text).attrs((props: any) => ({
    color: props.theme.button.primary,
    size: FontSize.Huge,
    bold: true,
}))``

const HeaderIcon = styled.View`
  padding-left: 5px;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`;

interface Props {
  title?: string;
}

export default function AppHeader({title}: Props) {
  return (
    <HeaderContainer>
      <HeaderText>
        <Title>{title || 'Expense Tracker'}</Title>
      </HeaderText>
      <HeaderIcon>
        <StyledImage source={require('../assets/images/logo.png')} />
      </HeaderIcon>
    </HeaderContainer>
  );
}
