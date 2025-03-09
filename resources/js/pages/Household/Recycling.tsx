import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

interface Record {
    id: Key | null | undefined;
    quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined>
    pickup_request: {
        plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined>
    };
    processed_at: string | number | Date;
}

interface PageProps {
    records: Record[];
    totalImpact: number;
    [key: string]: any;
}

export default function HouseholdRecycling() {
    const { records, totalImpact } = usePage<PageProps>().props;

    return (
        <SidebarProvider>
            <Head title="My Recycling" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">My Recycling</h1>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Environmental Impact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{totalImpact as number} kg recycled</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recycling History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {records.length ? (
                                    <ul>
                                        {records.map((record: { id: Key | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; pickup_request: { plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; processed_at: string | number | Date; }) => (
                                            <li key={record.id} className="py-2">
                                                {record.quantity} kg from {record.pickup_request.plastic_type} pickup - Processed on {new Date(record.processed_at).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No recycling records yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}