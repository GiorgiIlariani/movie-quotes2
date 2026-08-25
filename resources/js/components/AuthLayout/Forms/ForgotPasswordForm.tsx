import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthFormLayout } from '@/components/AuthLayout/AuthFormLayout';
import { AuthTextField } from '@/components/AuthLayout/shared/AuthTextField';

import { useAuthModal } from '@/contexts/auth-modal-context';
import {
    forgotPasswordSchema,
    ForgotPasswordValues,
} from '@/schemas/auth-forms';

export function ForgotPasswordForm() {
    const { open } = useAuthModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    return (
        <AuthFormLayout
            title="Forgot your password?"
            description="Enter the email address associated with your account and we'll send you a link to reset your password."
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(() => undefined)}
                noValidate
            >
                <AuthTextField
                    id="forgot-password-email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <button
                    type="submit"
                    className="mt-2 h-10 w-full rounded-sm bg-brand text-sm text-white transition-colors hover:bg-brand/90"
                >
                    Send instructions
                </button>
            </form>

            <p className="text-center text-sm text-white/70">
                <button
                    type="button"
                    onClick={() => {
                        open('login');
                    }}
                    className="text-info hover:underline"
                >
                    Back to log in
                </button>
            </p>
        </AuthFormLayout>
    );
}
