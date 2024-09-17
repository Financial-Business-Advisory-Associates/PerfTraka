import { StateCreator } from 'zustand';

import { AppStateInterface, User } from '@/types';
import { pickPropertyValues } from '../utils/object-utils';
import { EMPTY_USER } from '@/constants/EmptyStates';

type SetFunction<T> = (fn: (state: T) => Partial<T>) => void;

// Create the store
export const createAppStoreSlice: StateCreator<AppStateInterface> = (set) => ({
  isOffline: false,
  isLoading: false,

  token: null,
  isLoggedIn: false,
  user: null,

  showLogOut: false,
  logOutModalOpen: false,

  toggleLogout: () => set((state) => ({ showLogOut: !state.showLogOut })),
  toggleLogoutModal: () =>
    set((state) => ({
      logOutModalOpen: !state.logOutModalOpen,
      showLogOut: false,
    })),
  setToken: (token: string) => set((state) => ({ token, isLoggedIn: true })),
  setUser: (user: User) =>
    set((state) => ({
      user: pickPropertyValues(user, EMPTY_USER),
      isLoggedIn: true,
    })),
  setLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
  setLoading: (value: boolean) => set((state) => ({ isLoading: value })),
  logOutUser: () =>
    set((state) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      showLogOut: false,
      logOutModalOpen: false,
    })),
  resetModals: () =>
    set((state) => ({
      showLogOut: false,
      logOutModalOpen: false,
    })),
  loginUser: (user: User, token: string) =>
    set((state) => ({
      isLoggedIn: true,
      user: pickPropertyValues(user, EMPTY_USER),
      token,
    })),
});
