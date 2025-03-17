import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Key, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type BreadcrumbItem } from '@/types';

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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Routes',
            href: '/collector/routes',
        },
    ];

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Routes" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Collection Routes</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                View and manage scheduled plastic collection routes
                            </p>
                        </div>
                    </div>

                    <Card className="bg-white shadow-lg">
                        <CardHeader className="border-b">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl text-gray-900">
                                    Scheduled Collections
                                </CardTitle>
                                {userPosition && scheduledRequests.length > 0 && (
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                            <span>Your Location</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                                            <span>Collection Points</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {userPosition && scheduledRequests.length > 0 ? (
                                <div className="h-[calc(100vh-250px)] w-full">
                                    <MapContainer 
                                        center={userPosition} 
                                        zoom={12} 
                                        className="h-full w-full"
                                        zoomControl={false}
                                    >
                                        <ZoomControl position="bottomright" />
                                        <TileLayer 
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        />
                                        <Marker position={userPosition} icon={blueIcon}>
                                            <Popup>
                                                <div className="font-medium">Your Location</div>
                                            </Popup>
                                        </Marker>
                                        {scheduledRequests.map((request) => (
                                            <Marker 
                                                key={request.id} 
                                                position={[request.latitude, request.longitude]} 
                                                icon={redIcon}
                                            >
                                                <Popup>
                                                    <div className="space-y-2">
                                                        <h3 className="font-medium text-gray-900">
                                                            {request.address}
                                                        </h3>
                                                        <div className="text-sm text-gray-600">
                                                            <p>{request.quantity} kg of {request.plastic_type}</p>
                                                            <p className="text-gray-500">
                                                                {new Date(request.scheduled_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    <p className="text-center">
                                        <span className="block text-lg font-medium">No Data Available</span>
                                        <span className="text-sm">Loading location or scheduled requests...</span>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}