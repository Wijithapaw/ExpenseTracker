import {} from 'styled-components';

import { Theme } from './src/types/theme.types';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
