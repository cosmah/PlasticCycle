// resources/js/Pages/Admin/Dashboard.jsx
import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminDashboardProps {
    totalCollections: number;
    totalRecycled: number;
    activeCollectors: number;
}

export default function AdminDashboard({ totalCollections, totalRecycled, activeCollectors }: AdminDashboardProps) {
    return (
        <SidebarProvider>
            <Head title="Admin Dashboard" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{totalCollections}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Recycled</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{totalRecycled} kg</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Collectors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{activeCollectors}</p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}