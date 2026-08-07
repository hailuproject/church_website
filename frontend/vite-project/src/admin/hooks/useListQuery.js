import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import { unwrapList } from '../utils/api';

export const useListQuery = ({ key, fetcher, initialFilters = {}, initialLimit = 10, enabled = true }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const search = useDebounce(searchInput, 400);

  useEffect(() => {
    setPage(1);
  }, [search, JSON.stringify(filters)]);

  const params = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      ...filters,
    }),
    [page, limit, search, filters]
  );

  const query = useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const response = await fetcher(params);
      return unwrapList(response);
    },
    enabled,
    placeholderData: (previous) => previous,
  });

  const setFilter = useCallback((name, value) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (value === undefined || value === null || value === '' || value === 'all') {
        delete next[name];
      } else {
        next[name] = value;
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchInput('');
    setPage(1);
  }, [initialFilters]);

  return {
    ...query,
    items: query.data?.items ?? [],
    pagination: query.data?.pagination ?? null,
    page,
    setPage,
    limit,
    setLimit,
    searchInput,
    setSearchInput,
    filters,
    setFilter,
    resetFilters,
  };
};
