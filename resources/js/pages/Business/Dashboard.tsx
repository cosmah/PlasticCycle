import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function BusinessDashboard() {
    return (
        <SidebarProvider>
            <Head title="Business Dashboard" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
                    <p>Welcome to your business dashboard. Manage your plastic waste, generate reports, and track sustainability metrics.</p>
                    {/* Add cards or widgets here */}
                </main>
            </div>
        </SidebarProvider>
    );
}