
import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

interface Notification {
    id: number;
    message: string;
    pickup_id: number;
    scheduled_at: string;
    created_at: string;
}

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
    auth: { user: { id: number } };
    notifications: Notification[];
}

export default function HouseholdNotifications() {
    const { notifications: initialNotifications, auth } = usePage<PageProps>().props;
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    useEffect(() => {
        window.Pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
        });

        echo.private(`user.${auth.user.id}`)
            .listen('PickupScheduled', (e: Notification) => {
                setNotifications((prev) => [e, ...prev]);
            })
            .notification((notification: Notification) => {
                setNotifications((prev) => [notification, ...prev]);
            });

        return () => {
            echo.disconnect();
        };
    }, [auth.user.id]);

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
                            {notifications.length ? (
                                <ul>
                                    {notifications.map((notification) => (
                                        <li key={notification.id} className="py-2">
                                            {notification.message} - {new Date(notification.created_at).toLocaleString()}
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