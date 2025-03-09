import { Head, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

interface Record {
    id: Key | null | undefined;
    quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined>
    pickup_request: {
        plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined>
    };
    processed_at: string | number | Date;
}

interface BusinessReportsProps {
    records: Record[];
}

export default function BusinessReports({ records }: BusinessReportsProps) {
    const { post, processing } = useForm();

    const generateReport = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('business.reports.generate'), {
            preserveState: false, // Force a download response
        });
    };

    return (
        <SidebarProvider>
            <Head title="Reports" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Reports</h1>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Generate Report</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={generateReport}>
                                    <p>Download a detailed report of your recycling activity.</p>
                                    <Button type="submit" disabled={processing} className="mt-4">
                                        Download PDF Report
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recycling Records</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {records.length ? (
                                    <ul>
                                        {records.map((record: { id: Key | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; pickup_request: { plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; processed_at: string | number | Date; }) => (
                                            <li key={record.id} className="py-2">
                                                {record.quantity} kg of {record.pickup_request.plastic_type} - Processed on {new Date(record.processed_at).toLocaleDateString()}
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