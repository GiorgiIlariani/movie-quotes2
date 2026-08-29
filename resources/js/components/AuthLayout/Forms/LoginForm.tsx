import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthFormLayout } from '@/components/AuthLayout/AuthFormLayout';
import { AuthPasswordField } from '@/components/AuthLayout/shared/AuthPasswordField';
import { AuthTextField } from '@/components/AuthLayout/shared/AuthTextField';
import { GoogleButton } from '@/components/AuthLayout/shared/GoogleButton';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { loginSchema } from '@/schemas/auth-forms';
import type { LoginValues } from '@/schemas/auth-forms';

export function LoginForm() {
    const { open } = useAuthModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    return (
        <AuthFormLayout
            title="Log in to your account"
            description="Welcome back! Please enter your details."
        >
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(() => undefined)}
                noValidate
            >
                <AuthTextField
                    id="login-email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <AuthPasswordField
                    id="login-password"
                    label="Password"
                    placeholder="Password"
                    error={errors.password?.message}
                    {...register('password')}
                />
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-white">
                        <input
                            type="checkbox"
                            className="size-4 rounded-sm border-white accent-brand"
                            {...register('remember')}
                        />
                        Remember me
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            open('forgotPassword');
                        }}
                        className="text-sm text-info hover:underline"
                    >
                        Forgot password
                    </button>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                    <Button
                        type="submit"
                        className="h-10 w-full cursor-pointer rounded-sm bg-brand text-sm text-white transition-colors hover:bg-brand/90"
                    >
                        Sign in
                    </Button>
                    <GoogleButton>Sign in with Google</GoogleButton>
                </div>
            </form>

            <p className="text-center text-sm text-white/70">
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={() => {
                        open('register');
                    }}
                    className="text-info hover:underline"
                >
                    Sign up
                </button>
            </p>
        </AuthFormLayout>
    );
}
