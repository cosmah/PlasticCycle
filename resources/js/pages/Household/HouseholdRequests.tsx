import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package2, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Requests',
        href: '/household/requests',
    },
];

export default function HouseholdRequests() {
  const { requests } = usePage<{ requests: Request[] }>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Requests" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Package2 className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">My Requests</h1>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Pickup Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {requests.length ? (
                <div className="divide-y divide-gray-100">
                  {requests.map((request) => (
                    <Link
                      key={request.id}
                      href={route('household.pickup-details', { id: request.id })}
                      className="block p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Package2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{request.quantity} kg</p>
                            <p className="text-sm text-gray-600">{request.plastic_type}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Requester</p>
                            <p className="text-sm text-gray-600">{request.user.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Scheduled For</p>
                            <p className="text-sm text-gray-600">
                              {new Date(request.scheduled_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Package2 className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No requests found</p>
                  <p className="text-sm">Create your first pickup request to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}