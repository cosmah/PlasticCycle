import { Head, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key } from 'react';

export default function CollectorCenters() {
    const { centers, completedRequests } = usePage<{ centers: Center[], completedRequests: Request[] }>().props;

    interface Center {
        id: Key;
        name: string;
        address: string;
        accepted_plastic_types: string[];
        capacity: number;
    }

    interface Request {
        id: Key;
        quantity: number;
        plastic_type: string;
    }

    const { data, setData, post, processing } = useForm({
        pickup_request_id: '',
        recycling_center_id: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('collector.centers.deliver'));
    };

    return (
        <SidebarProvider>
            <Head title="Recycling Centers" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Recycling Centers</h1>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Deliver Waste</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label htmlFor="pickup_request_id" className="block text-sm font-medium">Completed Request</label>
                                        <Select onValueChange={(value) => setData('pickup_request_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a request" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {completedRequests.map((request) => (
                                                    <SelectItem key={request.id} value={request.id.toString()}>
                                                        {request.quantity} kg of {request.plastic_type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label htmlFor="recycling_center_id" className="block text-sm font-medium">Recycling Center</label>
                                        <Select onValueChange={(value) => setData('recycling_center_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a center" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {centers.map((center) => (
                                                    <SelectItem key={center.id} value={center.id.toString()}>
                                                        {center.name} ({center.address})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" disabled={processing || !completedRequests.length}>
                                        Deliver Waste
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recycling Centers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {centers.length ? (
                                    <ul>
                                        {centers.map((center) => (
                                            <li key={center.id} className="py-2">
                                                {center.name} - {center.address} (Accepts: {center.accepted_plastic_types.join(', ')}, Capacity: {center.capacity} kg/day)
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No recycling centers available.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}