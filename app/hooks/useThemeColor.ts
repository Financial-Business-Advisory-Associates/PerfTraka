import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useAppTheme from './useAppTheme';
import { DefaultColors, IDangerColors } from '../constants/themes/Colors';
import { IColorStatus } from '../constants/themes/types/IColorTypes';

const colorsType = {
  default: DefaultColors,
  danger: IDangerColors,
};
export default function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof DefaultColors.dark & keyof typeof DefaultColors.light,
  colorStatus: keyof typeof IColorStatus = 'default'
) {
  const theme = useAppTheme();
  const colorFromProps = props[theme];
  const colorTheme = colorsType[colorStatus] ?? DefaultColors;
  return colorFromProps ? colorFromProps : colorTheme[theme][colorName];
}

const styles = StyleSheet.create({});
