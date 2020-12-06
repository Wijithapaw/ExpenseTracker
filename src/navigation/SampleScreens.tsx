import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export function SplashScreen() {
  return (
    <View>
      <Text>This is Splash</Text>
    </View>
  );
}
