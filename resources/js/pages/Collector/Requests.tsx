import React from 'react';
import { Head } from '@inertiajs/react';
import { Clock, Package2, User } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { router } from '@inertiajs/react';
import { RouteParams } from 'vendor/tightenco/ziggy/src/js';

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

// Request Card Component
function RequestCard({ request, onAction, actionLabel }: {
  request: Request;
  onAction?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
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
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function Request({ availableRequests, myRequests }: { availableRequests: Request[], myRequests: Request[] }) {
  const handleAcceptRequest = (id: number) => {
    router.patch(route('collector.requests.update', { id }), {
      status: 'scheduled',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        // Toast notification could be shown here
      }
    });
  };

  const handleCompleteRequest = (id: number) => {
    router.patch(route('collector.requests.update', { id }), {
      status: 'completed',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        // Toast notification could be shown here
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

export default Request;