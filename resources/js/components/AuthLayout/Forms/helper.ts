type FieldIdTypes = 'name' | 'email' | 'password' | 'confirmPassword';

type RegisterField = {
    id: FieldIdTypes;
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
};

export const registerFields: RegisterField[] = [
    {
        id: 'name',
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
