import { ActivityIndicator, View as NativeView, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle, } from 'react-native'
import React from 'react'
import { View, useThemeColor } from '@/components/Themed'
import Colors from '@/constants/Colors'
import ThemedText, { fontFamilyType } from '../ThemedText'

import { Ionicons } from '@expo/vector-icons';

type ThemedButtonProps = {
 isLoading?: boolean;
 title: string;
 size?: number;
 disabled?: boolean;
 handleClick: () => void;
 containerStyle?: StyleProp<ViewStyle>;
 textStyle?: StyleProp<TextStyle>;
 family?: fontFamilyType;
}
const ThemedButton = ({ handleClick, isLoading, family = 'semi-bold', textStyle, containerStyle, style, title, disabled, size = 16, ...rest }: ThemedButtonProps & NativeView['props'] & TouchableOpacity['props']) => {
 const disabledColor = useThemeColor({}, 'disabled');
 return (
  <TouchableOpacity style={containerStyle} activeOpacity={0.9} onPress={!disabled ? handleClick : () => null} {...rest} >
   <View style={[styles.container, style, disabled && { backgroundColor: disabledColor }]}>
    {
     isLoading ? <ActivityIndicator /> : (
      <ThemedText size={size} family={family} style={[styles.text, textStyle]}>
       {title}
      </ThemedText>
     )
    }

   </View>
  </TouchableOpacity>
 )
}

interface IconButtonProps extends ThemedButtonProps {
 iconName: React.ComponentProps<typeof Ionicons>["name"];
 iconSize: number;
 iconStyle?: React.ComponentProps<typeof Ionicons>["style"];
}

export const IconThemedButton = ({ handleClick, isLoading, iconName, iconSize, iconStyle, family = 'semi-bold', textStyle, containerStyle, style, title, disabled, size = 16, ...rest }: IconButtonProps & NativeView['props'] & TouchableOpacity['props']) => {
 const disabledColor = useThemeColor({}, 'disabled');
 return (
  <TouchableOpacity style={containerStyle} activeOpacity={0.9} onPress={!disabled ? handleClick : () => null} >
   <View style={[styles.container, style, disabled && { backgroundColor: disabledColor }]}>
    <Ionicons name={iconName} size={iconSize} style={iconStyle} />
    {
     isLoading ? <ActivityIndicator /> : (
      <ThemedText size={size} family={family} style={[styles.text, textStyle]}>
       {title}
      </ThemedText>
     )
    }
   </View>
  </TouchableOpacity>
 )
}

export default ThemedButton

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: 44,
  borderRadius: 8,
  flexDirection: 'row',
  backgroundColor: Colors.light.secondary,
  justifyContent: 'center',
  // flex: 1,
  alignItems: 'center',

 },
 text: {
  color: '#fff',
  lineHeight: 24
 }
})