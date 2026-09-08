import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type MovieTextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
    id: string;
    label: string;
    lang?: string;
    error?: string;
};

export const MovieTextArea = ({
    id,
    label,
    lang,
    error,
    className,
    ...props
}: MovieTextAreaProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div
                className={cn(
                    'flex items-start gap-3 rounded-md border border-border/40 px-3 py-2.5',
                    error && 'border-brand',
                )}
            >
                <label
                    htmlFor={id}
                    className="shrink-0 pt-0.5 text-sm whitespace-nowrap text-muted"
                >
                    {label}
                </label>
                <textarea
                    id={id}
                    name={id}
                    rows={3}
                    className={cn(
                        'min-w-0 flex-1 resize-y bg-transparent text-sm text-white outline-none placeholder:text-muted/60',
                        className,
                    )}
                    {...props}
                />
                {lang && (
                    <span className="shrink-0 pt-0.5 text-sm text-muted">
                        {lang}
                    </span>
                )}
            </div>
            {error && <p className="text-sm text-brand">{error}</p>}
        </div>
    );
};
