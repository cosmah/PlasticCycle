import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function CollectorCenters() {
    return (
        <SidebarProvider>
            <Head title="Recycling Centers" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Recycling Centers</h1>
                    <p>Find and coordinate with nearby recycling centers.</p>
                    {/* Add list or map of centers */}
                </main>
            </div>
        </SidebarProvider>
    );
}