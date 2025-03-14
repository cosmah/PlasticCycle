// resources/js/Pages/Admin/Centers.jsx
import { Head, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Center {
    id: number;
    name: string;
    address: string;
    accepted_plastic_types: string[];
    capacity: number;
}

interface AdminCentersProps {
    centers: Center[];
}

export default function AdminCenters({ centers }: AdminCentersProps) {
    const { data, setData, post, processing } = useForm<{
        name: string;
        address: string;
        accepted_plastic_types: string[];
        capacity: string;
    }>({
        name: '',
        address: '',
        accepted_plastic_types: [],
        capacity: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('admin.centers.store'));
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
                                <CardTitle>Add New Center</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <Input
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Accepted Plastic Types (comma-separated)"
                                        value={data.accepted_plastic_types.join(',')}
                                        onChange={(e) => setData('accepted_plastic_types', e.target.value.split(','))}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Capacity (kg/day)"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                    />
                                    <Button type="submit" disabled={processing}>Add Center</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Existing Centers</CardTitle>
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
                                    <p>No centers available.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}