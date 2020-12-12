import React from 'react';
import { Modal as ReactModal } from 'react-native';
import styled from 'styled-components/native';

import { COLORS } from '../types/colors';
import { FontSize } from '../types/enums';
import Gradient from './Gradient';
import IconButton from './IconButton';
import Text from './Text';

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  opacity: 1;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalArea = styled.View`
  background-color: ${COLORS.white};
  padding: 20px;
  opacity: 1;
  z-index: 100;
`;

const Title = styled.View`
  background-color: white;
  height: 40px;
`;

const TitleGradient = styled(Gradient)`
  flex-direction: row;
  padding: 5px 10px;
`;

const TitleText = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TitleButton = styled.View`
  justify-content: center;
  align-items: center;
  width: 30px;
`;

const CloseButton = styled(IconButton).attrs(() => ({
  name: 'times',
  size: 15,
}))`
  align-self: flex-end;
`;

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  children?: any;
  title?: string;
  transparent?: boolean;
}

export default function Modal({
  visible,
  children,
  title,
  onRequestClose,
  transparent = true,
}: Props) {
  return (
    <ReactModal
      animationType='slide'
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Overlay>
        <Title>
          <TitleGradient>
            <TitleButton />
            <TitleText>
              <Text bold size={FontSize.Increased} color={COLORS.white}>
                {title}
              </Text>
            </TitleText>
            <TitleButton>
              <CloseButton onPress={onRequestClose} />
            </TitleButton>
          </TitleGradient>
        </Title>
        <ModalArea>{children}</ModalArea>
      </Overlay>
    </ReactModal>
  );
}
