import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type AuthTextFieldProps = ComponentProps<'input'> & {
    label: string;
    error?: string;
};

export function AuthTextField({
    id,
    label,
    error,
    className,
    ...props
}: AuthTextFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-white">
                {label}
            </label>
            <input
                id={id}
                name={id}
                className={cn(
                    'h-10 w-full rounded-sm bg-white px-3 text-sm text-black outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand/40',
                    error && 'ring-2 ring-brand',
                    className,
                )}
                {...props}
            />
            {error ? <p className="text-sm text-brand">{error}</p> : null}
        </div>
    );
}
