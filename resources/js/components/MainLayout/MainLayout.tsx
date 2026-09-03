import type { PropsWithChildren } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';
import DesktopLayout from './Components/DesktopLayout';
import MobileLayout from './Components/MobileLayout';

const MainLayout = ({ children }: PropsWithChildren) => {
    const isMobile = useIsMobile(1024);

    return (
        <div className="main-layout-bg min-h-dvh">
            {isMobile ? (
                <MobileLayout>{children}</MobileLayout>
            ) : (
                <DesktopLayout>{children}</DesktopLayout>
            )}
        </div>
    );
};

export default MainLayout;
