import { Head, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function BusinessWaste() {
    const { pickupRequests } = usePage<{ pickupRequests: Array<{ id: Key; quantity: number; plastic_type: string; status: string; scheduled_at: string }> }>().props;
    const { data, setData, post, processing, errors } = useForm({
        plastic_type: '',
        quantity: '',
        scheduled_at: '',
        compliance_notes: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('business.waste.store'));
    };

    return (
        <SidebarProvider>
            <Head title="Waste Management" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Waste Management</h1>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule a Pickup</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="plastic_type">Plastic Type</Label>
                                        <Input
                                            id="plastic_type"
                                            value={data.plastic_type}
                                            onChange={(e) => setData('plastic_type', e.target.value)}
                                            placeholder="e.g., PET, HDPE"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.plastic_type} />
                                    </div>
                                    <div>
                                        <Label htmlFor="quantity">Quantity (kg)</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            placeholder="Enter weight in kg"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>
                                    <div>
                                        <Label htmlFor="scheduled_at">Scheduled Date</Label>
                                        <Input
                                            id="scheduled_at"
                                            type="datetime-local"
                                            value={data.scheduled_at}
                                            onChange={(e) => setData('scheduled_at', e.target.value)}
                                            disabled={processing}
                                        />
                                        <InputError message={errors.scheduled_at} />
                                    </div>
                                    <div>
                                        <Label htmlFor="compliance_notes">Compliance Notes</Label>
                                        <Textarea
                                            id="compliance_notes"
                                            value={data.compliance_notes}
                                            onChange={(e: { target: { value: string; }; }) => setData('compliance_notes', e.target.value)}
                                            placeholder="Optional compliance details"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.compliance_notes} />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        Schedule Pickup
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pickup History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {pickupRequests.length ? (
                                    <ul>
                                        {pickupRequests.map((pickup: { id: Key | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; plastic_type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; scheduled_at: string | number | Date; }) => (
                                            <li key={pickup.id} className="py-2">
                                                {pickup.quantity} kg of {pickup.plastic_type} - {pickup.status} ({new Date(pickup.scheduled_at).toLocaleDateString()})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No pickup requests yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}