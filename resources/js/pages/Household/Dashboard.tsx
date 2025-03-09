import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HouseholdDashboard() {
    return (
        <SidebarProvider>
            <Head title="Household Dashboard" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Household Dashboard</h1>
                    <p>Welcome to your household dashboard. Schedule pickups, track your recycling, and earn rewards.</p>
                    {/* Add cards or widgets here */}
                </main>
            </div>
        </SidebarProvider>
    );
}