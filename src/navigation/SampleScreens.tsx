import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export function SettingsScreen() {
  return (
    <StyledView>
      <Text>This is Settings</Text>
    </StyledView>
  );
}

export function ReportsScreen() {
  return (
    <StyledView>
      <Text>This is Reports</Text>
    </StyledView>
  );
}

export function SplashScreen() {
  return (
    <View>
      <Text>This is Splash</Text>
    </View>
  );
}
