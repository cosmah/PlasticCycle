import { Head, usePage, Link } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function CollectorDashboard() {
    const { pendingRequests, recentCollections, totalCollected } = usePage<{ pendingRequests: number; recentCollections: { id: Key; quantity: string; plastic_type: string; scheduled_at: string; }[]; totalCollected: number; }>().props;

    return (
        <SidebarProvider>
            <Head title="Collector Dashboard" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Collector Dashboard</h1>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Collected</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{totalCollected} kg</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Requests</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{pendingRequests}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentCollections.length ? (
                                    <ul>
                                        {recentCollections.map((collection: { id: Key; quantity: string; plastic_type: string; scheduled_at: string; }) => (
                                            <li key={collection.id} className="py-2">
                                                <Link href={route('collector.pickup-details', { id: collection.id })} className="text-blue-600 hover:underline">
                                                    {collection.quantity} kg of {collection.plastic_type} ({new Date(collection.scheduled_at).toLocaleDateString()})
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No recent collections.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}