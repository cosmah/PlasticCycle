import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'react';
import { Package2, MapPin, Calendar, User2, ClipboardCheck, Scale } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

export default function CollectorPickupDetails() {
    const { pickupRequest } = usePage<{ pickupRequest: { id: Key; quantity: number; plastic_type: string; address: string; scheduled_at: string; latitude: number; longitude: number; status: string; compliance_notes: string; user: { name: string; email: string } } }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Requests',
            href: '/collector/requests',
        },
        {
            title: 'Pickup Details',
            href: route('collector.pickup-details', { id: pickupRequest?.id }),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-50 text-yellow-700';
            case 'completed':
                return 'bg-green-50 text-green-700';
            case 'cancelled':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pickup Details" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Pickup Details</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Detailed information about the pickup request
                            </p>
                        </div>
                    </div>

                    {pickupRequest ? (
                        <div className="space-y-6">
                            <Card className="bg-white shadow-lg">
                                <CardHeader className="border-b">
                                    <CardTitle className="flex items-center gap-3">
                                        <Package2 className="h-5 w-5 text-gray-500" />
                                        Request Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Request ID</p>
                                            <p className="font-medium">{pickupRequest.id}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(pickupRequest.status)}`}>
                                                {pickupRequest.status}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Scale className="h-4 w-4" />
                                                <p className="text-sm">Quantity</p>
                                            </div>
                                            <p className="font-medium">{pickupRequest.quantity} kg</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Plastic Type</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
                                                {pickupRequest.plastic_type}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-lg">
                                <CardHeader className="border-b">
                                    <CardTitle className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        Location Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">{pickupRequest.address}</p>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Latitude</p>
                                                <p className="font-medium">{pickupRequest.latitude}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Longitude</p>
                                                <p className="font-medium">{pickupRequest.longitude}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="bg-white shadow-lg">
                                    <CardHeader className="border-b">
                                        <CardTitle className="flex items-center gap-3">
                                            <User2 className="h-5 w-5 text-gray-500" />
                                            User Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Name</p>
                                                <p className="font-medium">{pickupRequest.user.name}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium">{pickupRequest.user.email}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-lg">
                                    <CardHeader className="border-b">
                                        <CardTitle className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-gray-500" />
                                            Schedule
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Scheduled At</p>
                                            <p className="font-medium">
                                                {new Date(pickupRequest.scheduled_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {pickupRequest.compliance_notes && (
                                <Card className="bg-white shadow-lg">
                                    <CardHeader className="border-b">
                                        <CardTitle className="flex items-center gap-3">
                                            <ClipboardCheck className="h-5 w-5 text-gray-500" />
                                            Compliance Notes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {pickupRequest.compliance_notes}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    ) : (
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center h-32 text-gray-500">
                                    <p className="text-center">No pickup request details available.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}