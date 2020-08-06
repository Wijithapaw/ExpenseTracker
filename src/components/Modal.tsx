import React from 'react';
import {Modal as ReactModal, View} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../types/colors';
import Text from './Text';
import {FontSize} from '../types/enums';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  children?: any;
  title?: string;
  transparent?: boolean;
}

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  opacity: 1;

`;

const ModalArea = styled.View`
  background-color: ${COLORS.white};
  padding: 20px;
  opacity: 1;
  z-index: 100;
`;

const Title = styled.View`
  background-color: ${(props: any) => props.theme.button.primary};
  align-items: center;
  padding: 5px;
`;

export default function Modal({
  visible,
  children,
  title,
  onRequestClose,
  transparent = true
}: Props) {
  return (
    <ReactModal
      animationType="slide"
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}>
      <Overlay>
        {title && (
          <Title>
            <Text bold size={FontSize.Increased} color={COLORS.white}>
              {title}
            </Text>
          </Title>
        )}
        <ModalArea>{children}</ModalArea>
      </Overlay>
    </ReactModal>
  );
}
