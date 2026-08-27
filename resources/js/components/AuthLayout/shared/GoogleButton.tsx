import type { PropsWithChildren } from 'react';
import GoogleIcon from '@/images/icons/Google.png';
import { redirect } from '@/wayfinder/App/Http/Controllers/GoogleController';

export function GoogleButton({ children }: PropsWithChildren) {
    return (
        <a
            href={redirect.url()}
            target="_blank"
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-white bg-transparent text-sm text-white transition-colors hover:bg-white/5"
        >
            <img src={GoogleIcon} alt="google icon" />
            {children}
        </a>
    );
}
