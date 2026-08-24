import { z } from 'zod';

const lowercase = (value: string) => value === value.toLowerCase();

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Name must be at least 3 characters')
            .max(15, 'Name must be at most 15 characters')
            .refine(lowercase, { message: 'Name must be lowercase' }),
        email: z.email('Enter a valid email'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(15, 'Password must be at most 15 characters')
            .refine(lowercase, { message: 'Password must be lowercase' }),
        confirmPassword: z.string().min(1, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
    email: z.email('Enter a valid email'),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
