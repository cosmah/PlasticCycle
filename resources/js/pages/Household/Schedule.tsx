import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CalendarIcon, PackageIcon, ScaleIcon } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface FormData {
    plastic_type: string;
    quantity: string;
    scheduled_at: string;
    latitude: number | null;
    longitude: number | null;
    notes: string;
    [key: string]: any;
}

export default function HouseholdSchedule() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        plastic_type: '',
        quantity: '',
        scheduled_at: '',
        latitude: null,
        longitude: null,
        notes: '',
    });
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    setData((prev) => ({ ...prev, latitude, longitude }));
                },
                (err) => console.error('Geolocation error:', err),
                { enableHighAccuracy: true }
            );
        }
    }, [setData]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('household.schedule.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    plastic_type: '',
                    quantity: '',
                    scheduled_at: '',
                    latitude: null,
                    longitude: null,
                    notes: '',
                });
            },
        });
    };

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/household/dashboard',
        },
        {
            title: 'Schedule Pickup',
            href: '/household/schedule',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule Pickup" />
            <div className="flex min-h-screen">
                
                <main className="flex-1 p-6">
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Schedule Pickup</h1>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </Button>
                        </div>

                        <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
                            {/* Summary Cards Section */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <Card className="bg-white shadow-sm">
                                    <CardHeader className="pb-2 flex items-center space-x-2">
                                        <PackageIcon className="w-5 h-5 text-blue-500" />
                                        <CardTitle className="text-lg font-semibold text-gray-700">Total Scheduled</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold text-blue-600">0</p>
                                    </CardContent>
                                </Card>
                                
                                <Card className="bg-white shadow-sm">
                                    <CardHeader className="pb-2 flex items-center space-x-2">
                                        <CalendarIcon className="w-5 h-5 text-orange-500" />
                                        <CardTitle className="text-lg font-semibold text-gray-700">Pending Pickups</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold text-orange-500">0</p>
                                    </CardContent>
                                </Card>
                                
                                <Card className="bg-white shadow-sm">
                                    <CardHeader className="pb-2 flex items-center space-x-2">
                                        <ScaleIcon className="w-5 h-5 text-green-500" />
                                        <CardTitle className="text-lg font-semibold text-gray-700">Total Collected</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold text-green-600">0</p>
                                    </CardContent>
                                </Card>
                            </div> */}

                            {/* Form Card */}
                            <Card className="bg-white shadow-sm">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <CardTitle className="text-xl font-semibold text-gray-800">Request a Pickup</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <form onSubmit={submit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="plastic_type" className="text-gray-700">Plastic Type</Label>
                                            <Input
                                                id="plastic_type"
                                                value={data.plastic_type}
                                                onChange={(e) => setData('plastic_type', e.target.value)}
                                                placeholder="e.g., PET, HDPE"
                                                disabled={processing}
                                                className="mt-1"
                                            />
                                            <InputError message={errors.plastic_type} />
                                        </div>
                                        <div>
                                            <Label htmlFor="quantity" className="text-gray-700">Quantity (kg)</Label>
                                            <Input
                                                id="quantity"
                                                type="number"
                                                value={data.quantity}
                                                onChange={(e) => setData('quantity', e.target.value)}
                                                placeholder="Enter weight in kg"
                                                disabled={processing}
                                                className="mt-1"
                                            />
                                            <InputError message={errors.quantity} />
                                        </div>
                                        <div>
                                            <Label htmlFor="scheduled_at" className="text-gray-700">Scheduled Date</Label>
                                            <Input
                                                id="scheduled_at"
                                                type="datetime-local"
                                                value={data.scheduled_at}
                                                onChange={(e) => setData('scheduled_at', e.target.value)}
                                                disabled={processing}
                                                className="mt-1"
                                            />
                                            <InputError message={errors.scheduled_at} />
                                        </div>
                                        <div>
                                            <Label className="text-gray-700">Location</Label>
                                            {position ? (
                                                <div className="mt-1 rounded-lg overflow-hidden border border-gray-200">
                                                    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
                                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                        <Marker position={position} />
                                                    </MapContainer>
                                                </div>
                                            ) : (
                                                <div className="mt-1 h-300 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-6">
                                                    <div className="text-center">
                                                        <svg className="mx-auto h-12 w-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <p className="mt-2 text-sm text-gray-500">Loading your current location...</p>
                                                    </div>
                                                </div>
                                            )}
                                            <InputError message={errors.latitude || errors.longitude} />
                                        </div>
                                        <div>
                                            <Label htmlFor="notes" className="text-gray-700">Additional Notes</Label>
                                            <Textarea
                                                id="notes"
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="Optional additional details"
                                                disabled={processing}
                                                className="mt-1"
                                            />
                                            <InputError message={errors.notes} />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={processing || !position}
                                            className="w-full"
                                        >
                                            Schedule Pickup
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Empty History Section */}
                            
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}