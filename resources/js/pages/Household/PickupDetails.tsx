import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, MapPinIcon, PackageIcon, ScaleIcon, ClipboardCheckIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Key } from 'react';

interface User {
  name: string;
  email: string;
}

interface PickupRequest {
  id: Key;
  quantity: number;
  plastic_type: string;
  address: string;
  scheduled_at: string;
  latitude: number;
  longitude: number;
  status: string;
  compliance_notes: string;
  user: User;
}

export default function PickupDetails() {
  const { pickupRequest } = usePage<{ pickupRequest: PickupRequest }>().props;

  const breadcrumbs = [
    {
      title: 'Requests',
      href: '/household/requests',
    },
    {
      title: 'Pickup Details',
      href: route('household.pickup-details', { id: pickupRequest?.id }),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!pickupRequest) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Pickup Details - Not Found" />
        <div className="max-w-4xl mx-auto">
          <Card className="mt-6">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700">No pickup request details available</h3>
              <p className="mt-2 text-gray-500">The requested pickup could not be found or has been removed.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/household/requests">Back to Requests</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Pickup Details #${pickupRequest.id}`} />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pickup Details</h1>
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <Badge 
              className={`${getStatusColor(pickupRequest.status)} px-3 py-1 text-sm font-medium`}
            >
              {pickupRequest.status.charAt(0).toUpperCase() + pickupRequest.status.slice(1)}
            </Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/household/requests">Back</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center">
                <PackageIcon className="w-5 h-5 mr-2" />
                Pickup Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-start">
                <div className="w-8 flex-shrink-0">
                  <ScaleIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Quantity</p>
                  <p className="text-gray-600">{pickupRequest.quantity} kg</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 flex-shrink-0">
                  <PackageIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Plastic Type</p>
                  <p className="text-gray-600">{pickupRequest.plastic_type}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Scheduled At</p>
                  <p className="text-gray-600">{new Date(pickupRequest.scheduled_at).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Requested By</p>
                  <p className="text-gray-600">{pickupRequest.user?.name || 'N/A'}</p>
                  <p className="text-gray-500 text-sm">{pickupRequest.user?.email || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-start">
                <div className="w-8 flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-gray-600">{pickupRequest.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Latitude</p>
                    <p className="text-gray-600">{pickupRequest.latitude}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Longitude</p>
                    <p className="text-gray-600">{pickupRequest.longitude}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          
        </div>
      </div>
    </AppLayout>
  );
}