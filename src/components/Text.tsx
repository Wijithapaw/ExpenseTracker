import React from 'react';
import styled from 'styled-components/native';
import {FontSize, FontType} from '../types/enums';
import {getFontSize} from '../utills/font.utills';
import {Theme} from '../types/theme.types';

const StyledText = styled.Text`
    padding: 5px;
    text-align-vertical: center;
    font-weight: ${(props: Props) => (props.bold ? 'bold' : 'normal')}
    font-size: ${(props: Props) => getFontSize(props.size)}px;
    color: ${(props: Props) => props.color || props.theme.text.primary};
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
      italic={italic}>
      {children}
    </StyledText>
  );
}
