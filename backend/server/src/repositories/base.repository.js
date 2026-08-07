import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/AppError.js';

class BaseRepository {
  constructor(model, { searchableFields = [], filterWhitelist = [], defaultSort = { createdAt: -1 } } = {}) {
    this.model = model;
    this.searchableFields = searchableFields;
    this.filterWhitelist = filterWhitelist;
    this.defaultSort = defaultSort;
  }

  async create(data) {
    return this.model.create(data);
  }

  async insertMany(data) {
    return this.model.insertMany(data);
  }

  async findById(id, options = {}) {
    const doc = await this.model.findById(id).select(options.select).populate(options.populate);
    if (!doc) throw new AppError(`${this.model.modelName} not found`, 404);
    return doc;
  }

  async findOne(filter, options = {}) {
    return this.model.findOne(filter).select(options.select).populate(options.populate);
  }

  async findByIdOrNull(id, options = {}) {
    return this.model.findById(id).select(options.select).populate(options.populate);
  }

  async find(filter = {}, options = {}) {
    return this.model.find(filter).select(options.select).populate(options.populate).lean(options.lean || false);
  }

  async findByIdAndUpdate(id, data, options = {}) {
    const doc = await this.model.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
      ...options,
    });
    if (!doc) throw new AppError(`${this.model.modelName} not found`, 404);
    return doc;
  }

  async updateOne(filter, data, options = {}) {
    return this.model.updateOne(filter, data, { runValidators: true, ...options });
  }

  async deleteById(id) {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) throw new AppError(`${this.model.modelName} not found`, 404);
    return doc;
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async exists(filter = {}) {
    return this.model.exists(filter);
  }

  async paginate(queryString = {}, extraFilter = {}) {
    const features = new APIFeatures(this.model.find(extraFilter), queryString)
      .search(this.searchableFields)
      .filter(this.filterWhitelist)
      .sort(this.defaultSort)
      .dateRange();

    const total = await this.model.countDocuments(features.query._conditions);
    features.paginate();
    const data = await features.query;

    return {
      data,
      pagination: features.buildMeta(total),
    };
  }

  async aggregate(pipeline) {
    return this.model.aggregate(pipeline);
  }
}

export default BaseRepository;
