import dayjs from 'dayjs';

export function convertDateFormat(
  inputDate: Date | string,
  // inputFormat: string,
  outputFormat: string = 'MMM D, YYYY'
): string {
  return dayjs(inputDate).format(outputFormat);
}
export const APP_STORAGE_KEY = 'PERFT_AUTH_STORE';
