import {
  ColorSchemeName,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';

export default function useAppTheme(): NonNullable<ColorSchemeName> {
  const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>;

  return colorScheme;
  return colorScheme == 'dark' ? 'light' : 'dark';
}
