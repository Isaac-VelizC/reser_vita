import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { useState } from 'react';
import AppearanceToggleDropdown from '../appearance-dropdown';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const [currentDate] = useState(new Date());
    const formatDate = () => {
        return currentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden text-right md:block">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                            {formatDate()}
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300">
                            {currentDate.toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>

                    <div className="divider hidden divider-horizontal md:flex"></div>
                    <AppearanceToggleDropdown />
                </div>
            </div>
        </header>
    );
}
