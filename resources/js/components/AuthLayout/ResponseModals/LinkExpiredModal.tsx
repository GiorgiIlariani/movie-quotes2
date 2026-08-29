import { ResponseModalLayout } from './ResponseModalLayout';
import Expired from '@/images/icons/Expired.png';

export function LinkExpiredModal() {
    return (
        <ResponseModalLayout
            icon={Expired}
            title="Link expired!"
            description="Login link has expired, because you haven't used it"
            actionLabel="Request another link"
        />
    );
}
