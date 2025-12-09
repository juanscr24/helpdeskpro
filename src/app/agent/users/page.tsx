'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@src/components/layout/Header';
import { Sidebar } from '@src/components/layout/Sidebar';
import { Card } from '@src/components/ui/Card';
import { Button } from '@src/components/ui/Button';
import { Badge } from '@src/components/ui/Badge';
import { Modal } from '@src/components/ui/Modal';
import { Select } from '@src/components/ui/Select';
import { Input } from '@src/components/ui/Input';
import { getAllUsers, deleteUser, updateUser, changeUserRole, UserWithStats } from '@src/services/userService';
import { Role } from '@src/types';
import toast from 'react-hot-toast';
import { Users, UserCog, Trash2, Edit, Shield } from 'lucide-react';

export default function UsersManagementPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState<UserWithStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [roleModalOpen, setRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const [selectedRole, setSelectedRole] = useState<'CLIENT' | 'AGENT'>('CLIENT');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated' && session?.user?.role !== 'AGENT') {
            router.push('/client/dashboard');
        }
    }, [status, session, router]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.role === 'AGENT') {
            loadUsers();
        }
    }, [status, session]);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (error: any) {
            toast.error(error.message || 'Error al cargar usuarios');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (user: UserWithStats) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return;

        try {
            await deleteUser(selectedUser.id);
            toast.success('Usuario eliminado exitosamente');
            setDeleteModalOpen(false);
            loadUsers();
        } catch (error: any) {
            toast.error(error.message || 'Error al eliminar usuario');
        }
    };

    const handleEditClick = (user: UserWithStats) => {
        setSelectedUser(user);
        setEditForm({ name: user.name, email: user.email });
        setEditModalOpen(true);
    };

    const handleEditSubmit = async () => {
        if (!selectedUser) return;

        try {
            await updateUser(selectedUser.id, editForm);
            toast.success('Usuario actualizado exitosamente');
            setEditModalOpen(false);
            loadUsers();
        } catch (error: any) {
            toast.error(error.message || 'Error al actualizar usuario');
        }
    };

    const handleRoleClick = (user: UserWithStats) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        setRoleModalOpen(true);
    };

    const handleRoleChange = async () => {
        if (!selectedUser) return;

        try {
            await changeUserRole(selectedUser.id, selectedRole as Role);
            toast.success('Rol actualizado exitosamente');
            setRoleModalOpen(false);
            loadUsers();
        } catch (error: any) {
            toast.error(error.message || 'Error al cambiar rol');
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex h-screen">
                <Sidebar role="agent" />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 p-8 bg-gray-50">
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const clientsCount = users.filter((u) => u.role === 'CLIENT').length;
    const agentsCount = users.filter((u) => u.role === 'AGENT').length;

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role="agent" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
                            <p className="text-gray-600">Administra todos los usuarios del sistema</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary-100 rounded-lg">
                                        <Users className="w-6 h-6 text-primary-900" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Usuarios</p>
                                        <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-secondary-100 rounded-lg">
                                        <UserCog className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Clientes</p>
                                        <p className="text-2xl font-bold text-gray-900">{clientsCount}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-accent-100 rounded-lg">
                                        <Shield className="w-6 h-6 text-accent-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Agentes</p>
                                        <p className="text-2xl font-bold text-gray-900">{agentsCount}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Users Table */}
                        <Card>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Usuario
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rol
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tickets Creados
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tickets Asignados
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Registrado
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                                            <span className="text-primary-900 font-semibold">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={user.role === 'AGENT' ? 'in_progress' : 'open'}>
                                                        {user.role === 'AGENT' ? 'Agente' : 'Cliente'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user._count?.ticketsCreated || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user._count?.ticketsAssigned || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-primary-900 hover:bg-primary-50 rounded transition-colors"
                                                            onClick={() => handleRoleClick(user)}
                                                            title="Cambiar rol"
                                                        >
                                                            <Shield className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="p-2 text-gray-600 hover:text-primary-900 hover:bg-primary-50 rounded transition-colors"
                                                            onClick={() => handleEditClick(user)}
                                                            title="Editar"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => handleDeleteClick(user)}
                                                            disabled={user.id === session?.user?.id}
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                title="Eliminar Usuario"
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                confirmText="Eliminar"
                cancelText="Cancelar"
                isDangerous
            >
                <p className="text-gray-700">
                    ¿Estás seguro de que deseas eliminar al usuario{' '}
                    <strong>{selectedUser?.name}</strong>? Esta acción no se puede deshacer y
                    también eliminará todos sus tickets y comentarios.
                </p>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalOpen}
                title="Editar Usuario"
                onClose={() => setEditModalOpen(false)}
                onConfirm={handleEditSubmit}
                confirmText="Guardar"
                cancelText="Cancelar"
            >
                <div className="space-y-4">
                    <Input
                        label="Nombre"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                    />
                </div>
            </Modal>

            {/* Role Change Modal */}
            <Modal
                isOpen={roleModalOpen}
                title="Cambiar Rol"
                onClose={() => setRoleModalOpen(false)}
                onConfirm={handleRoleChange}
                confirmText="Cambiar Rol"
                cancelText="Cancelar"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Cambiar el rol del usuario <strong>{selectedUser?.name}</strong>:
                    </p>
                    <Select
                        label="Rol"
                        options={[
                            { value: 'CLIENT', label: 'Cliente' },
                            { value: 'AGENT', label: 'Agente' },
                        ]}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                    />
                </div>
            </Modal>
        </div>
    );
}
