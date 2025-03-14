import { Head, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEvent } from 'react';

// Define the User type based on your User model
interface User {
    id: number;
    name: string;
    email: string;
    type: 'household' | 'business' | 'collector' | 'admin';
    pickup_requests_count: number;
    recycling_records_count: number;
}

// Props interface for the component
interface UserManagementProps {
    users: User[];
}

export default function UserManagement({ users }: UserManagementProps) {
    // Single useForm instance for both patch and delete actions
    const { data, setData, patch, delete: destroy, processing, errors, reset } = useForm<{
        type?: string;
    }>({});

    // Handle role update
    const updateRole = (userId: number, role: string) => {
        setData('type', role);
        patch(route('admin.users.update-role', userId), {
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Clear form data after success
                // Optionally, add a success toast/notification here
            },
            onError: (errors) => {
                console.error('Error updating role:', errors);
                // Optionally, add an error toast/notification here
            },
        });
    };

    // Handle user deletion
    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('admin.users.destroy', userId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally, add a success toast/notification here
                },
                onError: (errors) => {
                    console.error('Error deleting user:', errors);
                    // Optionally, add an error toast/notification here
                },
            });
        }
    };

    return (
        <SidebarProvider>
            <Head title="User Management" />
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold mb-6">User Management</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recycled</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Select
                                                defaultValue={user.type}
                                                onValueChange={(value) => updateRole(user.id, value)}
                                                disabled={processing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="household">Household</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                    <SelectItem value="collector">Collector</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && <span className="text-red-500 text-sm">{errors.type}</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.pickup_requests_count}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.recycling_records_count}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={processing}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}