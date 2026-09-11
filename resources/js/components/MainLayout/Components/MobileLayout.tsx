import { Menu } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import LocaleSelect from '@/components/MainLayout/Components/LocaleSelect';
import NotificationBell from '@/components/MainLayout/Components/NotificationBell';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslations } from '@/hooks/use-translations';
import Search from '@/images/icons/Search.png';
import Navigation from './Navigation';

const MobileLayout = ({ children }: PropsWithChildren) => {
    const { header } = useTranslations();

    return (
        <div className="min-h-dvh">
            <header className="flex items-center justify-between bg-surface px-9 py-8 text-white">
                <Sheet>
                    <SheetTrigger
                        aria-label={header.open_navigation}
                        className="cursor-pointer"
                    >
                        <Menu className="size-6" />
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        showCloseButton={false}
                        className="main-layout-bg border-0 p-0 sm:max-w-80"
                    >
                        <SheetTitle className="sr-only">
                            {header.navigation}
                        </SheetTitle>
                        <Navigation />
                    </SheetContent>
                </Sheet>
                <div className="flex items-center gap-4">
                    <img
                        src={Search}
                        alt={header.search}
                        className="hidden size-6 lg:block"
                    />
                    <NotificationBell />
                    <LocaleSelect />
                </div>
            </header>
            <main className="py-6 text-white">{children}</main>
        </div>
    );
};

export default MobileLayout;
