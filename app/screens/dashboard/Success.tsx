import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessComponent from '@/components/SuccessComponent'
import { DashboardScreenProps, } from '@/app/navigations/types-interfaces/dashboard';

const Success = ({ navigation, route }: DashboardScreenProps<"Success">) => {
 let prevScreen = route.params.activeScreen;
 let subText = route.params.message;
 let location = route.params.data?.location || 'MainTab'

 const handleExit = () => {
  navigation.navigate(location);
 }
 let message = "Successfull";
 if (prevScreen == "TakeAttendance") message = "Attendance recorded"
 if (prevScreen == "AddGuard") message = "Security personel added successfully";
 if (prevScreen == "ScanQr") message = "Scan Completed successfully";

 return (
  <View style={{ flex: 1, width: '100%' }}>
   <SuccessComponent subText={subText} text={message} handleClick={handleExit} />
  </View>
 )
}

export default Success

const styles = StyleSheet.create({})