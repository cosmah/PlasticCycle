import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Assuming Chart.js integration
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BusinessAnalyticsProps {
    monthlyRecycling: { [key: string]: number };
    totalRecycled: number;
}

export default function BusinessAnalytics({ monthlyRecycling, totalRecycled }: BusinessAnalyticsProps) {
    const chartData = {
        labels: Object.keys(monthlyRecycling),
        datasets: [
            {
                label: 'Recycled Waste (kg)',
                data: Object.values(monthlyRecycling),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Monthly Recycling Trends' },
        },
    };

    return (
        <SidebarProvider>
            <Head title="Analytics" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Analytics</h1>

                    <div className="grid gap-6">
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
                                <CardTitle>Recycling Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Line data={chartData} options={options} />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}