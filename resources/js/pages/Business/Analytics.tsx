import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { CalendarCheck2, LineChart, Recycle, ArrowUp, ArrowDown } from 'lucide-react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface BusinessAnalyticsProps {
    monthlyRecycling: { [key: string]: number };
    totalRecycled: number;
    yearlyComparison?: number; // Percentage change from previous year
    mostRecycledType?: { type: string; amount: number };
    lastMonthChange?: number; // Percentage change from last month
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
        tension?: number;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '/business/analytics',
    },
];

export default function BusinessAnalytics({ 
    monthlyRecycling, 
    totalRecycled,
    yearlyComparison = 12.5,
    mostRecycledType = { type: 'PET', amount: 485 },
    lastMonthChange = 3.2
}: BusinessAnalyticsProps) {
    // Calculate average monthly recycling
    const averageMonthly = Object.values(monthlyRecycling).reduce((sum, val) => sum + val, 0) / 
        (Object.values(monthlyRecycling).length || 1);
    
    // Format months for better display
    const formatMonth = (monthKey: string) => {
        // Assuming monthKey is in format "2023-01", "2023-02", etc.
        const [year, month] = monthKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'short' });
    };

    const chartData: ChartData = {
        labels: Object.keys(monthlyRecycling)
            .sort()
            .map(formatMonth),
        datasets: [
            {
                label: 'Recycled Waste (kg)',
                data: Object.keys(monthlyRecycling)
                    .sort()
                    .map(month => monthlyRecycling[month]),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4, // Makes the line curvy for a more modern look
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: '#1f2937', font: { size: 12 } }
            },
            title: {
                display: false, // Removing title as we have CardTitle
            },
        },
        scales: {
            x: {
                grid: { display: false }, // Remove x grid for cleaner look
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recycling Analytics" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Recycling Analytics</h1>
                </div>
                
                {/* Key metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Recycled</p>
                                    <p className="text-3xl font-bold text-gray-800">{totalRecycled} kg</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`flex items-center ${yearlyComparison >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {yearlyComparison >= 0 ? (
                                                <ArrowUp className="h-4 w-4 mr-1" />
                                            ) : (
                                                <ArrowDown className="h-4 w-4 mr-1" />
                                            )}
                                            {Math.abs(yearlyComparison)}%
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">vs last year</span>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Recycle className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Monthly Average</p>
                                    <p className="text-3xl font-bold text-gray-800">{averageMonthly.toFixed(1)} kg</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`flex items-center ${lastMonthChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {lastMonthChange >= 0 ? (
                                                <ArrowUp className="h-4 w-4 mr-1" />
                                            ) : (
                                                <ArrowDown className="h-4 w-4 mr-1" />
                                            )}
                                            {Math.abs(lastMonthChange)}%
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">vs last month</span>
                                    </div>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <CalendarCheck2 className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Top Material</p>
                                    <p className="text-3xl font-bold text-gray-800">{mostRecycledType.type}</p>
                                    <p className="text-sm text-gray-500 mt-2">{mostRecycledType.amount} kg total</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <Recycle className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Carbon Offset</p>
                                    <p className="text-3xl font-bold text-gray-800">{(totalRecycled * 2.5).toFixed(0)} kg</p>
                                    <p className="text-sm text-gray-500 mt-2">CO₂ equivalent</p>
                                </div>
                                <div className="bg-teal-100 p-3 rounded-lg">
                                    <LineChart className="h-6 w-6 text-teal-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Chart */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Recycling Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <Line data={chartData} options={options} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}