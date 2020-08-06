import { FontSize } from "../types/enums";

export function getFontSize(size: FontSize) {
    switch(size) {
        case FontSize.Small: return 12;
        case FontSize.Regular: return 14;
        case FontSize.Increased: return 16;
        case FontSize.Large: return 18;
        case FontSize.Huge: return 24;
        default: return 24;
    }
}