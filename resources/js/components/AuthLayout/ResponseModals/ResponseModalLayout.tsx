import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type ResponseModalLayoutProps = {
    icon: string;
    title: string;
    description: string;
    actionLabel: string;
    onAction?: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
};

export function ResponseModalLayout({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    secondaryLabel,
    onSecondary,
}: ResponseModalLayoutProps) {
    return (
        <div className="mx-auto flex w-full max-w-90 flex-col items-center gap-6 text-center">
            <DialogHeader className="items-center gap-4 text-center">
                <img src={icon} alt="modal icon" />
                <DialogTitle className="text-2xl font-medium text-white">
                    {title}
                </DialogTitle>
                <DialogDescription className="text-sm text-white/70">
                    {description}
                </DialogDescription>
            </DialogHeader>

            <div className="flex w-full flex-col items-center gap-3">
                <button
                    type="button"
                    onClick={onAction}
                    className="h-10 w-full rounded-sm bg-brand text-sm text-white transition-colors hover:bg-brand/90"
                >
                    {actionLabel}
                </button>
                {secondaryLabel ? (
                    <button
                        type="button"
                        onClick={onSecondary}
                        className="text-sm text-white/70 hover:underline"
                    >
                        {secondaryLabel}
                    </button>
                ) : null}
            </div>
        </div>
    );
}
