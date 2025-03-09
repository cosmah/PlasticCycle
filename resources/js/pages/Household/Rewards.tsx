import { Head, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function HouseholdRewards() {
    const { rewards, availablePoints } = usePage<{ rewards: any[], availablePoints: number }>().props;
    const { data, setData, post, processing, errors } = useForm({
        points: '',
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post(route('household.rewards.redeem'));
    };

    return (
        <SidebarProvider>
            <Head title="Rewards" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Rewards</h1>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Points</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{availablePoints}</p>
                                <form onSubmit={submit} className="mt-4 space-y-4">
                                    <div>
                                        <Label htmlFor="points">Points to Redeem</Label>
                                        <Input
                                            id="points"
                                            type="number"
                                            value={data.points}
                                            onChange={(e) => setData('points', e.target.value)}
                                            placeholder="Enter points"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.points} />
                                    </div>
                                    <Button type="submit" disabled={processing || availablePoints === 0}>
                                        Redeem Points
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Reward History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {rewards.length ? (
                                    <ul>
                                        {rewards.map((reward: { id: Key | null | undefined; points: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; redeemed_at: string | number | Date; }) => (
                                            <li key={reward.id} className="py-2">
                                                {reward.points} points - {reward.description} {reward.redeemed_at ? `(Redeemed on ${new Date(reward.redeemed_at).toLocaleDateString()})` : ''}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No rewards yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}