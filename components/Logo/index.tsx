import { DimensionValue, Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { logoRect, logoSquare } from '@/assets/images'
import { ThemedView } from '../ui';
import { useNavigation } from '@react-navigation/native';

type LogoProps = {
 width?: DimensionValue;
 height?: DimensionValue;
}
export const DefaultLogo = ({ width = 182, height = 117 }: LogoProps) => {
 return (
  <View style={[styles.container, { width, height }]}>
   <Image resizeMode='contain' source={logoSquare} style={{ width: '100%', flex: 1 }} />
  </View>
 )
}

export const LandScapeLogo = ({ width, height }: LogoProps) => {
 const navigation = useNavigation();
 return (
  // <ThemedView>

  <Pressable onPress={() => navigation.navigate('Home')} style={[styles.container, { width, height }]}>
   <Image resizeMode='contain' source={logoRect} style={{ ...StyleSheet.absoluteFillObject }} />
  </Pressable>
  // </ThemedView>
 )
}


const styles = StyleSheet.create({
 container: {
  // width: 182,
  // height: 117,
  borderRadius: 20,
  // backgroundColor: 'red'
 }
})