import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function CollectorRoutes() {
    return (
        <SidebarProvider>
            <Head title="Routes" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Routes</h1>
                    <p>Optimize your collection routes for efficiency.</p>
                    {/* Add map or route planning UI */}
                </main>
            </div>
        </SidebarProvider>
    );
}