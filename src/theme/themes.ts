import { Theme } from "../types/theme.types";
import { COLORS } from "../types/colors";
import { rgba } from "../utils/color.utils";

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
        primary: rgba(COLORS.doveGray, .8),
        secondary: rgba(COLORS.doveGray, .3),
        error: COLORS.red,
    }
}