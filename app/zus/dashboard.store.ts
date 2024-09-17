import { StateCreator } from 'zustand';
import { DashboardInterface, LatestAttendance, LatestScan } from '@/types';
import { pickPropertyValues } from '../utils/object-utils';
import { EMPTY_SCANS, EMPTY_ATTENDANCE } from '@/constants/EmptyStates';

// Create the store
export interface DashboardSlice extends DashboardInterface {
  setTotalSecurityGuards: (count: number) => void;
  setLatestAttendances: (latest_attendances: LatestAttendance[]) => void;
  setLatestScans: (latest_scans: LatestScan[]) => void;
  setDashboardData: (data: DashboardInterface) => void;
}
export const createDashboardStoreSlice: StateCreator<DashboardSlice> = (
  set
) => ({
  total_security_guards: 0,
  latest_attendances: [],
  latest_scans: [],
  user: null,

  setTotalSecurityGuards: (count: number) =>
    set((state) => ({ total_security_guards: count })),
  setLatestAttendances: (latest_attendances: LatestAttendance[]) =>
    set((state) => ({ latest_attendances })),
  setLatestScans: (latest_scans: LatestScan[]) =>
    set((state) => ({ latest_scans })),
  setDashboardData: (data: DashboardInterface) => {
    let scans = data.latest_scans.map((scan) => ({
      ...pickPropertyValues(scan, EMPTY_SCANS),
    }));
    let attendances = data.latest_attendances.map((attendance) => ({
      ...pickPropertyValues(attendance, EMPTY_ATTENDANCE),
    }));
    return set((state) => ({
      latest_attendances: attendances,
      total_security_guards: data.total_security_guards,
      latest_scans: scans,
    }));
  },
});
