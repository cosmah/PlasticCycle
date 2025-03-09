import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Request {
  id: number;
  quantity: number;
  plastic_type: string;
  user: { name: string };
  scheduled_at: string;
  status: string;
}

interface PageProps {
  availableRequests: Request[];
  myRequests: Request[];
}

interface ExtendedFormOptions {
  [key: string]: any; // Add index signature
  status?: string;
}

export default function CollectorRequests() {
  const { availableRequests, myRequests } = usePage().props as unknown as PageProps;
  const { patch, processing } = useForm<ExtendedFormOptions>();

  const acceptRequest = (id: number) => {
    patch(route('collector.requests.update', id), { status: 'scheduled' });
  };

  const completeRequest = (id: number) => {
    patch(route('collector.requests.update', id), { status: 'completed' });
  };

  return (
    <SidebarProvider>
      <Head title="Collection Requests" />
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold mb-6">Collection Requests</h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {availableRequests.length ? (
                  <ul>
                    {availableRequests.map((request) => (
                      <li key={request.id} className="py-2 flex justify-between">
                        <span>
                          {request.quantity} kg of {request.plastic_type} from {request.user.name} ({new Date(request.scheduled_at).toLocaleDateString()})
                        </span>
                        <Button onClick={() => acceptRequest(request.id)} disabled={processing}>
                          Accept
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No available requests.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {myRequests.length ? (
                  <ul>
                    {myRequests.map((request) => (
                      <li key={request.id} className="py-2 flex justify-between">
                        <span>
                          {request.quantity} kg of {request.plastic_type} from {request.user.name} - {request.status} ({new Date(request.scheduled_at).toLocaleDateString()})
                        </span>
                        {request.status === 'scheduled' && (
                          <Button onClick={() => completeRequest(request.id)} disabled={processing}>
                            Mark as Completed
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No assigned requests.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
