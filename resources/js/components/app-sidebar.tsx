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
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Truck, Map, Recycle } from 'lucide-react';
import AppLogo from './app-logo';

// Define collector-specific navigation items
const collectorNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/collector/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Collection Requests',
        url: '/collector/requests',
        icon: Truck,
    },
    {
        title: 'Routes',
        url: '/collector/routes',
        icon: Map,
    },
    {
        title: 'Recycling Centers',
        url: '/collector/centers',
        icon: Recycle,
    },
];

// Default navigation items (e.g., for households or businesses, can be expanded later)
const defaultNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    // Access the authenticated user from Inertia's usePage hook
    const { auth } = usePage().props as unknown as { auth: { user?: { type?: string } } };
    const userType = auth.user?.type || 'household'; // Default to 'household' if no type

    // Select navigation items based on user type
    const mainNavItems = userType === 'collector' ? collectorNavItems : defaultNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userType === 'collector' ? '/collector/dashboard' : '/dashboard'} prefetch>
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