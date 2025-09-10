import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .max(32, { message: 'Name must not exceed 32 characters.' }),

    email: z.string()
      .email({ message: 'Please enter a valid email address.' })
      .max(32, { message: 'Email must not exceed 32 characters.' }),

    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(32, { message: 'Password must not exceed 32 characters.' }),

    confirmPassword: z.string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(32, { message: 'Password must not exceed 32 characters.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;