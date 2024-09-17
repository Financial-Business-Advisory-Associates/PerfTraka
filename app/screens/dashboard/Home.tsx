import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { useThemeColor } from '@/components/Themed';
import { ThemedText, ThemedView } from '@/components/ui';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import SecurityGuard from '@/modules/SecurityGuardCard';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ActivityLogs from '@/modules/ActivityLogs';
import { DefaultHeader } from '@/components/Header';
import { getFontSize } from '@/constants/UiDefaults';
import { MainTabScreenProps } from '@/app/navigations/types-interfaces/dashboard';
import { useFetchAppData } from '@/app/services/queries';
import { useAppState } from '@/app/zus/store';
import { useAppLocator } from '@/app/hooks/useAppLocator';

export default function Home({ navigation }: MainTabScreenProps<"Home">) {
  const { getStatus, getPermissionStatus, requestPermission } = useAppLocator();

  const [focused, setFocused] = useState(false)

  const bgColor = useThemeColor({}, "tabBackground");

  const setDashboard = useAppState((state) => state.setDashboardData);
  const setSecurityGuards = useAppState((state) => state.setSecurityGuards)
  const dash = useAppState((state) => state.guards)


  const { "0": { isSuccess: dSuccess, data: dData }, "1": { isSuccess: gSuccess, data: gData, }, } = useFetchAppData();


  useEffect(() => {

    if (dSuccess && dData?.status && dData.data) {
      setDashboard(dData?.data)
      setFocused(false)
    }
    if (gSuccess && gData?.status && gData.data) {

      setSecurityGuards(gData.data.guards.data)
      setFocused(false)
    }

  }, [gSuccess, dSuccess, focused]);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {

      setFocused(true)
      // Alert.alert('Refreshed');
    });
    return focusHandler;
  }, [navigation]);

  // useEffect(() => {
  //   getPermissionStatus();
  //   const status = getStatus();

  //   if (status != 'granted') {
  //     Alert.alert("Location Error", "You neeed enable location for the application to work properly", [
  //       { style: "default", text: "Enable Location", onPress: async () => requestPermission(), }
  //     ], { cancelable: false })
  //   }

  // }, [])


  return (
    <React.Fragment>
      <DefaultHeader />
      <ThemedView style={[styles.container, { backgroundColor: bgColor }]}>
        <SecurityGuard navigateToScreen={() => navigation.navigate("AddGuard")} />
        <ThemedView transparent style={styles.actionContainer}>
          <ActionButton
            handleClick={() => navigation.navigate("ScanQr")}
            text='Scan QR code'
            icon={<MaterialCommunityIcons size={22} name="line-scan" />}
          />
          <ActionButton
            handleClick={() => navigation.navigate("TakeAttendance")}
            text='Take Attendance'
            icon={<SimpleLineIcons size={22} name="user-following" />}
          />
        </ThemedView>
        <ActivityLogs />
      </ThemedView>
    </React.Fragment>
  );
}

export function ActionButton({ text, icon, handleClick }: { text: string, icon: React.ReactNode, handleClick: () => void }) {
  const actionColor = useThemeColor({}, "secondary");
  return (
    <TouchableOpacity onPress={handleClick} style={{ width: '40%', height: getFontSize(65) }} activeOpacity={0.6}>
      <ThemedView style={styles.actionBtn}>
        {icon}
        <ThemedText style={{ paddingVertical: 12, color: actionColor }} size={12} family='medium'>{text}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  actionContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionBtn: {
    width: '100%',
    alignItems: 'center',
    lineHeight: 24,
    borderRadius: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: Colors.light.white,
    elevation: 2,
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderColor: 'rgba(255, 255, 255)',
    // borderColor: 'grey',

  }
});
