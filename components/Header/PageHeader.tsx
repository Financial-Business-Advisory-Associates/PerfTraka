import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UiDefaults, getFontSize } from '@/constants/UiDefaults'
import Colors from '@/constants/Colors'
import { LandScapeLogo } from '../Logo'
import { ThemedView } from '../ui'
import UserPicture from '@/modules/userPicture'

const PageHeader = () => {
 return (
  <View style={styles.container}>
   <View style={styles.logoContainer}>

   </View>
   <View style={styles.rightHeader}>
    <View style={{ width: '50%', height: '100%', alignItems: "center", justifyContent: 'center' }}>


    </View>
   </View>
  </View>
 )
}

export default PageHeader

const styles = StyleSheet.create({
 container: {
  width: '100%',
  height: getFontSize(60),
  backgroundColor: Colors.light.white,
  marginTop: StatusBar.currentHeight,
  flexDirection: 'row',
  paddingHorizontal: UiDefaults.viewPadding
 },
 logoContainer: {
  width: '30%',
  height: '100%',
  backgroundColor: 'red'
 },
 rightHeader: {
  width: '70%',
  height: '100%',
  // justifyContent: 'center',
  alignItems: 'flex-end'
 }
})