import { Head, Link, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function BusinessDashboard() {
    const { recentPickups, totalRecycled, pendingPickups } = usePage<{ recentPickups: Array<{ id: Key; quantity: number; plastic_type: string; status: string; scheduled_at: string }>, totalRecycled: number, pendingPickups: number }>().props;

    return (
        <SidebarProvider>
            <Head title="Business Dashboard" />
            <div className="flex min-h-screen bg-gray-50">
                <AppSidebar />
                <main className="flex-1 p-6 space-y-6">
                    <SidebarTrigger />
                    <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="shadow-lg border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-700">Total Recycled</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-green-600">{totalRecycled} kg</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-700">Pending Pickups</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-orange-500">{pendingPickups}</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-700">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Link href={route('business.waste')}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Schedule Pickup</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6 shadow-lg border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700">Recent Pickups</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPickups.length ? (
                                <ul className="divide-y divide-gray-200">
                                    {recentPickups.map((pickup) => (
                                        <li key={pickup.id} className="py-3 flex justify-between items-center text-gray-600">
                                            <span className="text-lg">{pickup.quantity} kg of {pickup.plastic_type}</span>
                                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${pickup.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{pickup.status}</span>
                                            <span className="text-sm text-gray-500">{new Date(pickup.scheduled_at).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No recent pickups.</p>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}
