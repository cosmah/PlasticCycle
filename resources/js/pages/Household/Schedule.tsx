import { Head, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function HouseholdSchedule() {
    const { data, setData, post, processing, errors } = useForm({
        plastic_type: '',
        quantity: '',
        scheduled_at: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('household.schedule.store'));
    };

    return (
        <SidebarProvider>
            <Head title="Schedule Pickup" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Schedule Pickup</h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Request a Pickup</CardTitle>
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
                                <Button type="submit" disabled={processing}>
                                    Schedule Pickup
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}