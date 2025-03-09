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
import { BookOpen, Folder, LayoutGrid, Truck, Map, Recycle, Building, FileText, BarChart, Home, Calendar, Gift, Bell } from 'lucide-react';
import AppLogo from './app-logo';

const collectorNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/collector/dashboard', icon: LayoutGrid },
    { title: 'Collection Requests', url: '/collector/requests', icon: Truck },
    { title: 'Routes', url: '/collector/routes', icon: Map },
    { title: 'Recycling Centers', url: '/collector/centers', icon: Recycle },
];

const businessNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/business/dashboard', icon: LayoutGrid },
    { title: 'Waste Management', url: '/business/waste', icon: Building },
    { title: 'Reports', url: '/business/reports', icon: FileText },
    { title: 'Analytics', url: '/business/analytics', icon: BarChart },
    { title: 'Notifications', url: '/business/notifications', icon: Bell },
];

const householdNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/household/dashboard', icon: LayoutGrid },
    { title: 'Schedule Pickup', url: '/household/schedule', icon: Calendar },
    { title: 'Rewards', url: '/household/rewards', icon: Gift },
    { title: 'My Recycling', url: '/household/recycling', icon: Home },
    { title: 'Notifications', url: '/household/notifications', icon: Bell },
];

const defaultNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
];

const footerNavItems: NavItem[] = [
    { title: 'Repository', url: 'https://github.com/laravel/react-starter-kit', icon: Folder },
    { title: 'Documentation', url: 'https://laravel.com/docs/starter-kits', icon: BookOpen },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user?: { type?: string } } }>().props;
    const userType = auth.user?.type || 'household';

    const mainNavItems =
        userType === 'collector'
            ? collectorNavItems
            : userType === 'business'
            ? businessNavItems
            : userType === 'household'
            ? householdNavItems
            : defaultNavItems;

    const homeUrl =
        userType === 'collector'
            ? '/collector/dashboard'
            : userType === 'business'
            ? '/business/dashboard'
            : userType === 'household'
            ? '/household/dashboard'
            : '/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeUrl} prefetch>
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