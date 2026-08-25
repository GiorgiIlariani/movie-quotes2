import { createInertiaApp } from '@inertiajs/react';

import { AuthModals } from '@/components/AuthLayout/AuthModals';
import { AuthModalProvider } from '@/contexts/auth-modal-context';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    withApp: (app) => (
        <AuthModalProvider>
            {app}
            <AuthModals />
        </AuthModalProvider>
    ),
});
