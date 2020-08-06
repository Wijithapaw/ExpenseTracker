import { Theme } from "../types/theme.types";
import { COLORS } from "../types/colors";

export const LIGHT_THEME: Theme = {
    name: 'light',
    text: {
        primary: COLORS.black,
        error: COLORS.red,
        header: COLORS.white,
        secondary: COLORS.doveGray,
    },
    button: {
        primary: COLORS.linkedInBlue,
        secondary: COLORS.shipGray,
    },

    background: {
        header: COLORS.linkedInBlue,
        primary: COLORS.white,
        secondary: COLORS.white,
    },

    border: {
        primary: COLORS.doveGray,
        secondary: COLORS.shipGray,
        error: COLORS.red,
    }
}