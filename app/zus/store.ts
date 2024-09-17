import { GuardSlice, createGuardStoreSlice } from './guards.store';
import { AppStateInterface, DashboardInterface, User } from '@/types';
import { create } from 'zustand';
import { DashboardSlice, createDashboardStoreSlice } from './dashboard.store';
import { createAppStoreSlice } from './app.store';

export const useAppState = create<
  AppStateInterface & DashboardSlice & GuardSlice
>()((...a) => ({
  ...createAppStoreSlice(...a),
  ...createDashboardStoreSlice(...a),
  ...createGuardStoreSlice(...a),
}));
