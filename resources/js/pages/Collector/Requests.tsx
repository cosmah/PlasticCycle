import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function CollectorRequests() {
    return (
        <SidebarProvider>
            <Head title="Collection Requests" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Collection Requests</h1>
                    <p>View and manage plastic waste collection requests from households and businesses.</p>
                    {/* Add table or list of requests */}
                </main>
            </div>
        </SidebarProvider>
    );
}