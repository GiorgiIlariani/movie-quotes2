import { createContext, useContext, useState } from 'react';
import type { ReactNode, SetStateAction } from 'react';

export type AuthModal = 'login' | 'register' | 'forgotPassword';

type AuthModalContextValue = {
    modal: AuthModal | null;
    open: (modal: AuthModal) => void;
    close: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [modal, setModal] = useState<AuthModal | null>(null);

    const open = (modal: AuthModal) => {
        setModal(modal);
    };

    const close = () => {
        setModal(null);
    };

    const value = { modal, open, close };

    return (
        <AuthModalContext.Provider value={value}>
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal(): AuthModalContextValue {
    const context = useContext(AuthModalContext);

    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalProvider');
    }

    return context;
}
