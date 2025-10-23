import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import admin from '@/routes/admin/index';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, CalendarCheck, CalendarClock, NotebookTabs, ClipboardPlus, User2 } from 'lucide-react';
import AppLogo from '../app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel de control',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Reservas',
        href: admin.reservations.index(),
        icon: CalendarCheck,
    },
    {
        title: 'Disponibilidades',
        href: admin.availability.index(),
        icon: CalendarClock,
    },
    {
        title: 'Servicios',
        href: admin.services.index(),
        icon: NotebookTabs,
    },
    {
        title: 'Clientes',
        href: admin.clients.index(),
        icon: User2,
    },
    {
        title: 'Usuarios',
        href: admin.usuarios.index(),
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Reportes',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: ClipboardPlus,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
