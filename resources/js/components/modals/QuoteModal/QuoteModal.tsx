import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type QuoteModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const QuoteModal = ({ open, onOpenChange }: QuoteModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                overlayClassName="bg-black/10 supports-backdrop-filter:backdrop-blur-none"
                className="max-h-[90vh] w-full max-w-4xl scrollbar-none overflow-y-auto bg-background px-0 py-8 text-white ring-0 **:data-[slot=dialog-close]:text-white"
            >
                <DialogHeader>
                    <DialogTitle className="sr-only">Quote</DialogTitle>
                    <DialogDescription className="sr-only">
                        Quote
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default QuoteModal;
