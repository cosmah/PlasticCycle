import { Head, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
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

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface PickupRequest {
    id: number;
    quantity: number;
    plastic_type: string;
    status: string;
    scheduled_at: string;
}

interface FormData extends Record<string, any> {
    plastic_type: string;
    quantity: string;
    scheduled_at: string;
    latitude: number | null;
    longitude: number | null;
    compliance_notes: string;
}

interface PageProps {
    pickupRequests: PickupRequest[];
    [key: string]: any;
}

export default function BusinessWaste() {
    const { pickupRequests } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<FormData>({
        plastic_type: '',
        quantity: '',
        scheduled_at: '',
        latitude: null,
        longitude: null,
        compliance_notes: '',
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
        post(route('business.waste.store'), {
            preserveScroll: true, // Keeps scroll position
            onSuccess: () => {
                // Reset form after success
                setData({
                    plastic_type: '',
                    quantity: '',
                    scheduled_at: '',
                    latitude: null,
                    longitude: null,
                    compliance_notes: '',
                });
                // Optionally, refresh the pickupRequests prop (if needed)
                // Inertia.reload({ only: ['pickupRequests'] });
            },
            onError: (errors) => {
                console.error('Submission failed:', errors);
            },
        });
    };

    return (
        <SidebarProvider>
            <Head title="Waste Management" />
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <main className="flex-1 p-6 flex flex-col items-center">
                    <SidebarTrigger />
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Waste Management</h1>

                    {/* Summary Cards Section - Horizontally Aligned and Centered */}
                    <div className="w-full max-w-6xl mb-8">
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <Card className="w-full md:w-80 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border-none rounded-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-gray-700">Total Scheduled</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold text-blue-600">{pickupRequests.length}</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="w-full md:w-80 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border-none rounded-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-gray-700">Pending Pickups</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold text-orange-500">
                                        {pickupRequests.filter(r => r.status === 'pending').length}
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="w-full md:w-80 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border-none rounded-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-gray-700">Completed</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold text-green-600">
                                        {pickupRequests.filter(r => r.status === 'completed').length}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Form Section */}
                    <Card className="w-full max-w-2xl mb-8 bg-white shadow-md border-none rounded-xl">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-xl font-semibold text-gray-800">Schedule a Pickup</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="plastic_type">Plastic Type</Label>
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
                                    <Label htmlFor="quantity">Quantity (kg)</Label>
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
                                    <Label htmlFor="scheduled_at">Scheduled Date</Label>
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
                                    <Label>Location</Label>
                                    {position ? (
                                        <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }} className="mt-1 rounded-lg">
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <Marker position={position} />
                                        </MapContainer>
                                    ) : (
                                        <p className="text-gray-500 mt-1">Loading location...</p>
                                    )}
                                    <InputError message={errors.latitude || errors.longitude} />
                                </div>
                                <div>
                                    <Label htmlFor="compliance_notes">Compliance Notes</Label>
                                    <Textarea
                                        id="compliance_notes"
                                        value={data.compliance_notes}
                                        onChange={(e) => setData('compliance_notes', e.target.value)}
                                        placeholder="Optional compliance details"
                                        disabled={processing}
                                        className="mt-1"
                                    />
                                    <InputError message={errors.compliance_notes} />
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={processing || !position}
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Schedule Pickup
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Pickup History Section */}
                    <Card className="w-full max-w-4xl bg-white shadow-md border-none rounded-xl">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-xl font-semibold text-gray-800">Pickup History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {pickupRequests.length ? (
                                <ul className="divide-y divide-gray-200">
                                    {pickupRequests.map((pickup) => (
                                        <li key={pickup.id} className="py-3 flex justify-between items-center">
                                            <span className="text-gray-700">
                                                {pickup.quantity} kg of {pickup.plastic_type} - {new Date(pickup.scheduled_at).toLocaleDateString()}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                pickup.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No pickup requests yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}