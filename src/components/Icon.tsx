import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const StyledIcon = styled(FaIcon).attrs((props: any) => ({
  color: props.color || props.theme.button.primary,
}))``;

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({name, size, color}: Props) {
  const iconSize = size || 18;
  return (
      <StyledIcon name={name} size={iconSize} color={color} />
  );
}
