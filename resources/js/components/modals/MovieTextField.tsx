import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type MovieTextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
    id: string;
    label: string;
    lang?: string;
    error?: string;
};

export const MovieTextField = ({
    id,
    label,
    lang,
    error,
    className,
    ...props
}: MovieTextFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div
                className={cn(
                    'flex items-center gap-3 rounded-md border border-border/40 px-3 py-2.5',
                    error && 'border-brand',
                )}
            >
                <label
                    htmlFor={id}
                    className="shrink-0 text-sm whitespace-nowrap text-muted"
                >
                    {label}
                </label>
                <input
                    id={id}
                    name={id}
                    className={cn(
                        'min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-muted/60',
                        className,
                    )}
                    {...props}
                />
                {lang && (
                    <span className="shrink-0 text-sm text-muted">{lang}</span>
                )}
            </div>
            {error && <p className="text-sm text-brand">{error}</p>}
        </div>
    );
};
