import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HouseholdRecycling() {
    return (
        <SidebarProvider>
            <Head title="My Recycling" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">My Recycling</h1>
                    <p>Track your recycling history and impact.</p>
                    {/* Add recycling history table or stats */}
                </main>
            </div>
        </SidebarProvider>
    );
}