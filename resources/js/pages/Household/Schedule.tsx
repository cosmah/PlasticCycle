import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HouseholdSchedule() {
    return (
        <SidebarProvider>
            <Head title="Schedule Pickup" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Schedule Pickup</h1>
                    <p>Schedule a pickup for your plastic waste.</p>
                    {/* Add scheduling form */}
                </main>
            </div>
        </SidebarProvider>
    );
}