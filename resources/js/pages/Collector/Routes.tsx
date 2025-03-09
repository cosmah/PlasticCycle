import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function CollectorRoutes() {
    const { scheduledRequests } = usePage<{ scheduledRequests: Array<{ id: Key; quantity: string | number; plastic_type: string; address: string; scheduled_at: string }> }>().props;

    return (
        <SidebarProvider>
            <Head title="Routes" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Routes</h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Collections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {scheduledRequests.length ? (
                                <ul>
                                    {scheduledRequests.map((request: { id: Key | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; address: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduled_at: string | number | Date; }) => (
                                        <li key={request.id} className="py-2">
                                            {request.quantity} kg of {request.plastic_type} at {request.address} ({new Date(request.scheduled_at).toLocaleDateString()})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No scheduled collections.</p>
                            )}
                            <p className="mt-4 text-sm text-gray-500">
                                Note: Route optimization is simulated. In a real app, this would integrate with a mapping API (e.g., Google Maps).
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}