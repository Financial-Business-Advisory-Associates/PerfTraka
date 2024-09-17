import { ApiUrls, apiBaseUrl } from '@/constants/ApiUrl';
import axios, { AxiosError } from 'axios';
import { useAppState } from '../zus/store';
import {
  ApiResponse,
  AttendanceApiResponse,
  GuardsApiResponse,
  QueryParams,
  ScansApiResponse,
} from '@/types';
import { Alert } from 'react-native';

export const apiInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

apiInstance.interceptors.request.use((req) => {
  // hook into appstate
  const token = useAppState.getState().token;
  if (token && req.headers) req.headers.Authorization = 'Bearer ' + token;
  return req;
});

apiInstance.interceptors.response.use(
  (resp: any) => {
    // useAppState.getState().setLoading(false);
    return resp;
  },
  (error: AxiosError<any>) => {
    const { response } = error;
    const responseObj: ApiResponse = response?.data;
    console.log({ responseObj });

    if (!responseObj?.status) {
      Alert.alert('Error', responseObj?.message);
    }
    // useAppState.getState().setLoading(false);
    return { data: responseObj };
  }
);

export const fetchAttendances = async ({
  perPage = 20,
  startDate,
  endDate,
}: QueryParams): Promise<AttendanceApiResponse> => {
  let searchParam = '';
  if (startDate) searchParam += '&attendance_date_from_date=' + startDate;
  if (endDate) searchParam += '&attendance_date_to_date=' + endDate;
  if (startDate && endDate) {
    searchParam += '&date=yes';
  } else {
    searchParam = '';
  }

  return (
    await apiInstance.get(
      ApiUrls.getAttendances + `?per_page=${perPage}${searchParam}`
    )
  ).data;
};
export const fetchScans = async ({
  perPage = 20,
  startDate,
  endDate,
}: QueryParams): Promise<ScansApiResponse> => {
  let searchParam = '';
  if (startDate) searchParam += '&scan_date_from_date=' + startDate;
  if (endDate) searchParam += '&scan_date_to_date=' + endDate;
  if (startDate && endDate) {
    searchParam += '&date=yes';
  } else {
    searchParam = '';
  }

  return (
    await apiInstance.get(
      ApiUrls.getScans + `?per_page=${perPage}${searchParam}`
    )
  ).data;
};

export const searchGuards = async ({
  name = '',
}: {
  name: string;
}): Promise<GuardsApiResponse> => {
  return (await apiInstance.get(ApiUrls.guards + `?searchTerm=${name}`)).data;
};
