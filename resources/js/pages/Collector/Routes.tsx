import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Key, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const blueIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-red.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function CollectorRoutes() {
    const { scheduledRequests } = usePage<{ scheduledRequests: Array<{ id: Key; quantity: number; plastic_type: string; address: string; scheduled_at: string; latitude: number; longitude: number }> }>().props;
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setUserPosition([latitude, longitude]);
                },
                (err) => console.error('Geolocation error:', err),
                { enableHighAccuracy: true }
            );
        }
    }, []);

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
                            {userPosition && scheduledRequests.length > 0 ? (
                                <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                                    <MapContainer center={userPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker position={userPosition} icon={blueIcon}>
                                            <Popup>Your Location</Popup>
                                        </Marker>
                                        {scheduledRequests.map((request) => (
                                            <Marker key={request.id} position={[request.latitude, request.longitude]} icon={redIcon}>
                                                <Popup>
                                                    {request.quantity} kg of {request.plastic_type} at {request.address} ({new Date(request.scheduled_at).toLocaleDateString()})
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                </div>
                            ) : (
                                <p>Loading location or scheduled requests...</p>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}
