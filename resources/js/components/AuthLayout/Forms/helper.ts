import type { RegisterValues } from '@/schemas/auth-forms';

type RegisterField = {
    id: keyof RegisterValues;
    label: string;
    type: string;
    placeholder: string;
};

export const registerFields: RegisterField[] = [
    {
        id: 'username',
        label: 'Name',
        type: 'text',
        placeholder: 'At least 3 characters & lower case characters',
    },
    {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'At least 8 & max 15 lower case characters',
    },
    {
        id: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Confirm password',
    },
];
