import React from 'react';
import { ThemedView } from '../ui';
import { ActivityIndicator, DimensionValue, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image'
import { defaultUser } from '@/assets/images';
type AvatarProps = {
  source: string;
  containerWidth?: DimensionValue;
  containerHeight?: DimensionValue;
  fit?: "contain" | "cover" | "fill" | "scale-down" | "none"
};

export const Avatar = ({ source, fit = "contain", containerHeight = 40, containerWidth = 40, ...rest }: AvatarProps & Image['props']) => {
  return (
    <View style={[styles.avatarCont, { width: containerWidth, height: containerHeight }]}>
      <Image contentFit={fit} style={{ width: '100%', flex: 1, borderRadius: 50 }} source={source} placeholder={defaultUser} {...rest} />
    </View>
  )
    ;
};

export default Avatar;

const styles = StyleSheet.create({
  avatarCont: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});
