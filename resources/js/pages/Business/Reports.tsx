import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function BusinessReports() {
    return (
        <SidebarProvider>
            <Head title="Reports" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Reports</h1>
                    <p>Generate compliance and sustainability reports for your business.</p>
                    {/* Add report generation UI */}
                </main>
            </div>
        </SidebarProvider>
    );
}