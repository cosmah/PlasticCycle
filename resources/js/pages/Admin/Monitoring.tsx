// resources/js/Pages/Admin/Monitoring.tsx
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import { type BreadcrumbItem } from '@/types';
import { TrendingUp, Recycle } from 'lucide-react';

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
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'System Monitoring',
            href: '/admin/monitoring',
        },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                    },
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 12,
                },
                padding: 10,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    beginAtZero: true,
                    callback: (value: number | string) => value,
                },
            },
        },
    };

    const dailyData = {
        labels: dailyCollections.map((item) => item.date),
        datasets: [{
            label: 'Daily Collections',
            data: dailyCollections.map((item) => item.count),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(75, 192, 192)',
            fill: true,
        }],
    };

    const monthlyData = {
        labels: monthlyRecycling.map((item) => item.month),
        datasets: [{
            label: 'Monthly Recycling (kg)',
            data: monthlyRecycling.map((item) => item.total),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
            fill: true,
        }],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Monitoring" />
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-indigo-600" />
                            System Monitoring
                        </h1>
                        <p className="mt-2 text-gray-600">Real-time insights into collection and recycling performance</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                                    <Recycle className="h-5 w-5 text-teal-600" />
                                    Daily Collections
                                </CardTitle>
                                <p className="text-sm text-gray-500">Number of collections per day</p>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="h-96">
                                    <Line 
                                        data={dailyData} 
                                        options={chartOptions}
                                        className="w-full h-full"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                                    <Recycle className="h-5 w-5 text-rose-600" />
                                    Monthly Recycling
                                </CardTitle>
                                <p className="text-sm text-gray-500">Total kilograms recycled per month</p>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="h-96">
                                    <Line 
                                        data={monthlyData} 
                                        options={chartOptions}
                                        className="w-full h-full"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}