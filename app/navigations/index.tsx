import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './RootNavigator'

export default function Navigation() {
 return (
  <NavigationContainer>
   <RootNavigator />
  </NavigationContainer>
 )
}

