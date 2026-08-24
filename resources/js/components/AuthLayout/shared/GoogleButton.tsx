import type { PropsWithChildren } from 'react';

import GoogleIcon from '@/images/icons/Google.png';
import { Button } from '@/components/ui/button';

export function GoogleButton({ children }: PropsWithChildren) {
    return (
        <Button
            variant="outline"
            type="button"
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-white bg-transparent text-sm text-white transition-colors hover:bg-white/5"
        >
            <img src={GoogleIcon} alt="google icon" />
            {children}
        </Button>
    );
}
