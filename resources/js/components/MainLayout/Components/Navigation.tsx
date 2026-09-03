import { Link, usePage } from '@inertiajs/react';

import Avatar from '@/images/Avatar.png';
import { cn } from '@/lib/utils';
import { navLinks } from '../helper';

const Navigation = () => {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    return (
        <nav className="flex flex-col gap-10 px-12 py-10 text-white">
            <div className="flex items-center gap-4">
                <img
                    src={user?.avatar ?? Avatar}
                    alt="user avatar"
                    className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                    <p className="text-xl">{user?.name ?? 'Guest'}</p>
                    <button className="text-sm text-white/60 hover:text-white">
                        Edit your profile
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {navLinks.map((link) => {
                    const isActive =
                        url === link.href || url.startsWith(`${link.href}/`);

                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-4 text-lg',
                                isActive ? 'text-brand' : 'text-white',
                            )}
                        >
                            <link.icon className="size-6" />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navigation;
