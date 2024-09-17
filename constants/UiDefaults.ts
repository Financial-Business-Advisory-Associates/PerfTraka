import { PixelRatio } from 'react-native';

export const UiDefaults = {
  viewPadding: 15,
};

const fontScale = PixelRatio.getFontScale();
export const getFontSize = (size: number) => size / fontScale;
