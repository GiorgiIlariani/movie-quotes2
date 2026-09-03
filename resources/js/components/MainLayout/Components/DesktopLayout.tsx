import type { PropsWithChildren } from 'react';

import Header from './Header';
import Navigation from './Navigation';

const DesktopLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="min-h-dvh">
            <Header />
            <div className="flex">
                <aside className="w-sm shrink-0">
                    <Navigation />
                </aside>
                <main className="min-w-0 flex-1 px-8 py-8 text-white">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DesktopLayout;
