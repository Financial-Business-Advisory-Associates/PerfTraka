import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
// import { IFontFamily } from '../global/types';
// import * as WorkSans from '@expo-google-fonts/work-sans';
// import * as Poppins from '@expo-google-fonts/inter';
// import useCheckForUpdates from './api/useCheckAppUpdate';

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // const fontFamily: IFontFamily = {};
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // await useCheckForUpdates();

        // const [loaded, error] = useFonts({
        //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        //   InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
        //   InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        //   InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        //   InterBold: require('../assets/fonts/Inter-Bold.ttf'),
        //   ...FontAwesome.font,
        // });

        await Font.loadAsync({
          ...Entypo.font,
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
          InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
          InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
          InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
          InterBold: require('../assets/fonts/Inter-Bold.ttf'),
        });

        // Load fonts
        // await Font.loadAsync({
        //   ...FontAwesome.font,
        //   'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
