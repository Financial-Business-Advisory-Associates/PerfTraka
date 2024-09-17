import { useEffect, useMemo, useState } from 'react';
import { useEncryptedAsyncStorage } from './useEncryptedAsyncStorage';
import { AppStateInterface, User } from '@/types';
import { EMPTY_USER, loggedOutAuthState } from '@/constants/EmptyStates';
import { useQueryClient } from '@tanstack/react-query';
import { useAppState } from '../zus/store';
import { pickPropertyValues } from '../utils/object-utils';
import { APP_STORAGE_KEY } from '@/constants/helpers';

// we need to split the storage up to prevent exceeding MAX storage size per KEY (2048 bytes)

export function useRehydrateEncryptedStorageData() {
  const loginUser = useAppState((state) => state.loginUser);
  const signOutUser = useAppState((state) => state.logOutUser);
  const authToken = useAppState((state) => state.token);
  const { getItemAsync, setItemAsync, removeItemAsync } =
    useEncryptedAsyncStorage(APP_STORAGE_KEY);

  const [authState, setAuthState] =
    useState<AppStateInterface>(loggedOutAuthState);

  const queryClient = useQueryClient();

  // use effect to get authState from Encrypted Storage on app start
  useEffect(() => {
    const retrieveAuthState = async () => {
      try {
        const authStateString = await getItemAsync();

        const rehydratedAuthState =
          authStateString && JSON.parse(authStateString);
        // this should be uncommented if user information should be enforced on phone storage
        // console.log({ rehydratedAuthState });

        rehydratedAuthState && setAuthState(rehydratedAuthState);
        // rehydratedAuthState && setAuthState(rehydratedAuthState);
      } catch (error) {
        console.error(error);
      }
    };

    retrieveAuthState();
  }, []);

  // persist auth state to an encrypted storage solution
  useEffect(() => {
    const persistAuthState = async () => {
      try {
        if (authState.token && authState.user) {
          let user = pickPropertyValues(authState.user, EMPTY_USER);
          loginUser(user, authState.token);
        } else {
          if (!authToken) {
          }
        }
        await setItemAsync(JSON.stringify(authState));
      } catch (error) {
        // console.error(error);
      }
    };

    persistAuthState();
  }, [
    setItemAsync,
    authState,
    authState.isLoggedIn,
    authState.token,
    authState.user?.id,
  ]);
  const unmemoedAuthContext: AppStateInterface = {
    ...authState,
    loginUser: (user: User, token: string) => {
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        user: pickPropertyValues(user, EMPTY_USER),
        token,
        isLoggedIn: true,
      }));
      // loginUser(user, token);
    },
    logOutUser: async () => {
      console.log('User logged out');

      setAuthState((prevAuthState) => ({
        ...loggedOutAuthState,
        token: null,
        isLoggedIn: false,
        user: null,
      }));
      signOutUser();

      queryClient.clear();
      queryClient.invalidateQueries();
    },

    setToken: (token: string) =>
      setAuthState((prevAuthState) => ({ ...prevAuthState, token })),

    setUser: (user: User) => {
      const pickedPropertyUser = pickPropertyValues(user, EMPTY_USER);
      setAuthState((prevState) => ({ ...prevState, user: pickedPropertyUser }));
    },
  };

  const memoedAuthContext = useMemo(
    () => unmemoedAuthContext,
    [authState, authState.user?.id, authState.token]
  );

  return memoedAuthContext; // unmemoedAuthContext; // memoedAuthContext;
}
