import { Form, Link, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { destroy } from '@/wayfinder/App/Http/Controllers/SessionController';
import { home } from '@/wayfinder/routes';

const Navbar = () => {
    const { user } = usePage().props.auth;
    const { open } = useAuthModal();

    return (
        <header className="fixed top-0 left-0 z-10 w-full">
            <nav className="flex items-center justify-between px-4 py-7 md:px-18 md:py-8">
                <Link href={home.url()} className="text-cream uppercase">
                    Movie Quotes
                </Link>

                {user ? (
                    <Form action={destroy()}>
                        <Button
                            type="submit"
                            variant="outline"
                            className="actionBtn"
                        >
                            Log Out
                        </Button>
                    </Form>
                ) : (
                    <div className="flex items-center justify-between gap-4">
                        <Button
                            onClick={() => open('register')}
                            className="actionBtn bg-brand"
                        >
                            Sign Up
                        </Button>
                        <Button
                            onClick={() => open('login')}
                            variant="outline"
                            className="actionBtn"
                        >
                            Log In
                        </Button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
