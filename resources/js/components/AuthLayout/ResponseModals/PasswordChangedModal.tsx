import { useAuthModal } from '@/contexts/auth-modal-context';
import Success from '@/images/icons/Success.png';
import { ResponseModalLayout } from './ResponseModalLayout';

export function PasswordChangedModal() {
    const { open } = useAuthModal();

    return (
        <ResponseModalLayout
            icon={Success}
            title="Success!"
            description="Your Password changed successfully"
            actionLabel="Log in"
            onAction={() => {
                open('login');
            }}
        />
    );
}
