import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const useAppLocator = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [error, setErrorMsg] = useState(null);
  const [locationStatus, setStatus] = useState('');

  useEffect(() => {
    if (locationStatus == '') {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // setErrorMsg('Permission to access location was denied');
          return;
        }
        // console.log('Permission', status);

        setStatus(status);

        let location: Location.LocationObject =
          await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  }, [locationStatus]);

  /**
   * used to retrieve location information
   *
   * @returns {Promise<Location.LocationObject | null>}
   */
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      return null;
    }
  };

  const requestPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
    return status;
  };

  const getStatus = () => locationStatus;

  const getPermissionStatus = async () => {
    try {
      const { locationServicesEnabled } =
        await Location.getProviderStatusAsync();
      // const serviceOn = await Location.getProviderStatusAsync();

      if (!locationServicesEnabled) {
        Alert.alert(
          '📍Location service turned off',
          'Please enable location services',
          [
            {
              style: 'default',
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {}
  };
  return {
    getLocation,
    location,
    getStatus,
    error,
    getPermissionStatus,
    requestPermission,
  };
};
