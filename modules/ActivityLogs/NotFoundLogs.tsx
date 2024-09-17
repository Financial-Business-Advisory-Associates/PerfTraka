import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/components/Themed';
import { ThemedButton, ThemedText, ThemedView } from '@/components/ui';
import Colors from '@/constants/Colors';

type NotFoundProps = {
 title: string;
 subTitle?: string;
 btnText: string;
 handleClick: () => void;
}
const NotFoundLogs = ({ title, subTitle, btnText, handleClick }: NotFoundProps) => {
 const mutedTextColor = useThemeColor({}, "mutedText")
 return (
  <ThemedView style={styles.notFoundContainer}>
   <ThemedView transparent style={{ padding: 20 }}>
    <ThemedText style={styles.notFoundHeading} size={20} family='semi-bold'>
     {title}
    </ThemedText>
    <ThemedText style={[{ color: mutedTextColor }]} size={14} family='regular'>
     {subTitle}
    </ThemedText>
    <ThemedButton containerStyle={{ marginVertical: 15 }} title={btnText} handleClick={handleClick} />
   </ThemedView>
  </ThemedView>
 )
}

export default NotFoundLogs

const styles = StyleSheet.create({
 notFoundContainer: {
  width: '100%',
  flex: 1,
  backgroundColor: Colors.light.white,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
  borderRadius: 10,
  paddingHorizontal: 20
 },
 notFoundHeading: {
  lineHeight: 30,
  paddingVertical: 10
 },
})