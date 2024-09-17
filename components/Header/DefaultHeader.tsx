import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { UiDefaults, getFontSize } from '@/constants/UiDefaults'
import Colors from '@/constants/Colors'
import { LandScapeLogo } from '../Logo'
import { ThemedText, ThemedView } from '../ui'
import UserPicture from '@/modules/userPicture'


const DefaultHeader = () => {
 return (
  <View style={styles.container}>
   <View style={styles.logoContainer}>
    <LandScapeLogo width={"100%"} height={'100%'} />
   </View>
   <View style={styles.rightHeader}>
    <View style={{ width: '50%', height: '100%', alignItems: "center", justifyContent: 'center' }}>
     <UserPicture />
    </View>
   </View>
  </View>
 )
}

export default DefaultHeader

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
  width: '60%',
  height: '100%',
 },
 rightHeader: {
  width: '40%',
  height: '100%',
  // justifyContent: 'center',
  alignItems: 'flex-end',
  position: 'relative',
 },

})