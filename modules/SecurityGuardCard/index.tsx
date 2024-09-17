import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedButton, ThemedText, ThemedView } from '@/components/ui'
import { useThemeColor } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import { securityCard } from '@/assets/images'
import { useNavigation } from '@react-navigation/native'
import { DashboardParamList } from '@/app/navigations/types-interfaces/dashboard'
import { useAppState } from '@/app/zus/store'

type SecurityProps = {
 navigateToScreen: () => void;
}
const SecurityGuard = ({ navigateToScreen }: SecurityProps) => {
 const bgColor = useThemeColor({}, "secondary");

 const totalGuards = useAppState((state) => state.total_security_guards);
 // const navigation = useNavigation();
 return (
  <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
   <Image source={securityCard} style={{ ...StyleSheet.absoluteFillObject, borderRadius: 15 }} />
   <ThemedText size={14} style={styles.text} family='medium'>Total Personnel</ThemedText>
   <ThemedText size={30} family='bold' style={styles.metric}>{totalGuards}</ThemedText>
   <ThemedButton containerStyle={{ marginVertical: 12 }} textStyle={{ color: bgColor }} style={styles.button} title='Add Personnel' handleClick={navigateToScreen} />
  </ThemedView>
 )
}

export default SecurityGuard

const styles = StyleSheet.create({
 container: {
  width: '100%',
  borderRadius: 15
 },
 text: {
  color: Colors.light.white,
  lineHeight: 20,
  textAlign: 'center',
  paddingVertical: 10
 },
 metric: {
  lineHeight: 38,
  textAlign: 'center',
  color: Colors.light.white
 },
 button: {
  backgroundColor: Colors.light.background,
 }
})