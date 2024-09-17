import React, { Suspense, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import RootNavigator from './navigations/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import AppActivityIndicator from './components/ui/AppActivityIndicator'
import { useCachedResources } from './hooks/useCachedResources'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AppController from '@/modules/AppController';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootApplication() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Suspense fallback={<></>}>
        <SafeAreaProvider>
          <AppController>
            <SafeAreaView />
            <RootNavigator />
          </AppController>
        </SafeAreaProvider>

      </Suspense>

    </>
  )
}



