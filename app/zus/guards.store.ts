import { StateCreator } from 'zustand';
import { GuardInterface } from '@/types';
import { pickPropertyValues } from '../utils/object-utils';
import { EMPTY_GUARDS } from '@/constants/EmptyStates';

// Create the store
export interface GuardSlice {
  guards: GuardInterface[];
  setSecurityGuards: (guards: GuardInterface[]) => void;
}
export const createGuardStoreSlice: StateCreator<GuardSlice> = (set) => ({
  guards: [],
  setSecurityGuards: (guards) => {
    let allGuards = guards.map((guard) => ({
      ...pickPropertyValues(guard, EMPTY_GUARDS),
    }));
    return set(() => ({
      guards: allGuards,
    }));
  },
});
