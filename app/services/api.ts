import { ApiUrls, apiBaseUrl } from '@/constants/ApiUrl';
import axios, { AxiosError } from 'axios';
import { AuthenticateType } from '../schema/login.schema';
import { AddGuardSchemaType } from '../schema/dashboard.schema';
import {
  ApiResponse,
  DashboardApiResponse,
  GuardsApiResponse,
  LoginApiResponse,
  LogoutRequest,
  PostAttendanceApiResponse,
  PostGuardApiResponse,
  ScanRequest,
  ScansApiResponse,
} from '@/types';
import { Alert } from 'react-native';
import { useAppState } from '../zus/store';
import { splitUrl } from '../utils/object-utils';
import { clearStorageAsync } from '../hooks/useEncryptedAsyncStorage';
import { APP_STORAGE_KEY } from '@/constants/helpers';

const {
  login,
  postGuard,
  postAttendanceUrl,
  logout,
  dashboardData,
  guards,
  postScanUrl,
} = ApiUrls;
// console.log({ apiBaseUrl });

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((req) => {
  // hook into appstate
  // useAppState.getState().resetModals();
  useAppState.getState().setLoading(true);
  const token = useAppState.getState().token;
  // console.log(req.data);
  // req.headers.Accept = 'application/json';

  if (token && req.headers) req.headers.Authorization = 'Bearer ' + token;
  return req;
});

axiosInstance.interceptors.response.use(
  (resp: any) => {
    useAppState.getState().setLoading(false);
    return resp;
  },
  async (error: AxiosError<any>) => {
    const { response } = error;

    const responseObj: ApiResponse = response?.data;
    // console.log({ responseObj }, response?.status);

    if (!responseObj?.status) {
      let urls = splitUrl(response?.request?.responseURL, '/');
      let endpoint = urls.length > 0 ? urls[urls.length - 1] : null;
      console.log(response?.status, 'code');

      if (response?.status === 401) {
        await clearStorageAsync(APP_STORAGE_KEY);
        // console.log('status', response?.status);
      }
      if (endpoint && [postAttendanceUrl].includes(`/${endpoint}`)) {
        Alert.alert('Error', responseObj?.message);
        return { data: responseObj };
      }
    }
    useAppState.getState().setLoading(false);
    return { data: responseObj };
  }
);

export const authentication = async (
  data: AuthenticateType
): Promise<LoginApiResponse> => {
  return (await axiosInstance.post(login, data)).data;
};

export const saveScan = async (
  data: ScanRequest
): Promise<ScansApiResponse> => {
  return (await axiosInstance.post(postScanUrl, data)).data;
};

export const postSecurityGuard = async (
  data: FormData
): Promise<PostGuardApiResponse> => {
  return (
    await axiosInstance.post(postGuard, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
    })
  ).data;
};

export const postAttendance = async (
  data: FormData
): Promise<PostAttendanceApiResponse> => {
  return (
    await axiosInstance.post(postAttendanceUrl, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
    })
  ).data;
};

export const logOutAction = async (
  data: LogoutRequest
): Promise<ApiResponse> => {
  return (await axiosInstance.post(logout, data)).data;
};

// GET REQUEST

export const fetchDashBoardData = async (): Promise<DashboardApiResponse> => {
  return (await axiosInstance.get(dashboardData)).data;
};
export const fetchGuards = async (): Promise<GuardsApiResponse> => {
  return (await axiosInstance.get(guards)).data;
};
