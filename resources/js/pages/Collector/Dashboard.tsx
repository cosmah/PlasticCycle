import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  PackageCheck, 
  ClipboardList, 
  ArrowUpRight, 
  Calendar,
  MapPin,
  Scale,
  Timer
} from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

export default function CollectorDashboard() {
  const { pendingRequests = 0, recentRequests = [], totalCollected = 0 } = usePage<{
    pendingRequests: number;
    recentRequests: {
      id: string;
      quantity: string;
      plastic_type: string;
      scheduled_at: string;
      location?: string;
      status?: string;
    }[];
    totalCollected: number;
  }>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/collector/dashboard',
    },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Collector Dashboard" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Collector Dashboard</h1>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Scale className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Collected</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCollected} kg</p>
                    <p className="text-xs text-blue-600">Lifetime Collections</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
                    <p className="text-xs text-amber-600">Awaiting Collection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <PackageCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Collection Rate</p>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-xs text-green-600">On-Time Performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <CardTitle className="text-xl">Recent Requests</CardTitle>
              </div>
              <Link
                href={route('collector.requests')}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentRequests.length ? (
                <div className="divide-y divide-gray-100">
                  {recentRequests.map((request) => (
                    <Link
                      key={request.id}
                      href={route('collector.pickup-details', { id: request.id })}
                      className="block hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Truck className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{request.quantity} kg</p>
                              <p className="text-sm text-gray-600">{request.plastic_type}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Timer className="w-4 h-4 flex-shrink-0" />
                            <span>{formatDate(request.scheduled_at)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{request.location || 'Location pending'}</span>
                          </div>

                          <div className="flex justify-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === 'completed' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {request.status || 'Scheduled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Truck className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No requests yet</p>
                  <p className="text-sm mb-4">Start collecting to see your history here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}