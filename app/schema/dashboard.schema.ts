import * as Yup from 'yup';

export const AddGuardSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),

  lastName: Yup.string().required('Last name is required'),
  avatar: Yup.mixed(),
});
export type AddGuardSchemaType = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export const TakeAttendanceSchema = Yup.object().shape({
  security_guard_id: Yup.string().required('Security guard is required'),

  status: Yup.string()
    .oneOf(['check_in', 'check_out'])
    .required('select a valid status'),
  comment: Yup.string().required('A comment about the shift is required'),
  avatar: Yup.string().required('Kindly take a picture'),
});
export type TakeAttendanceSchemaType = {
  security_guard_id?: string;
  status?: 'check_in' | 'check_out';
  comment?: string;
  avatar?: string;
};
export type TakeAttendanceErrorType = {
  security_guard_id?: string;
  status?: string;
  comment?: string;
  avatar?: string;
};

export const LogoutSchema = Yup.object().shape({
  pin: Yup.string().required('Security Pin is required'),
});
