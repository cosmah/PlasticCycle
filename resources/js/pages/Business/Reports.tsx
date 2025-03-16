import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Record {
    id: Key | null | undefined;
    quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<any> | null | undefined;
    pickup_request: {
        plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<any> | null | undefined;
    };
    processed_at: string | number | Date;
}

interface BusinessReportsProps {
    records: Record[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/business/reports',
    },
];

export default function BusinessReports({ records }: BusinessReportsProps) {
    const { processing } = useForm();

    const generateReport = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('business.reports.generate');
        
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
        }
        
        document.body.appendChild(form);
        form.submit();
        
        setTimeout(() => {
            document.body.removeChild(form);
        }, 1000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Reports</h1>
                </div>
                
                <Card className="w-full bg-white shadow-md border-none rounded-lg">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            Recycling Records
                        </CardTitle>
                        <Button
                            onClick={generateReport}
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Generate Report
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {records.length ? (
                            <div className="overflow-x-auto max-h-[calc(100vh-200px)] overflow-y-auto">
                                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                                    <thead className="bg-gray-100 text-gray-500 uppercase text-xs font-medium">
                                        <tr>
                                            <th className="py-3 px-6">Quantity</th>
                                            <th className="py-3 px-6">Plastic Type</th>
                                            <th className="py-3 px-6">Processed Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                                            >
                                                <td className="py-4 px-6 text-gray-800">
                                                    {record.quantity} kg
                                                </td>
                                                <td className="py-4 px-6 text-gray-800">
                                                    {record.pickup_request.plastic_type}
                                                </td>
                                                <td className="py-4 px-6 text-gray-800">
                                                    {new Date(record.processed_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-6 text-sm">
                                No recycling records available.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}