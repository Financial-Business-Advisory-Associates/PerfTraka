import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchDashBoardData, fetchGuards } from './api';
import { fetchAttendances, fetchScans } from './annonymousApi';
import { convertDateFormat } from '@/constants/helpers';
import { QueryParams } from '@/types';

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashBoardData,
  });
};
export const useFetchGuardsQuery = () => {
  return useQuery({
    queryKey: ['guards'],
    queryFn: fetchGuards,
  });
};

export const useFetchAppData = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['dashboard_data'],
        queryFn: fetchDashBoardData,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 1000,
      },
      {
        queryKey: ['security_guards'],
        queryFn: fetchGuards,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 1000,
      },
    ],
  });
};

export const useFetchScansQuery = ({
  startDate,
  endDate,
  perPage,
}: QueryParams) => {
  return useQuery({
    queryKey: ['getScans', startDate, endDate],
    queryFn: () => fetchScans({ perPage, startDate, endDate }),
  });
};
export const useFetchAttendancesQuery = ({
  startDate,
  endDate,
  perPage,
}: QueryParams) => {
  return useQuery({
    queryKey: ['getAttendances', startDate, endDate],
    queryFn: () => fetchAttendances({ startDate, endDate, perPage }),
  });
};
