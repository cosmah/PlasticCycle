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
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Business Dashboard</h1>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Recycled</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{totalRecycled} kg</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Pickups</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{pendingPickups}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Link href={route('business.waste')}>
                                    <Button>Schedule Pickup</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Recent Pickups</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPickups.length ? (
                                <ul>
                                    {recentPickups.map((pickup: { id: Key | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduled_at: string | number | Date; }) => (
                                        <li key={pickup.id} className="py-2">
                                            {pickup.quantity} kg of {pickup.plastic_type} - {pickup.status} ({new Date(pickup.scheduled_at).toLocaleDateString()})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent pickups.</p>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}