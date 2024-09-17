import { StyleSheet, View as NativeView } from 'react-native'
import React from 'react'
import { View } from '@/components/Themed'
import { UiDefaults } from '@/constants/UiDefaults';

type ThemedProps = {
 children: React.ReactNode;
 noPadding?: boolean;
 transparent?: boolean;
}
const ThemedView = ({ style, noPadding = false, transparent = false, children, ...rest }: ThemedProps & NativeView['props']) => {
 return (
  <View style={[
   styles.container, style,
   noPadding && { paddingVertical: 0, paddingHorizontal: 0 },
   // bgColor && {backgroundColor: bgColor}
   transparent && { backgroundColor: 'transparent' }
  ]} {...rest}>
   {children}
  </View>
 )
}

export default ThemedView

const styles = StyleSheet.create({
 container: {
  width: '100%',
  paddingVertical: 10,
  paddingHorizontal: UiDefaults.viewPadding
 }
})