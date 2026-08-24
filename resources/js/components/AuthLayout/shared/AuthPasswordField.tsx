import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type AuthPasswordFieldProps = Omit<ComponentProps<'input'>, 'type'> & {
    label: string;
    error?: string;
};

export function AuthPasswordField({
    id,
    label,
    error,
    className,
    ...props
}: AuthPasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-white">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={visible ? 'text' : 'password'}
                    className={cn(
                        'h-10 w-full rounded-sm bg-white px-3 pr-10 text-sm text-black outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand/40',
                        error && 'ring-2 ring-brand',
                        className,
                    )}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => {
                        setVisible((current) => !current);
                    }}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    {visible ? (
                        <EyeOff className="size-4" />
                    ) : (
                        <Eye className="size-4" />
                    )}
                </button>
            </div>
            {error ? <p className="text-sm text-brand">{error}</p> : null}
        </div>
    );
}
