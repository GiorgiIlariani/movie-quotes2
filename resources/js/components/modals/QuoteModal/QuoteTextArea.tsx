import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type QuoteTextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
    id: string;
    lang: string;
    error?: string;
};

export const QuoteTextArea = ({
    id,
    lang,
    error,
    className,
    ...props
}: QuoteTextAreaProps) => {
    return (
        <div className="relative w-full">
            <textarea
                id={id}
                name={id}
                rows={4}
                className={cn(
                    'w-full resize-y rounded-md border border-border/70 bg-transparent px-4 py-3 pr-14 text-sm text-white caret-white outline-none placeholder:italic placeholder:text-white/70',
                    error && 'border-brand',
                    className,
                )}
                {...props}
            />
            <span className="pointer-events-none absolute top-3 right-4 text-sm text-white/80">
                {lang}
            </span>
        </div>
    );
};
