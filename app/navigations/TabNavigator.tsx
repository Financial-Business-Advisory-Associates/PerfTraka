import React, { useEffect } from "react";
import { StyleSheet, View as NativeView, View, Text, TouchableOpacity, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from "@/components/Themed";
import { CustomTabBar } from "@/components/CustomTabBar";


import { Attendance, Home, Scan, AddSecurityGuard, TakeAttendance } from "../screens/dashboard";
import { DashboardParamList, MainTabParamList, MainTabScreenProps } from "./types-interfaces/dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Success from "../screens/dashboard/Success";
import { SafeAreaContainer } from "@/components/Containers";

import { Entypo } from '@expo/vector-icons';
import { ThemedText, ThemedView } from "@/components/ui";
import { useNavigation } from "@react-navigation/native";
import ScanQr from "../screens/dashboard/ScanQr";



const BottomTab = createBottomTabNavigator<MainTabParamList>();

export function MainTabScreen() {

  useEffect(() => {
    // setNavigationColor(backgroundThemeColor ?? (isDarkMode ? '#000000' : '#ffffff'))
  }, [])


  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerTitle: () => <></>,
          headerShadowVisible: false,
          header: () => null,
          tabBarHideOnKeyboard: true,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={({ navigation }: MainTabScreenProps<"Home">) => ({
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color }) => (

              <TabBarIcon focused={focused}>
                <Octicons size={25} name="home" color={color} />
              </TabBarIcon>
            ),
            //  <TabBarIcon
            //   // style={{ backgroundColor: '#fff' }}
            //   name="home" {...props} />
            // ),
            // header: () => <SafeAreaView style={{ backgroundColor: backgroundThemeColor, marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0 }} />,

          })}
        />
        <BottomTab.Screen
          name="Attendance"
          component={Attendance}
          options={({ navigation }: MainTabScreenProps<"Attendance">) => ({
            tabBarLabel: "Attendance",
            tabBarIcon: ({ focused, color }) => (

              <TabBarIcon focused={focused}>
                <SimpleLineIcons size={25} name="user-following" color={color} />
              </TabBarIcon>
            ),
            //  <TabBarIcon
            //   // style={{ backgroundColor: '#fff' }}
            //   name="home" {...props} />
            // ),
            // header: () => <SafeAreaView style={{ backgroundColor: backgroundThemeColor, marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0 }} />,

          })}
        />
        <BottomTab.Screen
          name="Scan"
          component={Scan}
          options={({ navigation }: MainTabScreenProps<"Scan">) => ({
            tabBarLabel: "Scan",
            tabBarIcon: ({ focused, color }) => (

              <TabBarIcon focused={focused}>
                <MaterialCommunityIcons size={25} name="line-scan" color={color} />
              </TabBarIcon>
            ),
            //  <TabBarIcon
            //   // style={{ backgroundColor: '#fff' }}
            //   name="home" {...props} />
            // ),
            // header: () => <SafeAreaView style={{ backgroundColor: backgroundThemeColor, marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0 }} />,

          })}
        />
      </BottomTab.Navigator>

      {/* <ScreenBottomIndicator /> */}

    </>
    //  <ThemedView style={{ width, height: 100, position: 'absolute', top: '100%', backgroundColor: isDarkMode ? '#000000' : '#fff' }} />
    // </NativeView>
  );
}

function TabBarIcon(props: {
  // name: React.ComponentProps<typeof Ionicons>['name'];
  // color: string;
  focused: boolean;
  children: React.ReactNode
}) {
  const bgColor = useThemeColor({}, "activeTab");
  return (
    <View style={{ height: 40, width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
      {props.children}
    </View>)
}

export function DashboardScreen() {
  const DashboardStack = createNativeStackNavigator<DashboardParamList>();
  const { goBack } = useNavigation();
  return (
    <DashboardStack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        headerStyle: {
        },

      }}
    >
      <DashboardStack.Screen
        name="MainTab"
        component={MainTabScreen}
      />
      <DashboardStack.Screen
        name="AddGuard"
        component={AddSecurityGuard}
        options={{
          headerShown: true,
          // header: () => (
          //   <SafeAreaContainer />
          // ),
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity style={styles.header} onPress={() => goBack()}>
              <Entypo name="chevron-small-left" size={24} color="black" />
              <ThemedText family="regular" style={{ lineHeight: 24 }} size={16}>Back</ThemedText>
            </TouchableOpacity>
          )
        }}
      />
      <DashboardStack.Screen
        name="TakeAttendance"
        component={TakeAttendance}
        options={{
          headerShown: true,
          // header: () => (
          //   <SafeAreaContainer />
          // ),
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity style={styles.header} onPress={() => goBack()}>
              <Entypo name="chevron-small-left" size={24} color="black" />
              <ThemedText family="regular" style={{ lineHeight: 24 }} size={16}>Back</ThemedText>
            </TouchableOpacity>
          )
        }}
      />
      <DashboardStack.Screen
        name="ScanQr"
        component={ScanQr}
        options={{
          headerShown: false,
          // header: () => (
          //   <SafeAreaContainer />
          // ),
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity style={styles.header} onPress={() => goBack()}>
              <Entypo name="chevron-small-left" size={24} color="black" />
              <ThemedText family="regular" style={{ lineHeight: 24 }} size={16}>Back</ThemedText>
            </TouchableOpacity>
          )
        }}
      />
      <DashboardStack.Screen
        name="Success"
        component={Success}
      />
    </DashboardStack.Navigator>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    // paddingHorizontal: 10,
    //  height: 40,
    flexDirection: 'row', alignItems: "center"
  }
})