import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
    id: string;
    data: {
        message: string;
        pickup_id: number;
        scheduled_at: string;
    };
    created_at: string;
    read_at: string | null;
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
    auth: { user: { id: number } };
    notifications?: Notification[]; // Make optional to avoid undefined issues
}

export default function HouseholdNotifications() {
    const { notifications: initialNotifications = [] } = usePage<PageProps>().props; // Default to empty array
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/household/notifications', {
                headers: { Accept: 'application/json' }, // Ensure JSON response
            });
            setNotifications(response.data.notifications || []); // Fallback to empty array
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            setNotifications([]); // Fallback on error
        }
    };

    useEffect(() => {
        fetchNotifications(); // Initial fetch
        const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const markAsRead = async (notificationId: string) => {
        try {
            await axios.post(`/household/notifications/${notificationId}/mark-as-read`);
            fetchNotifications(); // Refresh notifications after marking as read
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    return (
        <SidebarProvider>
            <Head title="Notifications" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">Notifications</h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {notifications.length > 0 ? ( // Check length safely
                                <ul>
                                    {notifications.map((notification) => (
                                        <li key={notification.id} className="py-2 cursor-pointer" onClick={() => markAsRead(notification.id)}>
                                            {notification.data.message} -{' '}
                                            {new Date(notification.created_at).toLocaleString()}
                                            {notification.read_at ? ' (Read)' : ' (Unread)'}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No notifications yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}
