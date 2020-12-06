import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { LIGHT_THEME } from './themes';

interface Props {
  children: any;
}

export default function ThemeProvider({ children }: Props) {
  return (
    <StyledThemeProvider theme={LIGHT_THEME}>{children}</StyledThemeProvider>
  );
}
