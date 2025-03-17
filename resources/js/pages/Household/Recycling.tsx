import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Leaf, Calendar, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Record {
  id: string;
  quantity: number;
  pickup_request: {
    plastic_type: string;
  };
  processed_at: string;
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
  records: Record[];
  totalImpact: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Recycling',
        href: '/household/recycling',
    },
];

export default function HouseholdRecycling() {
  const { records, totalImpact } = usePage<PageProps>().props;

  // Calculate monthly impact
  const monthlyImpact = records.reduce((acc, record) => {
    const thisMonth = new Date().getMonth() === new Date(record.processed_at).getMonth();
    return thisMonth ? acc + Number(record.quantity) : acc;
  }, 0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Recycling" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Recycle className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">My Recycling Impact</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Impact</p>
                    <p className="text-2xl font-bold text-gray-900">{totalImpact} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{monthlyImpact} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Records</p>
                    <p className="text-2xl font-bold text-gray-900">{records.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Recycling History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {records.length ? (
                <div className="divide-y divide-gray-100">
                  {records.map((record) => (
                    <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Recycle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.quantity} kg</p>
                            <p className="text-sm text-gray-600">{record.pickup_request.plastic_type}</p>
                          </div>
                        </div>

                        <div className="sm:text-center">
                          <p className="text-sm text-gray-500">Processed on</p>
                          <p className="font-medium text-gray-900">
                            {new Date(record.processed_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-sm text-gray-500">Environmental Impact</p>
                          <p className="font-medium text-green-600">
                            {Number(record.quantity).toFixed(1)} kg CO₂ saved
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Recycle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No recycling records yet</p>
                  <p className="text-sm">Start recycling to track your environmental impact</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}