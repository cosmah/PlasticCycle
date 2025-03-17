import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
    const { data, setData, post, processing, reset } = useForm<{
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
        post(route('admin.centers.store'), {
            onSuccess: () => {
                toast.success('Center added successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                reset();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Recycling Centers" />
            <ToastContainer />
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800">Recycling Centers</h1>
                    <Card className="shadow-md border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-700">Add New Center</CardTitle>
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
                                <Button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                                    {processing ? 'Adding...' : 'Add Center'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-700">Existing Centers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {centers.length ? (
                                <ul className="divide-y divide-gray-200">
                                    {centers.map((center) => (
                                        <li key={center.id} className="py-4 px-2 text-gray-700">
                                            <span className="font-semibold text-gray-900">{center.name}</span> - {center.address}
                                            <br />
                                            <span className="text-sm text-gray-600">Accepts: {center.accepted_plastic_types.join(', ')}</span>
                                            <br />
                                            <span className="text-sm text-gray-600">Capacity: {center.capacity} kg/day</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No centers available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
