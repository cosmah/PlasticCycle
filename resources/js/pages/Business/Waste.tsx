import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function BusinessWaste() {
    return (
        <SidebarProvider>
            <Head title="Waste Management" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Waste Management</h1>
                    <p>Schedule pickups and manage your plastic waste efficiently.</p>
                    {/* Add waste scheduling form or list */}
                </main>
            </div>
        </SidebarProvider>
    );
}