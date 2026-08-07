import { DEFAULT_LIMITS } from '../constants/index.js';

export const parsePagination = (query = {}) => {
  const page = Math.max(parseInt(query.page, 10) || DEFAULT_LIMITS.page, 1);
  const limit = Math.min(
    Math.max(parseInt(query.limit, 10) || DEFAULT_LIMITS.limit, 1),
    DEFAULT_LIMITS.maxLimit
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const buildPaginationMeta = ({ total, page, limit }) => {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export default { parsePagination, buildPaginationMeta };
