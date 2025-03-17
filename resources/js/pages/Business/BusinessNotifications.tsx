import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Bell, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: string;
    data: {
        message: string;
        pickup_id: number;
        scheduled_at: string;
        type?: string; // Optional type for categorizing notifications
    };
    created_at: string;
    read_at: string | null;
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
    auth: { user: { id: number } };
    notifications?: Notification[]; // Make optional to avoid undefined issues
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: '/business/notifications',
    },
];

export default function BusinessNotifications() {
    const { notifications: initialNotifications = [] } = usePage<PageProps>().props; // Default to empty array
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/business/notifications', {
                headers: { Accept: 'application/json' }, // Ensure JSON response
            });
            setNotifications(response.data.notifications || []); // Fallback to empty array
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            setNotifications([]); // Fallback on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Initial fetch
        const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const markAsRead = async (notificationId: string) => {
        try {
            await axios.post(`/business/notifications/${notificationId}/mark-as-read`);
            // Update locally first for better UX
            setNotifications(prev => 
                prev.map(notification => 
                    notification.id === notificationId 
                        ? { ...notification, read_at: new Date().toISOString() } 
                        : notification
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/business/notifications/mark-all-read');
            // Update all as read locally
            setNotifications(prev => 
                prev.map(notification => ({ ...notification, read_at: new Date().toISOString() }))
            );
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    const clearNotifications = async () => {
        try {
            await axios.delete('/business/notifications');
            setNotifications([]);
        } catch (error) {
            console.error('Failed to clear notifications:', error);
        }
    };

    // Filter notifications based on selected filter
    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'unread') return !notification.read_at;
        if (filter === 'read') return !!notification.read_at;
        return true; // 'all' filter
    });

    // Get notification icon based on data or read status
    const getNotificationIcon = (notification: Notification) => {
        const type = notification.data.type?.toLowerCase() || '';
        
        if (type.includes('pickup')) return <Clock className="h-5 w-5 text-blue-500" />;
        if (type.includes('success') || type.includes('complete')) return <CheckCircle className="h-5 w-5 text-green-500" />;
        if (type.includes('error') || type.includes('fail')) return <AlertCircle className="h-5 w-5 text-red-500" />;
        
        // Default icon based on read status
        return notification.read_at 
            ? <Bell className="h-5 w-5 text-gray-400" />
            : <Bell className="h-5 w-5 text-blue-500" />;
    };

    // Format relative time
    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSecs = Math.round(diffMs / 1000);
        const diffMins = Math.round(diffSecs / 60);
        const diffHours = Math.round(diffMins / 60);
        const diffDays = Math.round(diffHours / 24);

        if (diffSecs < 60) return `${diffSecs} second${diffSecs !== 1 ? 's' : ''} ago`;
        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    };

    const unreadCount = notifications.filter(n => !n.read_at).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {unreadCount} unread
                            </Badge>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={markAllAsRead}
                            disabled={!notifications.some(n => !n.read_at)}
                        >
                            Mark all read
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={clearNotifications}
                            disabled={notifications.length === 0}
                            className="text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Clear all
                        </Button>
                    </div>
                </div>
                
                <Card className="bg-white shadow-sm">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle>Your Notifications</CardTitle>
                            <div className="flex gap-1">
                                <Button 
                                    onClick={() => setFilter('all')} 
                                    variant={filter === 'all' ? 'secondary' : 'ghost'}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button 
                                    onClick={() => setFilter('unread')} 
                                    variant={filter === 'unread' ? 'secondary' : 'ghost'}
                                    size="sm"
                                >
                                    Unread
                                </Button>
                                <Button 
                                    onClick={() => setFilter('read')} 
                                    variant={filter === 'read' ? 'secondary' : 'ghost'}
                                    size="sm"
                                >
                                    Read
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading && notifications.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">Loading notifications...</div>
                        ) : filteredNotifications.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {filteredNotifications.map((notification) => (
                                    <li 
                                        key={notification.id} 
                                        className={`flex items-start gap-3 py-4 px-6 hover:bg-gray-50 transition-colors ${!notification.read_at ? 'bg-blue-50' : ''}`}
                                        onClick={() => !notification.read_at && markAsRead(notification.id)}
                                    >
                                        <div className="mt-1">
                                            {getNotificationIcon(notification)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className={`text-sm ${!notification.read_at ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                                    {notification.data.message}
                                                </p>
                                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                    {getRelativeTime(notification.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {notification.data.pickup_id && (
                                                    <>Pickup ID: {notification.data.pickup_id} · </>
                                                )}
                                                {notification.data.scheduled_at && (
                                                    <>Scheduled: {new Date(notification.data.scheduled_at).toLocaleString()}</>
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-12 text-center">
                                <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <p className="text-gray-500">No {filter !== 'all' ? filter : ''} notifications yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}