import { COLORS } from '../types/colors';
import { Theme } from '../types/theme.types';
import { rgba } from '../utils/color.utils';

export const LIGHT_THEME: Theme = {
  name: 'light',
  text: {
    primary: COLORS.black,
    error: COLORS.red,
    header: COLORS.linkedInBlue,
    secondary: COLORS.doveGray,
    success: COLORS.green,
  },
  button: {
    primary: COLORS.linkedInBlue,
    secondary: COLORS.shipGray,
  },

  background: {
    header: COLORS.linkedInBlue,
    primary: COLORS.white,
    secondary: COLORS.doveGray,
  },

  border: {
    primary: rgba(COLORS.doveGray, 0.8),
    secondary: rgba(COLORS.doveGray, 0.3),
    error: COLORS.red,
    success: COLORS.green,
  },
};
