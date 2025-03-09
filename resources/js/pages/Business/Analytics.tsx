import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function BusinessAnalytics() {
    return (
        <SidebarProvider>
            <Head title="Analytics" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Analytics</h1>
                    <p>View data visualizations and trends for your waste management efforts.</p>
                    {/* Add charts or graphs */}
                </main>
            </div>
        </SidebarProvider>
    );
}