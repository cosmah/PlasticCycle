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
        post(route('business.waste.store'));
    };

    return (
        <SidebarProvider>
            <Head title="Waste Management" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Waste Management</h1>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule a Pickup</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="plastic_type">Plastic Type</Label>
                                        <Input
                                            id="plastic_type"
                                            value={data.plastic_type}
                                            onChange={(e) => setData('plastic_type', e.target.value)}
                                            placeholder="e.g., PET, HDPE"
                                            disabled={processing}
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
                                        />
                                        <InputError message={errors.scheduled_at} />
                                    </div>
                                    <div>
                                        <Label>Location</Label>
                                        {position ? (
                                            <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                <Marker position={position} />
                                            </MapContainer>
                                        ) : (
                                            <p>Loading location...</p>
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
                                        />
                                        <InputError message={errors.compliance_notes} />
                                    </div>
                                    <Button type="submit" disabled={processing || !position}>
                                        Schedule Pickup
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pickup History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {pickupRequests.length ? (
                                    <ul>
                                        {pickupRequests.map((pickup) => (
                                            <li key={pickup.id} className="py-2">
                                                {pickup.quantity} kg of {pickup.plastic_type} - {pickup.status} ({new Date(pickup.scheduled_at).toLocaleDateString()})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No pickup requests yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}