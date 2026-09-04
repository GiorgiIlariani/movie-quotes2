import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 767;

export function useIsMobile(breakPoint: number): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(max-width: ${breakPoint ? breakPoint : MOBILE_MAX_WIDTH}px)`,
        );

        const update = () => {
            setIsMobile(mediaQuery.matches);
        };

        update();
        mediaQuery.addEventListener('change', update);

        return () => {
            mediaQuery.removeEventListener('change', update);
        };
    }, [breakPoint]);

    return isMobile;
}
