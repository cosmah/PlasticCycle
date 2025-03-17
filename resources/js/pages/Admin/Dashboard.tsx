import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PackageCheck, Recycle } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

interface AdminDashboardProps {
    totalCollections: number;
    totalRecycled: number;
    activeCollectors: number;
}

export default function AdminDashboard({ totalCollections, totalRecycled, activeCollectors }: AdminDashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="mt-1 text-gray-500">System-wide recycling statistics and metrics</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <PackageCheck className="h-6 w-6 text-indigo-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Total Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <p className="text-4xl font-bold text-gray-900">{totalCollections}</p>
                                    <p className="text-sm text-gray-500 mt-1">successful pickups</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Recycle className="h-6 w-6 text-emerald-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Total Recycled</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <div className="flex items-baseline">
                                        <p className="text-4xl font-bold text-gray-900">{totalRecycled}</p>
                                        <p className="ml-1 text-xl text-gray-600">kg</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">materials processed</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Active Collectors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <p className="text-4xl font-bold text-gray-900">{activeCollectors}</p>
                                    <p className="text-sm text-gray-500 mt-1">registered collectors</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}