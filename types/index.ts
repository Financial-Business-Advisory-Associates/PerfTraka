export interface IPerfTrakaApi {
  testNetworkConnection: string;
  dashboardData: string;
  login: string;
  logout: string;
  guards: string;

  getScans: string;
  getAttendances: string;

  postGuard: string;
  postAttendanceUrl: string;
  postScanUrl: string;
}
export interface AppStateInterface {
  token: null | string;
  isOffline: boolean;
  isLoggedIn: boolean;
  showLogOut: boolean;
  logOutModalOpen: boolean;
  user: User | null;
  isLoading: boolean;

  toggleLogout: () => void;
  toggleLogoutModal: () => void;
  setUser: (data: User) => void;
  setToken: (token: string) => void;
  setLoggedIn: () => void;
  logOutUser: () => void;
  setLoading: (value: boolean) => void;
  resetModals: () => void;
  loginUser: (user: User, token: string) => void;
}
export interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

export interface LoginApiResponse extends ApiResponse {
  data: {
    token: string;
    user: User;
  };
}

export interface PostGuardApiResponse extends ApiResponse {
  data: {
    guard: User;
  };
}

export interface PostAttendanceApiResponse extends ApiResponse {
  data: {
    Attendance: LatestAttendance;
  };
}
export interface DashboardApiResponse extends ApiResponse {
  data: DashboardInterface;
}
export interface GuardsApiResponse extends ApiResponse {
  data: {
    guards: { data: GuardInterface[] };
  };
}
export interface ScansApiResponse extends ApiResponse {
  data: {
    scans: { data: LatestScan[] };
  };
}
export interface AttendanceApiResponse extends ApiResponse {
  data: {
    attendances: { data: LatestAttendance[] };
  };
}

export type QueryParams = {
  perPage?: number;
  startDate?: string | null;
  endDate?: string | null;
};

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  profile_image?: string;
  // username?: string;
  // phone_number?: string;
  // address?: string;
  // state_id?: number;
  // status?: boolean;
  // created_by?: number;
  // company_id?: number;
  // site_id?: number;
  // shift_start_time?: null;
  // shift_end_time?: null;
  // normal_rate_per_hour?: null;
  // sunday_rate_per_hour?: null;
  // holiday_rate_per_hour?: null;
  // number_of_night_shift?: null;
  // night_shift_allowance?: null;
  // profile_image?: string;
  // last_login?: null;
  // email_verified_at?: Date;
  // created_at?: Date;
  // updated_at?: Date;
  // tenant?: Tenant;
  // site?: Site;
}

// export interface Site {
//   id: number;
//   company_id: number;
//   created_by: number;
//   inspector_id: number;
//   state_id: number;
//   name: string;
//   photo: string;
//   address: string;
//   logout_pin: string;
//   status: boolean;
//   number_of_tags: number;
//   maximum_number_of_rounds: number;
//   shift_start_time: string;
//   shift_end_time: string;
//   latitude: string;
//   longitude: string;
//   created_at: Date;
//   updated_at: Date;
// }

// export interface Company {
//   id: number;
//   name: string;
// }

// export interface Tenant {
//   id: number;
//   name: string;
//   display_name: string;
//   maximum_number_of_tags: number;
//   phone_number: string;
//   status: string;
//   owner_id: number;
//   created_by: number;
//   industry_id: number;
//   state_id: number;
//   city: string;
//   address: string;
//   created_at: Date;
//   updated_at: Date;
// }

export type ActionStatus = 'check_in' | 'check_out';

export type LogoutRequest = {
  pin: string;
};

export type ScanRequest = {
  scan_date: string;
  scan_date_time: string;
  scan_time: string;
  longitude: string;
  latitude: string;
  tag_code: string;
};

export type AttendanceRequestForm = {
  attendance_date: Date;
  attendance_date_time: Date;
  attendance_time: string;
  longitude: string;
  latitude: string;
  security_guard_id: number;
  action_type: ActionStatus;
  image: any;
};

export type SecurityGuardRequestForm = {
  first_name: string;
  last_name: string;
  photo: any;
};

export interface GuardInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: null;
  profile_image?: string;
  // username: null;
  // phone_number: null;
  // address: null;
  // state_id: null;
  // status: boolean;
  // created_by: null;
  // company_id: number;
  // site_id: number;
  // shift_start_time: null;
  // shift_end_time: null;
  // normal_rate_per_hour: null;
  // sunday_rate_per_hour: null;
  // holiday_rate_per_hour: null;
  // number_of_night_shift: null;
  // night_shift_allowance: null;
  // profile_image: string;
  // last_login: null;
  // email_verified_at: null;
  // created_at: Date;
  // updated_at: Date;
}

export interface DashboardInterface {
  total_security_guards: number;
  latest_attendances: LatestAttendance[];
  latest_scans: LatestScan[];
}

export interface LatestAttendance {
  id: number;

  action_type: 'check_in' | 'check_out';
  attendance_time: string;
  attendance_date: string;
  attendance_date_time: Date;
  user?: null | User;
  image?: string;
  // site: Company;
  // company: Company;
  // site_id: number;
  // company_id: number;
}

export type ScanTags = {
  id: number;
  name: string;
  conde: string;
};

export interface LatestScan {
  id: number;
  site_id: number;
  scan_time: string;
  scan_date: string;
  scan_date_time: string;
  tag: ScanTags;
  // site: Company;
  // company: Company;
  // company_id: number;
}
