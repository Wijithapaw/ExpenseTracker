import styled from 'styled-components/native';
import {darken} from '../utils/color.utils';
import LinearGradient from 'react-native-linear-gradient';

export default styled(LinearGradient).attrs((props: any) => ({
  colors: [
    darken(props.color || props.theme.button.primary, 60),
    props.color || props.theme.button.primary,
    20,
  ],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
}))<any>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
