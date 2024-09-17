import { IPerfTrakaApi } from '@/types';
import expoAppConfig from '../app.json';

// get api version for mobile app

// use apiBaseDev for development and apiBaseProd for production
export const apiBaseUrl = (
  process.env.NODE_ENV === 'development'
    ? expoAppConfig.apiBaseUrlDev
    : expoAppConfig.apiBaseUrlProd
).trim();

// export const apiBaseUrl = apiBaseUrlVersionParam.replace(
//   '{apiVersion}',
//   apiVersion
// );

type ApiUrl = { [key in keyof IPerfTrakaApi]: string };

export const ApiUrls: ApiUrl = {
  // test network connection
  testNetworkConnection: '/test',
  login: '/auth/login/',
  logout: '/auth/logout',

  dashboardData: '/dashboard',
  guards: '/guards',
  getScans: '/scans',
  getAttendances: '/attendances',

  postGuard: '/guards',
  postAttendanceUrl: '/attendances',
  postScanUrl: '/scans',
};
