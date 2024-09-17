import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import ThemedText, { fontFamilyType } from '../ThemedText'
import DatePicker from '../DatePicker';
import ThemedView from '../ThemedView';

type DateProps = {
 family: fontFamilyType,
 textStyle?: StyleProp<TextStyle>;
 label: string;
 value: Date;
 onChangeDate: (date: Date) => void;
 textSize?: number; iconSize?: number;
}
const ThemedDate = ({ family = "regular", textSize, iconSize, textStyle, label, value = new Date(), onChangeDate }: DateProps) => {
 return (
  <ThemedView transparent noPadding style={{ width: '100%', height: 40 }}>
   <ThemedText family={family} size={12} style={[styles.label, textStyle]}>{label}</ThemedText>
   <DatePicker
    textSize={textSize}
    iconSize={iconSize} value={value} width={"100%"}
    height={"100%"}
    onChange={onChangeDate} />
  </ThemedView>
 )
}

export default ThemedDate

const styles = StyleSheet.create({
 label: {
  paddingVertical: 4,
  lineHeight: 18
 }
})