import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Clock, RecycleIcon } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { Key } from 'react';

export default function CollectorDashboard() {
    const { pendingRequests, recentCollections, totalCollected } = usePage<{ 
        pendingRequests: number; 
        recentCollections: { 
            id: Key; 
            quantity: string; 
            plastic_type: string; 
            scheduled_at: string; 
        }[]; 
        totalCollected: number; 
    }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/collector/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Collector Dashboard" />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Collector Dashboard</h1>
                            <p className="mt-1 text-gray-500">Overview of your collection activities</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Scale className="h-6 w-6 text-green-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Total Collected</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <p className="text-4xl font-bold text-gray-900">{totalCollected}</p>
                                    <p className="text-sm text-gray-500 mt-1">kilograms collected</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Pending Requests</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-2">
                                    <p className="text-4xl font-bold text-gray-900">{pendingRequests}</p>
                                    <p className="text-sm text-gray-500 mt-1">awaiting collection</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-1">
                        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <RecycleIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-700">Recent Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentCollections.length ? (
                                    <ul className="divide-y divide-gray-100">
                                        {recentCollections.map((collection) => (
                                            <li key={collection.id} className="py-3">
                                                <Link 
                                                    href={route('collector.pickup-details', { id: collection.id })}
                                                    className="group block"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                            {collection.quantity} kg of {collection.plastic_type}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(collection.scheduled_at).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-gray-500">No recent collections.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}