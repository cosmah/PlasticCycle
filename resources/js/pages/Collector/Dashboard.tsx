import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function CollectorDashboard() {
    return (
        <SidebarProvider>
            <Head title="Collector Dashboard" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Collector Dashboard</h1>
                    <p>Welcome to your collector dashboard. Here you can manage collection requests, optimize routes, and connect with recycling centers.</p>
                    {/* Add more content here */}
                </main>
            </div>
        </SidebarProvider>
    );
}