import AppLogoIcon from '@/components/app-logo-icon';
import { Badge } from '@/components/ui/badge';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        {/* 11. Pie de Página */}
        <div className=" py-6 text-center text-sm text-muted-foreground">
            <div className="mb-2 flex items-center justify-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                    <AppLogoIcon className="h-6 w-6 fill-current" />
                </div>
                <span className="font-semibold">
                    Sistema de Reservas AISAKVELIZ
                </span>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs">
                <span>© 2025 Todos los derechos reservados</span>
                <span className="text-gray-300">•</span>
                <Link href="/politicas" className="hover:text-primary">
                    Políticas
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/contacto" className="hover:text-primary">
                    Contacto
                </Link>
                <span className="text-gray-300">•</span>
                <Badge variant="outline">v1.0.0</Badge>
            </div>
        </div>
    </AppLayoutTemplate>
);
