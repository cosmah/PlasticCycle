import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package2, User } from 'lucide-react';

interface User {
  name: string;
}

interface Request {
  id: number;
  quantity: number;
  plastic_type: string;
  user: User;
  scheduled_at: string;
  status: string;
}

export default function HouseholdRequests() {
  const { requests } = usePage<{ requests: Request[] }>().props;

  return (
    <SidebarProvider>
      <Head title="My Requests" />
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold mb-6">My Requests</h1>
          <Card>
            <CardHeader>
              <CardTitle>Pickup Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length ? (
                <ul>
                  {requests.map((request) => (
                    <li key={request.id} className="py-2">
                      <Link href={route('household.pickup-details', { id: request.id })} className="text-blue-600 hover:underline">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Package2 className="w-4 h-4" />
                          <span className="font-medium">{request.quantity} kg of {request.plastic_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{request.user.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(request.scheduled_at).toLocaleDateString()}</span>
                        </div>
                        <div className="inline-flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No requests found.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}