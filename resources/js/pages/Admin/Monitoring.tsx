// resources/js/Pages/Admin/Monitoring.jsx
import { Head } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Collection {
    date: string;
    count: number;
}

interface Recycling {
    month: string;
    total: number;
}

interface SystemMonitoringProps {
    dailyCollections: Collection[];
    monthlyRecycling: Recycling[];
}

export default function SystemMonitoring({ dailyCollections, monthlyRecycling }: SystemMonitoringProps) {
    const dailyData = {
        labels: dailyCollections.map((item) => item.date),
        datasets: [{
            label: 'Daily Collections',
            data: dailyCollections.map((item) => item.count),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };

    const monthlyData = {
        labels: monthlyRecycling.map((item) => item.month),
        datasets: [{
            label: 'Monthly Recycling (kg)',
            data: monthlyRecycling.map((item) => item.total),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
        }],
    };

    return (
        <SidebarProvider>
            <Head title="System Monitoring" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Line data={dailyData} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Recycling</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Line data={monthlyData} />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}