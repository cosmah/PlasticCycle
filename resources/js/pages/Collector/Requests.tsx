import React from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Clock, Package2, User } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestCard from './RequestCard';

// Types
interface User {
  name: string;
}

interface Request {
  id: number;
  quantity: number;
  plastic_type: string;
  user: User;
  scheduled_at: string;
  status: 'pending' | 'scheduled' | 'completed';
}

function Requests({ availableRequests, myRequests }: { availableRequests: Request[], myRequests: Request[] }) {
  const handleAcceptRequest = (id: number) => {
    router.patch(route('collector.requests.update', { id }), {
      status: 'scheduled',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Request accepted successfully!');
      }
    });
  };

  const handleCompleteRequest = (id: number) => {
    router.patch(route('collector.requests.update', { id }), {
      status: 'completed',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Request marked as completed!');
      }
    });
  };

  return (
    <SidebarProvider>
      <Head title="Collection Requests" />
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Collection Requests</h1>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Requests</h2>
                <div className="grid gap-4">
                  {availableRequests.length > 0 ? (
                    availableRequests.map((request: Request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        onAction={() => handleAcceptRequest(request.id)}
                        actionLabel="Accept Request"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No available requests at the moment.</p>
                  )}
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Requests</h2>
                <div className="grid gap-4">
                  {myRequests.length > 0 ? (
                    myRequests.map((request: Request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        onAction={request.status === 'scheduled' ? () => handleCompleteRequest(request.id) : undefined}
                        actionLabel={request.status === 'scheduled' ? 'Mark as Completed' : undefined}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">You haven't accepted any requests yet.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Requests;