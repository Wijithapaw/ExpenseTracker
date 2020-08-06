import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  padding: 5px;
`;

interface Props {
  children: any;
}

export default function Screen({children}: Props) {
  return <StyledView>{children}</StyledView>;
}
