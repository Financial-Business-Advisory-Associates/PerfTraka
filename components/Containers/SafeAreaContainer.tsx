import { StyleProp, StyleSheet, Platform, StatusBar, SafeAreaView, } from 'react-native'
import React from 'react'
import { View } from '../Themed';
import Constants from 'expo-constants';

type ContainerProps = {
 children?: React.ReactNode;
 containerStyle?: object
}
const SafeAreaContainer = ({ children }: ContainerProps) => {
 if (Platform.OS !== 'android') {
  return (
   <SafeAreaView style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
    <View style={{ paddingHorizontal: 20, flex: 1, width: '100%' }}>
     {children}
    </View>
   </SafeAreaView>
  )
 }
 return (
  <SafeAreaView style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
   {children}
  </SafeAreaView>
 )

}

export default SafeAreaContainer

const styles = StyleSheet.create({
 container: {
  flex: 1,
  width: '100%',
  paddingHorizontal: 20,
 }
})