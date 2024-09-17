// import { z } from 'zod';

// export const AuthenticateSchema = z.object({
//   email: z.string().email({ message: 'please provide a valid email address' }),
//   password: z.string(),
// });

// export type AuthenticateType = z.infer<typeof AuthenticateSchema>;

import * as Yup from 'yup';

export const AuthenticateSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is Invalid')
    .required('Email Cannot Be Empty'),
  password: Yup.string().required('Password Cannot Be Empty'),
});
export type AuthenticateType = {
  email?: string;
  password?: string;
};
