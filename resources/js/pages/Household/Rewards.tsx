import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HouseholdRewards() {
    return (
        <SidebarProvider>
            <Head title="Rewards" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Rewards</h1>
                    <p>View and redeem your recycling rewards.</p>
                    {/* Add rewards list or points tracker */}
                </main>
            </div>
        </SidebarProvider>
    );
}