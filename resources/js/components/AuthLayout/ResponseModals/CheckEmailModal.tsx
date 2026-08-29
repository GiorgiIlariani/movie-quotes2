import { useAuthModal } from '@/contexts/auth-modal-context';
import { ResponseModalLayout } from './ResponseModalLayout';
import EmailSent from '@/images/icons/EmailSent.png';

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
