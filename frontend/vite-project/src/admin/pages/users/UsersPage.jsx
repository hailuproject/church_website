import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Edit3, ImagePlus, Power, PowerOff, ShieldCheck, Trash2, UserPlus, Users } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { UserFormModal } from './UserFormModal';
import { UserAvatarModal } from './UserAvatarModal';
import { userService } from '../../services/system.service';
import { useListQuery } from '../../hooks/useListQuery';
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/api';
import { formatDateTime } from '../../utils/format';
import { ROLE_VALUES, ROLES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const UsersPage = () => {
  usePageMeta('Users');
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();
  const isSuperAdmin = currentUser?.role === ROLES.SUPER_ADMIN;

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [avatarUser, setAvatarUser] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = useListQuery({
    key: 'users',
    fetcher: (params) => userService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['users'] });

  const createMutation = useMutation({
    mutationFn: (payload) => userService.create(payload),
    onSuccess: () => {
      toast.success('User created');
      setFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => userService.update(id, payload),
    onSuccess: () => {
      toast.success('User updated');
      setFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.remove(id),
    onSuccess: () => {
      toast.success('User deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => userService.changeRole(id, role),
    onSuccess: () => {
      toast.success('Role updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }) => userService.toggleStatus(id, isActive),
    onSuccess: (_, vars) => {
      toast.success(vars.isActive ? 'User activated' : 'User deactivated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: 'User',
        render: (row) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.name} src={row.avatar?.url} size="md" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {row.name}
                {row._id === currentUser?._id && (
                  <span className="ml-2 text-xs font-normal text-primary-600 dark:text-primary-400">(you)</span>
                )}
              </p>
              <p className="text-xs text-gray-400">{row.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'phone',
        header: 'Phone',
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.phone || '—'}</span>,
      },
      {
        key: 'role',
        header: 'Role',
        render: (row) => (
          <Badge tone={row.role === ROLES.SUPER_ADMIN ? 'info' : 'neutral'}>
            <ShieldCheck className="h-3.5 w-3.5" />
            {row.role}
          </Badge>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => (
          <Badge tone={row.isActive ? 'success' : 'danger'}>{row.isActive ? 'Active' : 'Deactivated'}</Badge>
        ),
      },
      {
        key: 'lastLogin',
        header: 'Last sign-in',
        render: (row) => (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {row.lastLogin ? formatDateTime(row.lastLogin) : 'Never'}
          </span>
        ),
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <ActionMenu
            row={row}
            items={[
              {
                label: 'Edit user',
                icon: Edit3,
                onClick: (r) => {
                  setEditing(r);
                  setFormOpen(true);
                },
              },
              {
                label: 'Upload avatar',
                icon: ImagePlus,
                onClick: (r) => setAvatarUser(r),
              },
              ...(row._id !== currentUser?._id && isSuperAdmin
                ? [
                    {
                      label: row.isActive ? 'Deactivate' : 'Activate',
                      icon: row.isActive ? PowerOff : Power,
                      onClick: (r) => statusMutation.mutate({ id: r._id, isActive: !r.isActive }),
                    },
                    ...(isSuperAdmin
                      ? ROLE_VALUES.filter((r) => r !== row.role).map((role) => ({
                          label: `Make ${role}`,
                          onClick: (r) => roleMutation.mutate({ id: r._id, role }),
                        }))
                      : []),
                    {
                      label: 'Delete',
                      icon: Trash2,
                      danger: true,
                      onClick: (r) => setDeleting(r),
                    },
                  ]
                : []),
            ]}
          />
        ),
      },
    ],
    [currentUser, isSuperAdmin, statusMutation, roleMutation]
  );

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage admin staff accounts and roles"
        breadcrumbs={[{ label: 'Users' }]}
        actions={
          <Button onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}>
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={list.items}
        loading={list.isLoading}
        error={list.error}
        onRetry={list.refetch}
        pagination={list.pagination}
        onPageChange={list.setPage}
        onLimitChange={list.setLimit}
        toolbar={
          <>
            <SearchInput
              value={list.searchInput}
              onChange={list.setSearchInput}
              placeholder="Search users…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Role"
                value={list.filters.role}
                onChange={(v) => list.setFilter('role', v)}
                options={ROLE_VALUES}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No users found"
        emptyDescription="Admin accounts you create will appear here."
        emptyIcon={Users}
      />

      <UserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        user={editing}
        canManageSecurity={isSuperAdmin}
        submitting={createMutation.isPending || updateMutation.isPending}
        onSubmit={(payload) => {
          if (editing?._id) updateMutation.mutate({ id: editing._id, payload });
          else createMutation.mutate(payload);
        }}
      />
      <UserAvatarModal open={Boolean(avatarUser)} onClose={() => setAvatarUser(null)} user={avatarUser} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete user"
        description={`Delete ${deleting?.name}? This permanently removes their account.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default UsersPage;
