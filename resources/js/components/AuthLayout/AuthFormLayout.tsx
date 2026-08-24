import type { PropsWithChildren } from 'react';

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type AuthFormLayoutProps = PropsWithChildren & {
    title: string;
    description: string;
};

export function AuthFormLayout({
    title,
    description,
    children,
}: AuthFormLayoutProps) {
    return (
        <div className="mx-auto flex w-full max-w-90 flex-col gap-6">
            <DialogHeader className="items-center text-center">
                <DialogTitle className="text-2xl font-medium text-white">
                    {title}
                </DialogTitle>
                <DialogDescription className="text-sm text-white/70">
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
        </div>
    );
}
