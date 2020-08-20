import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import Icon from './Icon';

const MY_COMP_HIT_SLOP = {top: 5, left: 5, right: 5, bottom: 5};

const IconContainer = styled.TouchableOpacity<any>`
  border-radius: 50px;
  width: ${(props: Props) => props.size * 1.8}px;
  height: ${(props: Props) => props.size * 1.8}px;
  align-items: center;
  justify-content: center;
`;

interface Props {
  name: string;
  onPress?: (e: any) => void;
  size?: number;
  color?: string;
}

export default function IconButton({name, onPress, size, color}: Props) {
  const iconSize = size || 15;
  return (
    <IconContainer onPress={onPress} size={iconSize}>
      <Icon name={name} size={iconSize} color={color} />
    </IconContainer>
  );
}
