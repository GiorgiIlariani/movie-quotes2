import { Form, Link, usePage } from '@inertiajs/react';

import LocaleSelect from '@/components/MainLayout/Components/LocaleSelect';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { useTranslations } from '@/hooks/use-translations';
import { destroy } from '@/wayfinder/App/Http/Controllers/SessionController';
import { home } from '@/wayfinder/routes';

const Navbar = () => {
    const { user } = usePage().props.auth;
    const { open } = useAuthModal();
    const { header } = useTranslations();

    return (
        <header className="fixed top-0 left-0 z-10 w-full">
            <nav className="flex items-center justify-between px-4 py-7 md:px-18 md:py-8">
                <Link href={home()} className="text-cream uppercase">
                    {header.brand}
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    <LocaleSelect />

                    {user ? (
                        <Form action={destroy()}>
                            <Button
                                type="submit"
                                variant="outline"
                                className="actionBtn"
                            >
                                {header.log_out}
                            </Button>
                        </Form>
                    ) : (
                        <div className="flex items-center justify-between gap-4">
                            <Button
                                onClick={() => open('register')}
                                className="actionBtn bg-brand"
                            >
                                {header.sign_up}
                            </Button>
                            <Button
                                onClick={() => open('login')}
                                variant="outline"
                                className="actionBtn"
                            >
                                {header.log_in}
                            </Button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
