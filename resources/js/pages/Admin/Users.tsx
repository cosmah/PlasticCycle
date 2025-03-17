// resources/js/Pages/Admin/UserManagement.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trash2, UserCog } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
    ];

    const { data, setData, patch, delete: destroy, processing, errors, reset } = useForm<{
        type?: string;
    }>({});

    const updateRole = (userId: number, role: string) => {
        setData('type', role);
        patch(route('admin.users.update-role', userId), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Role updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            },
            onError: (errors) => {
                console.error('Error updating role:', errors);
                toast.error('Failed to update role', {
                    position: "top-right",
                    autoClose: 3000,
                });
            },
        });
    };

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            destroy(route('admin.users.destroy', userId), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('User deleted successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                },
                onError: (errors) => {
                    console.error('Error deleting user:', errors);
                    toast.error('Failed to delete user', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <ToastContainer />
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <UserCog className="h-8 w-8 text-indigo-600" />
                            User Management
                        </h1>
                        <p className="mt-2 text-gray-600">Manage user roles and account details</p>
                    </div>

                    <Card className="bg-white shadow-lg">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-6 w-6 text-indigo-600" />
                                User List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recycled</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Select
                                                            defaultValue={user.type}
                                                            onValueChange={(value) => updateRole(user.id, value)}
                                                            disabled={processing}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="household">Household</SelectItem>
                                                                <SelectItem value="business">Business</SelectItem>
                                                                <SelectItem value="collector">Collector</SelectItem>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.type && (
                                                            <span className="text-red-500 text-sm mt-1 block">{errors.type}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.pickup_requests_count}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.recycling_records_count}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(user.id)}
                                                            disabled={processing}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                    No users found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}