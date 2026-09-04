import { Menu } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Bell from '@/images/icons/Bell.png';
import Search from '@/images/icons/Search.png';
import Navigation from './Navigation';

const MobileLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-dvh">
            <header className="flex items-center justify-between bg-surface px-9 py-8 text-white">
                <Sheet>
                    <SheetTrigger
                        aria-label="Open navigation"
                        className="cursor-pointer"
                    >
                        <Menu className="size-6" />
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        showCloseButton={false}
                        className="main-layout-bg border-0 p-0 sm:max-w-80"
                    >
                        <SheetTitle className="sr-only">Navigation</SheetTitle>
                        <Navigation />
                    </SheetContent>
                </Sheet>
                <div className="flex items-center gap-4">
                    <img
                        src={Search}
                        alt="Search"
                        className="hidden size-6 lg:block"
                    />
                    <img src={Bell} alt="Notifications" className="size-6" />
                </div>
            </header>
            <main className="py-6 text-white">{children}</main>
        </div>
    );
};

export default MobileLayout;
