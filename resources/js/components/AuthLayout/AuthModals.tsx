import { ForgotPasswordForm } from '@/components/AuthLayout/Forms/ForgotPasswordForm';
import { LoginForm } from '@/components/AuthLayout/Forms/LoginForm';
import { RegisterForm } from '@/components/AuthLayout/Forms/RegisterForm';
import { CheckEmailModal } from '@/components/AuthLayout/ResponseModals/CheckEmailModal';
import { LinkExpiredModal } from '@/components/AuthLayout/ResponseModals/LinkExpiredModal';
import { PasswordChangedModal } from '@/components/AuthLayout/ResponseModals/PasswordChangedModal';
import { ThankYouModal } from '@/components/AuthLayout/ResponseModals/ThankYouModal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function AuthModals() {
    const { modal, close } = useAuthModal();

    return (
        <Dialog
            open={modal !== null}
            onOpenChange={(open) => {
                if (!open) {
                    close();
                }
            }}
        >
            <DialogContent
                overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-xs"
                className="w-full max-w-150 overflow-y-auto bg-surface px-8 py-15 text-white ring-0 **:data-[slot=dialog-close]:text-white"
            >
                {modal === 'register' ? <RegisterForm /> : null}
                {modal === 'login' ? <LoginForm /> : null}
                {modal === 'forgotPassword' ? <ForgotPasswordForm /> : null}
                {modal === 'passwordChanged' ? <PasswordChangedModal /> : null}
                {modal === 'linkExpired' ? <LinkExpiredModal /> : null}
                {modal === 'checkEmail' ? <CheckEmailModal /> : null}
                {modal === 'thankYou' ? <ThankYouModal /> : null}
            </DialogContent>
        </Dialog>
    );
}
