import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthFormLayout } from '@/components/AuthLayout/AuthFormLayout';
import { AuthPasswordField } from '@/components/AuthLayout/shared/AuthPasswordField';
import { AuthTextField } from '@/components/AuthLayout/shared/AuthTextField';
import { GoogleButton } from '@/components/AuthLayout/shared/GoogleButton';
import { useAuthModal } from '@/contexts/auth-modal-context';
import type { RegisterValues } from '@/schemas/auth-forms';
import { registerSchema } from '@/schemas/auth-forms';

import { registerFields } from './helper';

export function RegisterForm() {
    const { open } = useAuthModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <AuthFormLayout
            title="Create an account"
            description="Start your journey!"
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(() => undefined)}
                noValidate
            >
                {registerFields.map((field) =>
                    field.type === 'password' ? (
                        <AuthPasswordField
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            error={errors[field.id]?.message}
                            {...register(field.id)}
                        />
                    ) : (
                        <AuthTextField
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            error={errors[field.id]?.message}
                            {...register(field.id)}
                        />
                    ),
                )}
                <div className="flex flex-col gap-3 pt-2">
                    <button
                        type="submit"
                        className="h-10 w-full rounded-sm bg-brand text-sm text-white transition-colors hover:bg-brand/90"
                    >
                        Get started
                    </button>
                    <GoogleButton>Sign up with Google</GoogleButton>
                </div>
            </form>

            <p className="text-center text-sm text-white/70">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => {
                        open('login');
                    }}
                    className="text-info hover:underline"
                >
                    Log in
                </button>
            </p>
        </AuthFormLayout>
    );
}
