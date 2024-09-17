import {
  LatestScan,
  LatestAttendance,
  User,
  GuardInterface,
  AppStateInterface,
} from '@/types';

export const EMPTY_USER: User = {
  id: 0,
  first_name: '',
  last_name: '',
  profile_image: '',
};

export const EMPTY_SCANS: LatestScan = {
  id: 0,
  site_id: 0,
  scan_time: '',
  scan_date: '',
  scan_date_time: '',
  tag: {
    id: 0,
    name: '',
    conde: '',
  },
};

export const EMPTY_ATTENDANCE: LatestAttendance = {
  id: 0,
  action_type: 'check_in',
  attendance_time: '',
  attendance_date: '',
  attendance_date_time: new Date(),
};

export const EMPTY_GUARDS: GuardInterface = {
  id: 0,
  first_name: '',
  last_name: '',
  email: null,
  profile_image: '',
};

export const loggedOutAuthState: AppStateInterface = {
  isLoggedIn: false,
  token: null,
  isOffline: false,
  showLogOut: false,
  logOutModalOpen: false,
  user: null,
  isLoading: false,
  toggleLogout: () => {},
  toggleLogoutModal: () => {},
  setUser: (data: User) => {},
  setToken: (token: string) => {},
  setLoggedIn: () => {},
  logOutUser: () => {},
  setLoading: (value: boolean) => {},
  resetModals: () => {},
  loginUser: (user: User, token: string) => {},
};
