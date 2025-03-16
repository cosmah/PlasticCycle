import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'react';

export default function PickupDetails() {
  const { pickupRequest } = usePage<{ pickupRequest: { id: Key; quantity: number; plastic_type: string; address: string; scheduled_at: string; latitude: number; longitude: number; status: string; compliance_notes: string; user: { name: string; email: string } } }>().props;

  return (
    <SidebarProvider>
      <Head title="Pickup Details" />
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold mb-6">Pickup Details</h1>
          <Card>
            <CardHeader>
              <CardTitle>Pickup Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              {pickupRequest ? (
                <div>
                  <p><strong>ID:</strong> {pickupRequest.id}</p>
                  <p><strong>Quantity:</strong> {pickupRequest.quantity} kg</p>
                  <p><strong>Plastic Type:</strong> {pickupRequest.plastic_type}</p>
                  <p><strong>Address:</strong> {pickupRequest.address}</p>
                  <p><strong>Scheduled At:</strong> {new Date(pickupRequest.scheduled_at).toLocaleString()}</p>
                  <p><strong>Latitude:</strong> {pickupRequest.latitude}</p>
                  <p><strong>Longitude:</strong> {pickupRequest.longitude}</p>
                  <p><strong>Status:</strong> {pickupRequest.status}</p>
                  <p><strong>Compliance Notes:</strong> {pickupRequest.compliance_notes}</p>
                  <p><strong>User:</strong> {pickupRequest.user.name} ({pickupRequest.user.email})</p>
                </div>
              ) : (
                <p>No pickup request details available.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}