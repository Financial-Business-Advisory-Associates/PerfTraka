import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types-interfaces/root-stack'

import { StackNavigatorOptions, StackRoutesType } from './types-interfaces/generic'
import { NavigationContainer } from '@react-navigation/native'
import { Login } from '../screens'
import { DashboardScreen } from './TabNavigator'
import { useAppState } from '../zus/store'


type RootStackRoutesType = StackRoutesType<RootStackParamList>

const RootStack = createNativeStackNavigator<RootStackParamList>()
export default function RootNavigator() {
 const isLoggedIn = useAppState((state) => state.isLoggedIn);
 const user = useAppState((state) => state.user);
 const token = useAppState((state) => state.token);


 const authRoute: RootStackRoutesType = [
  { name: "Login", component: Login },

 ];
 const loggedInRoute: RootStackRoutesType = [
  {
   name: "Dashboard", component: DashboardScreen, options: {
    headerShown: false,
    headerTitle: "",
   }
  },
 ];
 const rootRoutes: RootStackRoutesType = isLoggedIn && user && token ? loggedInRoute : authRoute;
 // omit the children as it corresponds to stack screen
 const rootStackNavigatorProps: Omit<
  StackNavigatorOptions<RootStackParamList>,
  'children'
 > = {
  initialRouteName: isLoggedIn ? 'Dashboard' : 'Login',
  screenOptions: {
   headerShown: false,
   gestureEnabled: false,
   presentation: 'card',
   headerTitleStyle: {
    fontSize: 24,
    color: 'olivedrab',
   },
  },
  // ...rest
 };
 return (
  <NavigationContainer>
   <RootStack.Navigator {...rootStackNavigatorProps}>
    {rootRoutes.map((routeConfig, index) => (
     <RootStack.Screen key={index} {...routeConfig} />
    ))}
   </RootStack.Navigator>
  </NavigationContainer>
 )
}

const styles = StyleSheet.create({})