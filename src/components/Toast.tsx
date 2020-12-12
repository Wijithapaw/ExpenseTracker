import Toast from 'react-native-root-toast';

import { COLORS } from '../types/colors';

export enum ToastType {
  Default = 0,
  Error = 1,
}

export default function showToast(
  message: string,
  type: ToastType = ToastType.Default,
) {
  const toast = Toast.show(message, {
    // eslint-disable-next-line spellcheck/spell-checker
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: type == ToastType.Error ? COLORS.red : undefined,
  });

  return toast;
}
