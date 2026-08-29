import { useAuthModal } from '@/contexts/auth-modal-context';
import { ResponseModalLayout } from './ResponseModalLayout';
import Success from '@/images/icons/Success.png';

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
