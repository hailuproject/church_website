import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Inbox, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Pagination } from './Pagination';
import { SkeletonTable } from './Skeleton';
import { EmptyState } from './EmptyState';
import { Dropdown, DropdownItem, DropdownDivider } from './Dropdown';
import Button from './Button';

export const DataTable = ({
  columns,
  data = [],
  keyField = '_id',
  loading = false,
  error = null,
  onRetry,
  pagination,
  onPageChange,
  onLimitChange,
  sortBy: externalSortBy,
  order: externalOrder,
  onSort,
  selectable = false,
  selected = [],
  onSelectionChange,
  bulkActions = [],
  toolbar,
  emptyTitle = 'No data found',
  emptyDescription,
  emptyAction,
  emptyIcon,
  errorTitle = 'Failed to load data',
  className,
}) => {
  const [internalSort, setInternalSort] = useState(null);

  const effectiveSort = externalSortBy || internalSort?.key || null;
  const effectiveOrder = externalOrder || internalSort?.order || null;

  const visibleRows = useMemo(() => {
    let rows = data;
    if (!externalSortBy && internalSort) {
      rows = [...data].sort((a, b) => {
        const aVal = a[internalSort.key];
        const bVal = b[internalSort.key];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const result = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return internalSort.order === 'asc' ? result : -result;
      });
    }
    return rows;
  }, [data, externalSortBy, internalSort]);

  const allSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.includes(row[keyField]));
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    if (!selectable) return;
    const validKeys = new Set(visibleRows.map((row) => row[keyField]));
    const filtered = selected.filter((key) => validKeys.has(key) || !visibleRows.some((r) => r[keyField] === key));
    if (filtered.length !== selected.length) onSelectionChange?.(filtered);
  }, [visibleRows]);

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.(selected.filter((key) => !visibleRows.some((row) => row[keyField] === key)));
    } else {
      const keys = visibleRows.map((row) => row[keyField]);
      onSelectionChange?.([...new Set([...selected, ...keys])]);
    }
  };

  const toggleRow = (key) => {
    onSelectionChange?.(
      selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]
    );
  };

  const handleSort = (key) => {
    if (!onSort) {
      setInternalSort((prev) => {
        if (prev?.key === key) {
          return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
        }
        return { key, order: 'asc' };
      });
      return;
    }
    if (externalSortBy === key) {
      onSort(key, externalOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (!column.sortable) return null;
    const isActive = effectiveSort === column.key;
    if (!isActive) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />;
    return effectiveOrder === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-primary-500" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-primary-500" />
    );
  };

  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800', className)}>
      {(toolbar || (selectable && bulkActions.length > 0)) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <div className="flex flex-1 flex-wrap items-center gap-3">{toolbar}</div>
          {selectable && bulkActions.length > 0 && selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{selected.length} selected</span>
              {bulkActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => action.onClick(selected)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: action.variant === 'danger' ? '#dc2626' : '#8b6f47' }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/80">
            <tr>
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400',
                    column.align === 'right' && 'text-right',
                    column.align === 'center' && 'text-center'
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {column.header}
                      <SortIcon column={column} />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/70">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <SkeletonTable rows={5} cols={columns.length} />
                </td>
              </tr>
            ) : !error && visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <EmptyState
                    icon={emptyIcon || Inbox}
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <EmptyState
                    icon={AlertTriangle}
                    title={errorTitle}
                    description={error?.message || 'There was a problem fetching this data. Please try again.'}
                    action={
                      onRetry ? (
                        <Button variant="secondary" onClick={onRetry}>
                          <RefreshCw className="h-4 w-4" /> Retry
                        </Button>
                      ) : null
                    }
                  />
                </td>
              </tr>
            ) : (
              visibleRows.map((row) => {
                const rowKey = row[keyField];
                const isSelected = selected.includes(rowKey);
                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      'transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40',
                      isSelected && 'bg-primary-50/50 dark:bg-primary-500/5'
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(rowKey)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          aria-label={`Select row ${rowKey}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-3 text-sm text-gray-700 dark:text-gray-300',
                          column.align === 'right' && 'text-right',
                          column.align === 'center' && 'text-center'
                        )}
                      >
                        {column.render ? column.render(row) : row[column.key] ?? '—'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && onPageChange && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <Pagination
            pagination={pagination}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
          />
        </div>
      )}
    </div>
  );
};

export const ActionMenu = ({ items = [], row }) => {
  if (!items.length) return null;
  const primary = items.filter((i) => !i.divider);
  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Row actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      }
    >
      {primary.map((item) => (
        <div key={item.label}>
          <DropdownItem
            icon={item.icon}
            danger={item.danger}
            onClick={() => item.onClick(row)}
          >
            {item.label}
          </DropdownItem>
          {item.dividerAfter && <DropdownDivider />}
        </div>
      ))}
    </Dropdown>
  );
};

export default DataTable;
