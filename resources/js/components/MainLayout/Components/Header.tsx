import { Form, Link } from '@inertiajs/react';

import LocaleSelect from '@/components/MainLayout/Components/LocaleSelect';
import NotificationBell from '@/components/MainLayout/Components/NotificationBell';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { destroy } from '@/wayfinder/App/Http/Controllers/SessionController';
import { home } from '@/wayfinder/routes';

const Header = () => {
    const { header } = useTranslations();

    return (
        <header className="flex items-center justify-between bg-surface px-16 py-6 text-white">
            <Link href={home()} className="text-cream uppercase">
                {header.brand}
            </Link>

            <div className="flex items-center gap-6">
                <NotificationBell />

                <LocaleSelect />

                <Form action={destroy()}>
                    <Button
                        type="submit"
                        variant="outline"
                        className="actionBtn bg-transparent"
                    >
                        {header.log_out}
                    </Button>
                </Form>
            </div>
        </header>
    );
};

export default Header;
