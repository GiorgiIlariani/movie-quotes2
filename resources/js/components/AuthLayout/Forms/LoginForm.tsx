import { Form } from '@inertiajs/react';

import { AuthFormLayout } from '@/components/AuthLayout/AuthFormLayout';
import { AuthPasswordField } from '@/components/AuthLayout/shared/AuthPasswordField';
import { AuthTextField } from '@/components/AuthLayout/shared/AuthTextField';
import { GoogleButton } from '@/components/AuthLayout/shared/GoogleButton';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { store } from '@/wayfinder/App/Http/Controllers/SessionController';

export function LoginForm() {
    const { open, close } = useAuthModal();

    return (
        <AuthFormLayout
            title="Log in to your account"
            description="Welcome back! Please enter your details."
        >
            <Form
                className="flex flex-col gap-4"
                action={store()}
                onSuccess={close}
            >
                {({ errors }) => (
                    <>
                        <AuthTextField
                            id="nameOrEmail"
                            label="Email or username"
                            type="text"
                            placeholder="Enter your email or username"
                            error={errors.nameOrEmail}
                        />
                        <AuthPasswordField
                            id="password"
                            label="Password"
                            placeholder="Password"
                            error={errors.password}
                        />
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-white">
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    className="size-4 rounded-sm border-white accent-brand"
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

                        {errors.error && (
                            <p className="mx-auto text-sm text-brand">
                                {errors.error}
                            </p>
                        )}

                        <div className="flex flex-col gap-3 pt-2">
                            <Button
                                type="submit"
                                className="h-10 w-full cursor-pointer rounded-sm bg-brand text-sm text-white transition-colors hover:bg-brand/90"
                            >
                                Sign in
                            </Button>
                            <GoogleButton>Sign in with Google</GoogleButton>
                        </div>
                    </>
                )}
            </Form>

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
