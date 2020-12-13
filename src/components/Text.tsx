import React from 'react';
import styled from 'styled-components/native';

import { FontSize, FontType } from '../types/enums';
import { Theme } from '../types/theme.types';
import { getFontSize } from '../utils/font.utils';

function getColorByType(type: FontType, theme: Theme) {
  switch (type) {
    case FontType.Primary:
      return theme.text.primary;
    case FontType.Error:
      return theme.text.error;
    case FontType.Secondary:
      return theme.text.secondary;
    case FontType.Success:
      return theme.text.success;
    default:
      return theme.text.primary;
  }
}

const StyledText = styled.Text`
    text-align-vertical: center;
    font-weight: ${(props: Props) => (props.bold ? 'bold' : 'normal')}
    font-size: ${(props: Props) => getFontSize(props.size)}px;
    color: ${(props: Props) =>
      props.color || getColorByType(props.type, props.theme)};
    font-style: ${(props: Props) => (props.italic ? 'italic' : 'normal')}
`;

interface Props {
  size?: FontSize;
  bold?: boolean;
  italic?: boolean;
  type?: FontType;
  children: string;
  color?: string;
  theme?: Theme;
}

export default function Text({
  children,
  size = FontSize.Regular,
  bold = false,
  italic,
  type = FontType.Primary,
  color,
}: Props) {
  return (
    <StyledText
      bold={bold}
      size={size}
      type={type}
      color={color}
      italic={italic}
    >
      {children}
    </StyledText>
  );
}
