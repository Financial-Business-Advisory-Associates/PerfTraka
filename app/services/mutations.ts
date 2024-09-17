import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  authentication,
  logOutAction,
  postAttendance,
  postSecurityGuard,
  saveScan,
} from './api';
import { AuthenticateType } from '../schema/login.schema';
import { AddGuardSchemaType } from '../schema/dashboard.schema';
import { LogoutRequest, ScanRequest } from '@/types';

export const useAuthenticationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AuthenticateType) => authentication(data),
    onMutate: () => {
      // console.log('before mutation');
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
    onError: (error: Error) => {
      // console.log(error);
    },
    onSettled: () => {},
  });
};

export const usePostSecurityGuard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postSecurityGuard(data),
    onSuccess: () => {
      // Manually refetch the dashboard data after creating a new security guard
      queryClient.refetchQueries({ queryKey: ['dashboard_data'] });
    },
    onError: (error: Error) => {
      // console.log(error);
    },
    onSettled: () => {},
  });
};

export const usePostAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard_data'],
      });
      queryClient.invalidateQueries({
        queryKey: ['security_guards'],
      });
      // Manually refetch the dashboard data after creating a new security guard
      queryClient.refetchQueries({ queryKey: ['dashboard_data'] });
    },
    onError: (error: Error) => {
      // console.log(error);
    },
    onSettled: () => {},
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: (data: LogoutRequest) => logOutAction(data),
    onSuccess: () => {},
    onError: (error: Error) => {
      // console.log(error);
    },
    onSettled: () => {},
  });
};

export const useSaveScan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ScanRequest) => saveScan(data),
    onSuccess: () => {
      // Manually refetch the dashboard data after creating a new security guard
      queryClient.refetchQueries({ queryKey: ['dashboard_data'] });
    },
    onError: (error: Error) => {
      console.log(error);
    },
    onSettled: () => {},
  });
};
