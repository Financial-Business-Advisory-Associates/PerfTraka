import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { successCheck } from '@/assets/images'
import { ThemedButton, ThemedText, ThemedView } from './ui'

type Props = {
 text: string;
 subText?: string;
 handleClick: () => void;
}
const SuccessComponent = ({ text, subText, handleClick }: Props) => {
 return (
  <View style={styles.container}>
   <View style={styles.top}>
    <View style={{ width: 130, height: 130 }}>
     <Image source={successCheck} style={{ ...StyleSheet.absoluteFillObject }} />
    </View>
    <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
     <ThemedText style={{ textAlign: 'center' }} family='semi-bold' size={24}>{text}</ThemedText>
     <ThemedText style={{ textAlign: 'center' }} family='regular' size={16}>{subText}</ThemedText>
    </View>
   </View>
   <ThemedView style={styles.bottom}>

    <ThemedButton title='Close' handleClick={handleClick} />
   </ThemedView>
  </View>
 )
}

export default SuccessComponent

const styles = StyleSheet.create({
 container: {
  width: '100%',
  flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
 },
 top: {
  flex: 0.7,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
 },
 bottom: {
  width: '100%',
  flex: 0.25,
  justifyContent: 'flex-end'
 }
})