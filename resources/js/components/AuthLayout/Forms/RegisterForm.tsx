import { Form } from '@inertiajs/react';

import { AuthFormLayout } from '@/components/AuthLayout/AuthFormLayout';
import { AuthPasswordField } from '@/components/AuthLayout/shared/AuthPasswordField';
import { AuthTextField } from '@/components/AuthLayout/shared/AuthTextField';
import { GoogleButton } from '@/components/AuthLayout/shared/GoogleButton';
import { useAuthModal } from '@/contexts/auth-modal-context';

import { store } from '@/wayfinder/App/Http/Controllers/UserController';
import { registerFields } from './helper';

export function RegisterForm() {
    const { open } = useAuthModal();

    return (
        <AuthFormLayout
            title="Create an account"
            description="Start your journey!"
        >
            <Form className="flex flex-col gap-4" action={store()}>
                {({ errors }) => (
                    <>
                        {registerFields.map((field) =>
                            field.type === 'password' ? (
                                <AuthPasswordField
                                    key={field.id}
                                    id={field.id}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    error={errors[field.id]}
                                />
                            ) : (
                                <AuthTextField
                                    key={field.id}
                                    id={field.id}
                                    label={field.label}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    error={errors[field.id]}
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
                    </>
                )}
            </Form>

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
