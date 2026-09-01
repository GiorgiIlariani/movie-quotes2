import { useAuthModal } from '@/contexts/auth-modal-context';
import EmailSent from '@/images/icons/EmailSent.png';
import { ResponseModalLayout } from './ResponseModalLayout';

export function CheckEmailModal() {
    const { close } = useAuthModal();

    return (
        <ResponseModalLayout
            icon={EmailSent}
            title="Check your email"
            description="We have sent a password recover instructions to your email"
            actionLabel="Go to my email"
            secondaryLabel="Skip, I'll confirm later"
            onSecondary={close}
        />
    );
}
