import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { isNetworkAvailableUtil } from '../utils/network-utils';

export function useCheckNetworkConnection() {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [previousIsNetworkAvailableState, setPreviousIsNetworkAvailableState] =
    useState(true);

  async function isNetworkAvailable() {
    timerId && clearTimeout(timerId);

    const timerIdTemp = setTimeout(async () => {
      const isAvailable = await isNetworkAvailableUtil();
      setPreviousIsNetworkAvailableState(isAvailable);

      return isAvailable;
    }, 1000);

    setTimerId(timerIdTemp);

    return previousIsNetworkAvailableState;
  }

  return isNetworkAvailable;
}
