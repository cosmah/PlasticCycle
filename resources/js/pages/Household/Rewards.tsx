import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Gift, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { HouseholdRewardsProps, Reward } from './rewards';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rewards',
        href: '/household/rewards',
    },
];

export default function HouseholdRewards() {
    const { rewards, availablePoints } = usePage<HouseholdRewardsProps>().props;
    const [showSuccess, setShowSuccess] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        points: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('household.rewards.redeem'), {
            onSuccess: () => {
                reset('points');
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    const isValidPoints = Number(data.points) > 0 && Number(data.points) <= availablePoints;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rewards" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Gift className="w-6 h-6 text-purple-600" />
                        <h1 className="text-2xl font-bold">Rewards</h1>
                    </div>

                    {showSuccess && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                            <Gift className="w-5 h-5" />
                            <p>Points redeemed successfully!</p>
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="border-b">
                                <CardTitle className="text-xl">Available Points</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl font-bold text-purple-600">{availablePoints}</p>
                                    <p className="text-gray-600">points</p>
                                </div>
                                
                                <form onSubmit={submit} className="mt-6 space-y-4">
                                    <div>
                                        <Label htmlFor="points" className="text-sm font-medium">
                                            Points to Redeem
                                        </Label>
                                        <Input
                                            id="points"
                                            type="number"
                                            value={data.points}
                                            onChange={(e) => setData('points', e.target.value)}
                                            placeholder="Enter points to redeem"
                                            className="mt-1"
                                            min="1"
                                            max={availablePoints}
                                            disabled={processing || availablePoints === 0}
                                        />
                                        <InputError message={errors.points} />
                                        {Number(data.points) > availablePoints && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                Cannot redeem more than available points
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                        disabled={processing || !isValidPoints}
                                    >
                                        {processing ? 'Redeeming...' : 'Redeem Points'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg">
                            <CardHeader className="border-b">
                                <CardTitle className="text-xl">Reward History</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {rewards.length ? (
                                    <div className="space-y-4">
                                        {rewards.map((reward: Reward) => (
                                            <div
                                                key={reward.id}
                                                className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-purple-600">
                                                            {reward.points} points
                                                        </p>
                                                        <p className="text-gray-600">{reward.description}</p>
                                                    </div>
                                                    {reward.redeemed_at && (
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(reward.redeemed_at).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No rewards yet. Start earning points!</p>
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