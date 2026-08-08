import APIFeatures from './apiFeatures.js';

export const paginateModel = async (Model, queryString = {}, options = {}) => {
  const {
    searchableFields = [],
    filterWhitelist = [],
    defaultSort = { createdAt: -1 },
    filter = {},
  } = options;

  const features = new APIFeatures(Model.find(filter), queryString)
    .search(searchableFields)
    .filter(filterWhitelist)
    .sort(defaultSort)
    .dateRange();

  const total = await Model.countDocuments(features.query._conditions);
  features.paginate();
  const data = await features.query;

  return {
    data,
    pagination: features.buildMeta(total),
  };
};

export default { paginateModel };
