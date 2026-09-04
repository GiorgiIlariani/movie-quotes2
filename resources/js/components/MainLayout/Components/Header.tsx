import { Form, Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Bell from '@/images/icons/Bell.png';
import { destroy } from '@/wayfinder/App/Http/Controllers/SessionController';
import { home } from '@/wayfinder/routes';

const Header = () => {
    return (
        <header className="flex items-center justify-between bg-surface px-16 py-6 text-white">
            <Link href={home()} className="text-cream uppercase">
                Movie Quotes
            </Link>

            <div className="flex items-center gap-6">
                <button type="button" className="relative cursor-pointer">
                    <img src={Bell} alt="Notifications" className="size-6" />
                </button>

                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1"
                >
                    Eng
                    <ChevronDown className="size-4" />
                </button>

                <Form action={destroy()}>
                    <Button
                        type="submit"
                        variant="outline"
                        className="actionBtn bg-transparent"
                    >
                        Log out
                    </Button>
                </Form>
            </div>
        </header>
    );
};

export default Header;
