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

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    }[];
}


export default function BusinessAnalytics({ monthlyRecycling, totalRecycled }: BusinessAnalyticsProps) {
    const chartData: ChartData = {
        labels: Object.keys(monthlyRecycling).sort(), // Sort months chronologically
        datasets: [
            {
                label: 'Recycled Waste (kg)',
                data: Object.keys(monthlyRecycling)
                    .sort()
                    .map(month => monthlyRecycling[month]),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                position: 'top' as const,
                labels: { color: '#1f2937' }
            },
            title: { 
                display: true, 
                text: 'Monthly Recycling Trends',
                color: '#1f2937',
                font: { size: 16 }
            },
        },
        scales: {
            x: {
                grid: { color: '#e5e7eb' },
                ticks: { color: '#4b5563' }
            },
            y: {
                grid: { color: '#e5e7eb' },
                ticks: { 
                    color: '#4b5563',
                    callback: function(value: string | number) {
                        return `${value} kg`;
                    }
                }
            }
        }
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