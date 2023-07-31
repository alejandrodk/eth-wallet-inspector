import {
  FilterQuery,
  Model,
  Document,
  PipelineStage,
  UpdateQuery,
} from 'mongoose';

export class RepositoryBase<T> {
  constructor(protected model: Model<T & Document>) {}

  public create(body: Partial<T>): Promise<T> {
    return this.model.create(body);
  }

  public async find(query: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(query).lean();
  }

  public async findOne(query: FilterQuery<T> = {}): Promise<T | null> {
    return this.model.findOne(query).lean();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findOne({ id }).lean();
  }

  public async aggregate(pipeline: PipelineStage[]) {
    return await this.model.aggregate(pipeline);
  }

  public async update(id: string, body: UpdateQuery<T & Document>): Promise<T> {
    return this.model.findOneAndUpdate({ id }, body, { new: true }).lean();
  }

  public async updateMany(
    query: FilterQuery<T>,
    body: UpdateQuery<T & Document>,
  ) {
    return Boolean(await this.model.updateMany(query, body));
  }

  public async delete(id: string): Promise<boolean> {
    return Boolean(await this.model.findOneAndDelete({ id }));
  }

  public async deleteMany(query: FilterQuery<T>): Promise<boolean> {
    return Boolean(await this.model.deleteMany(query));
  }
}
