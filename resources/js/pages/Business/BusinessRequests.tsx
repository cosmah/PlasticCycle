import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function BusinessRequests() {
  const { requests } = usePage<{ requests: Request[] }>().props;

  const breadcrumbs = [
    {
      title: 'Requests',
      href: '/business/requests',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Requests" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Requests</h1>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle>Pickup Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {requests.length ? (
              <ul className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <li key={request.id} className="flex items-start gap-3 py-4 px-6 hover:bg-gray-50 transition-colors">
                    <div className="mt-1">
                      <Package2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={route('business.pickup-details', { id: request.id })} className="block text-blue-600 hover:underline">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900">
                            {request.quantity} kg of {request.plastic_type}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {new Date(request.scheduled_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          <User className="w-4 h-4 inline-block mr-1" />
                          {request.user.name}
                        </p>
                        <div className="inline-flex items-center mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <Package2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No requests found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}