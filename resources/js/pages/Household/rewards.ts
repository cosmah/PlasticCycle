import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type HouseholdRewardsProps = InertiaPageProps & {
    rewards: Reward[];
    availablePoints: number;
};

export interface Reward {
    id: string;
    points: number;
    description: string;
    redeemed_at: string | null;
  }
  
