import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key } from 'react';
import { Package2, Building2, Scale } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

export default function CollectorCenters() {
    const { centers, completedRequests } = usePage<{ centers: Center[], completedRequests: Request[] }>().props;

    interface Center {
        id: Key;
        name: string;
        address: string;
        accepted_plastic_types: string[];
        capacity: number;
    }

    interface Request {
        id: Key;
        quantity: number;
        plastic_type: string;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Recycling Centers',
            href: '/collector/centers',
        },
    ];

    const { data, setData, post, processing } = useForm({
        pickup_request_id: '',
        recycling_center_id: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('collector.centers.deliver'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recycling Centers" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Recycling Centers</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage waste delivery to recycling centers
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="border-b">
                                <CardTitle className="flex items-center gap-3">
                                    <Package2 className="h-5 w-5 text-gray-500" />
                                    Deliver Waste
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={submit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="pickup_request_id" className="block text-sm font-medium text-gray-700">
                                            Completed Request
                                        </label>
                                        <Select onValueChange={(value) => setData('pickup_request_id', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a request" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {completedRequests.map((request) => (
                                                    <SelectItem key={request.id} value={request.id.toString()}>
                                                        {request.quantity} kg of {request.plastic_type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="recycling_center_id" className="block text-sm font-medium text-gray-700">
                                            Recycling Center
                                        </label>
                                        <Select onValueChange={(value) => setData('recycling_center_id', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a center" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {centers.map((center) => (
                                                    <SelectItem key={center.id} value={center.id.toString()}>
                                                        {center.name} ({center.address})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button 
                                        type="submit" 
                                        disabled={processing || !completedRequests.length}
                                        className="w-full"
                                    >
                                        {processing ? 'Processing...' : 'Deliver Waste'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg">
                            <CardHeader className="border-b">
                                <CardTitle className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-gray-500" />
                                    Available Centers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="divide-y divide-gray-100">
                                {centers.length ? (
                                    <div className="divide-y divide-gray-100">
                                        {centers.map((center) => (
                                            <div key={center.id} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-medium text-gray-900 truncate">
                                                            {center.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {center.address}
                                                        </p>
                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                            {center.accepted_plastic_types.map((type) => (
                                                                <span
                                                                    key={type}
                                                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                                                                >
                                                                    {type}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Scale className="h-4 w-4" />
                                                        <span>{center.capacity} kg/day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-32 text-gray-500">
                                        <p className="text-center">No recycling centers available.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}