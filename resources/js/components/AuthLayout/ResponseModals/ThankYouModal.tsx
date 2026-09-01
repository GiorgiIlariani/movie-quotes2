import EmailSent from '@/images/icons/EmailSent.png';
import { ResponseModalLayout } from './ResponseModalLayout';

export function ThankYouModal() {
    return (
        <ResponseModalLayout
            icon={EmailSent}
            title="Thank you!"
            description="Please check your email and follow the instructions to activate your account."
            actionLabel="Go to my email"
        />
    );
}
