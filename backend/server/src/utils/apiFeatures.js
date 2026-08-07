import { DEFAULT_LIMITS } from '../constants/index.js';
import { buildPaginationMeta } from './pagination.js';

class APIFeatures {
  constructor(query, queryString = {}) {
    this.query = query;
    this.queryString = queryString;
  }

  search(searchableFields = []) {
    const { search } = this.queryString;
    if (search && searchableFields.length) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      this.query = this.query.or(searchableFields.map((field) => ({ [field]: regex })));
    }
    return this;
  }

  filter(whitelist = [], transforms = {}) {
    const filterObj = { ...this.queryString };
    const excluded = ['page', 'limit', 'sortBy', 'order', 'search', 'searchFields'];
    excluded.forEach((key) => delete filterObj[key]);

    const filter = {};
    for (const [key, value] of Object.entries(filterObj)) {
      if (value === '' || value === undefined || value === null) continue;
      if (whitelist.length && !whitelist.includes(key)) continue;

      const transform = transforms[key];
      if (transform) {
        const result = transform(value);
        if (result !== undefined && result !== null) {
          Object.assign(filter, typeof result === 'object' && !Array.isArray(result) ? result : { [key]: result });
        }
      } else if (['page', 'limit'].includes(key)) {
        continue;
      } else if (Array.isArray(value)) {
        filter[key] = { $in: value };
      } else if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{') || value.includes(','))) {
        filter[key] = { $in: value.split(',').map((v) => v.trim()).filter(Boolean) };
      } else {
        filter[key] = value;
      }
    }
    this.query = this.query.where(filter);
    return this;
  }

  sort(defaultSort = { createdAt: -1 }) {
    const { sortBy, order } = this.queryString;
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      this.query = this.query.sort({ [sortBy]: sortOrder });
    } else {
      this.query = this.query.sort(defaultSort);
    }
    return this;
  }

  dateRange(field = 'createdAt') {
    const { from, to } = this.queryString;
    if (from) this.query = this.query.where(field).gte(new Date(from));
    if (to) this.query = this.query.where(field).lte(new Date(to));
    return this;
  }

  paginate() {
    const page = Math.max(parseInt(this.queryString.page, 10) || DEFAULT_LIMITS.page, 1);
    const limit = Math.min(
      Math.max(parseInt(this.queryString.limit, 10) || DEFAULT_LIMITS.limit, 1),
      DEFAULT_LIMITS.maxLimit
    );
    this.pagination = { page, limit, skip: (page - 1) * limit };
    this.query = this.query.skip(this.pagination.skip).limit(this.pagination.limit);
    return this;
  }

  buildMeta(total) {
    return buildPaginationMeta({ total, ...this.pagination });
  }
}

export default APIFeatures;
