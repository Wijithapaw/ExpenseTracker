import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

const StyledIcon = styled(FaIcon).attrs((props: any) => ({
  color: props.theme.button.primary,
}))``;

interface Props {
  name: string;
  size?: number;
}

export default function Icon({name, size}: Props) {
  const iconSize = size || 15;
  return (
      <StyledIcon name={name} size={iconSize} />
  );
}
