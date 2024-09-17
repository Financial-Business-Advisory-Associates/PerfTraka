import { getFontSize } from '@/constants/UiDefaults';
import { StyleSheet, View, Text as DefaultText } from 'react-native'
import React from 'react'
import { Text } from '@/components/Themed';

export type fontFamilyType = 'regular' | 'medium' | 'semi-bold' | 'bold' | 'thin'
type ThemedProps = {
  children: string | React.ReactNode;
  size: number;
  family?: fontFamilyType
  textContainerStyle?: {}
}
const ThemedText = ({ style, children, textContainerStyle, size = 14, family = 'regular', ...rest }: ThemedProps & DefaultText['props']) => {
  let familyStyles = {};
  switch (family) {
    case 'thin':
      familyStyles = {
        fontWeight: 300,
        fontFamily: 'InterRegular',
        fontSize: getFontSize(size),
      }
      break;
    case 'regular':
      familyStyles = {
        fontWeight: 400,
        fontFamily: 'InterRegular',
        fontSize: getFontSize(size),
      }
      break;
    case 'medium':
      familyStyles = {
        fontWeight: 500,
        fontFamily: 'InterMedium',
        fontSize: getFontSize(size),
      }
      break;
    case 'semi-bold':
      familyStyles = {
        fontWeight: 600,
        fontFamily: 'InterSemiBold',
        fontSize: getFontSize(size),
      }
      break;
    case 'bold':
      familyStyles = {
        fontWeight: 700,
        fontFamily: 'InterBold',
        fontSize: getFontSize(size),
      }
      break;

    default:
      break;
  }
  return (
    // <View style={[styles.container, textContainerStyle]}>
    <Text style={[familyStyles, style]} {...rest}>{children}</Text>
    // </View>
  )
}

export default ThemedText

const styles = StyleSheet.create({
  container: {
    width: '100%',
  }
})