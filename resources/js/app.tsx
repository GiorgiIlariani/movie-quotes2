import { createInertiaApp } from '@inertiajs/react';

import { AuthModals } from '@/components/AuthLayout/AuthModals';
import { AuthModalProvider } from '@/contexts/auth-modal-context';
import { configureEcho } from '@laravel/echo-react';

configureEcho({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    wsHost: undefined,
    wsPort: undefined,
    wssPort: undefined,
});

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
