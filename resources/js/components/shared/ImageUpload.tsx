import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

type ImageUploadProps = {
    name?: string;
    hint: string;
    buttonLabel: string;
    changeLabel: string;
    src?: string | null;
};

const ImageUpload = ({
    name = 'cover',
    hint,
    buttonLabel,
    changeLabel,
    src,
}: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(src ?? null);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setPreview((current) => {
            if (current) {
                URL.revokeObjectURL(current);
            }

            return URL.createObjectURL(file);
        });
    };

    return (
        <label className="block w-full cursor-pointer">
            {preview ? (
                <span className="group relative block overflow-hidden rounded-xl">
                    <img
                        src={preview}
                        alt=""
                        className="aspect-video w-full object-cover"
                    />
                    <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-md bg-black/70 px-4 py-3 text-white opacity-0 group-hover:opacity-100">
                        <Camera className="size-5" strokeWidth={1.5} />
                        <span className="text-sm whitespace-nowrap">
                            {changeLabel}
                        </span>
                    </span>
                </span>
            ) : (
                <span className="flex w-full items-center gap-3 rounded-md border border-border/70 bg-transparent px-4 py-3">
                    <Camera
                        className="size-5 shrink-0 text-white"
                        strokeWidth={1.75}
                    />
                    <span className="text-sm text-white">{hint}</span>
                    <span className="actionBtn shrink-0 bg-[#7C3AED] px-4 py-1.5! hover:bg-[#7C3AED]/90">
                        {buttonLabel}
                    </span>
                </span>
            )}
            <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="sr-only"
            />
        </label>
    );
};

export default ImageUpload;
