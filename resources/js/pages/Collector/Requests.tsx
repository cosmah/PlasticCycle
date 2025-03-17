import React from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Clock, Package2, User, Filter, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestCard from './RequestCard';
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
  status: 'pending' | 'scheduled' | 'completed';
}

function Requests({ availableRequests, myRequests }: { availableRequests: Request[], myRequests: Request[] }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Requests',
      href: '/collector/requests',
    },
  ];

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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Collection Requests" />
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Package2 className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Collection Requests</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Available Requests</h2>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {availableRequests.length} requests
                </span>
              </div>
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
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Package2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium">No available requests</p>
                    <p className="text-gray-500 mt-2">Check back later for new collection requests</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">My Requests</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {myRequests.length} assigned
                </span>
              </div>
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
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium">No assigned requests</p>
                    <p className="text-gray-500 mt-2">Accept requests from the available section above</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Requests;