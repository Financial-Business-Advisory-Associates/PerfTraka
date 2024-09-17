import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DashboardScreenProps } from '@/app/navigations/types-interfaces/dashboard'
import { BarCodeScanner } from '@/components/Camera/BarCodeScanner'
import { convertDateFormat } from '@/constants/helpers'
import { useAppLocator } from '@/app/hooks/useAppLocator'
import { ScanRequest } from '@/types'
import { useSaveScan } from '@/app/services/mutations'
import { ThemedView } from '@/components/ui'
import AppLoader from '@/components/Modals/AppLoader'

const ScanQr = ({ navigation }: DashboardScreenProps<'ScanQr'>) => {
 const { location } = useAppLocator();
 const [coordinates, setCoordinates] = useState<{ lattitude: number | string; longitude: number | string; }>();
 const { mutate: saveScan, isSuccess, data, error } = useSaveScan();

 let timeoutId: NodeJS.Timeout;

 useEffect(() => {

  // Function to be called if location is not obtained within 10 seconds
  const handleTimeout = () => {
   navigation.goBack(); // Call the goBack method from React Navigation
  };

  // Set a timeout to trigger handleTimeout after 10 seconds
  timeoutId = setTimeout(handleTimeout, 10000);
  if (location) {
   clearTimeout(timeoutId);
  }

  // Cleanup function to clear the timeout if location is obtained before 10 seconds
  return () => {
   clearTimeout(timeoutId);
  };
 }, [navigation, location]);

 useEffect(() => {
  if (location) {
   const { coords } = location;
   setCoordinates({ lattitude: coords.latitude, longitude: coords.longitude })

   // If location is obtained, clear the timeout
   clearTimeout(timeoutId);
  }
 }, [location])

 useEffect(() => {

  if (isSuccess && data?.status) {
   // handle success for offline 
   // navigate to success page

   navigation.navigate("Success", { activeScreen: "ScanQr", message: `QR code has been successfully scanned`, data: { location: 'MainTab' } })
  }

 }, [isSuccess])
 if (data && !data.status) {
  Alert.alert("❌ Error in QR Code", data.message, [
   { style: "default", text: "Go back", onPress: () => navigation.goBack() }
  ]);
 }
 // console.log({ error, data });

 const handleGetData = (data: any) => {
  handleSubmit(data);
 }

 const handleSubmit = async (data: string) => {
  if (!coordinates) {
   Alert.alert("Location Error", "Sorry, We are unable to determine your location");
   return;
  }
  let date = new Date();
  let currentDate = convertDateFormat(date, "YYYY-MM-DD");
  let currentDateTime = convertDateFormat(date, "YYYY-MM-DD HH:mm:ss");
  let currentTime = convertDateFormat(date, "HH:mm:ss");
  let longitude = coordinates?.longitude as string;
  let latitude = coordinates?.lattitude as string; //TODO: GET this f

  let request: ScanRequest = {
   scan_date: currentDate,
   scan_date_time: currentDateTime,
   scan_time: currentTime,
   longitude,
   latitude,
   tag_code: data
  }


  try {
   // submit request
   await saveScan(request);
  } catch (error) {

  }

 }

 return (
  <View style={styles.container}>
   {
    (coordinates?.lattitude && coordinates.longitude) ? (
     <BarCodeScanner getData={handleGetData} onClose={() => navigation.goBack()} />
    ) : (
     <ThemedView>
      <AppLoader text='Trying to get Location...' />
     </ThemedView>
    )
   }
  </View>
 )
}

export default ScanQr

const styles = StyleSheet.create({
 container: {
  flex: 1,
  width: '100%',
  paddingTop: StatusBar.currentHeight,
  backgroundColor: '#000'
 }
})