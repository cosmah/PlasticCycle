import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, Award, Calendar, ArrowUpRight, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface PageProps extends InertiaPageProps {
  recentPickups: {
    id: number;
    quantity: number;
    plastic_type: string;
    status: string;
    scheduled_at: string;
  }[];
  totalRecycled: number;
  totalPoints: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/household/dashboard',
    },
];

export default function HouseholdDashboard() {
  const { recentPickups, totalRecycled, totalPoints } = usePage<PageProps>().props;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Household Dashboard" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Recycle className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-bold">Household Dashboard</h1>
            </div>
            <Link href={route('household.schedule')}>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                Schedule Pickup
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Recycle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Recycled</p>
                    <p className="text-2xl font-bold text-gray-900">{totalRecycled} kg</p>
                    <p className="text-xs text-green-600">Environmental Impact Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Points Earned</p>
                    <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
                    <p className="text-xs text-purple-600">Redeem for Rewards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Pickups</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {recentPickups.filter(p => p.status.toLowerCase() === 'scheduled').length}
                    </p>
                    <p className="text-xs text-blue-600">Scheduled Collections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Pickups</CardTitle>
              <Link
                href={route('household.requests')}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                View All
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentPickups.length ? (
                <div className="divide-y divide-gray-100">
                  {recentPickups.map((pickup) => (
                    <div
                      key={pickup.id}
                      className="p-4 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Recycle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{pickup.quantity} kg</p>
                            <p className="text-sm text-gray-600">{pickup.plastic_type}</p>
                          </div>
                        </div>

                        <div className="sm:text-center">
                          <p className="text-sm text-gray-500">Scheduled for</p>
                          <p className="font-medium text-gray-900">
                            {new Date(pickup.scheduled_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        <div className="sm:text-center">
                          <p className="text-sm text-gray-500">Environmental Impact</p>
                          <p className="font-medium text-green-600">
                            {(pickup.quantity * 2.5).toFixed(1)} kg CO₂ saved
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                            {getStatusIcon(pickup.status)}
                            {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Truck className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No pickups scheduled</p>
                  <p className="text-sm mb-4">Schedule your first pickup to start recycling</p>
                  <Link href={route('household.schedule')}>
                    <Button variant="outline" className="gap-2">
                      Schedule Now
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}