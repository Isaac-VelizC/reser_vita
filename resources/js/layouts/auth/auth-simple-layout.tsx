import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <Link
                href={home()}
                className="absolute top-10 left-10 flex flex-col items-center gap-2 rounded-2xl font-medium"
            >
                <div className="mb-1 flex h-9 w-auto items-center justify-center rounded-md">
                    <AppLogoIcon className="mr-2 size-9 fill-current" />
                    <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-2xl font-bold text-transparent">
                        AISAKVELIZ
                    </span>
                </div>
                <span className="sr-only">{title}</span>
            </Link>

            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
