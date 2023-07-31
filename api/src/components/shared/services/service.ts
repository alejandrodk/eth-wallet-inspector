import { Document, FilterQuery, PipelineStage } from 'mongoose';
import { RepositoryBase } from './repository';
import { UpdateQuery } from 'mongoose';

export class ServiceBase<T> {
  constructor(protected repository: RepositoryBase<T>) {}

  public create(body: Partial<T>): Promise<T> {
    return this.repository.create(body);
  }

  public find(query: FilterQuery<T> = {}) {
    return this.repository.find(query);
  }

  public findOne(query: FilterQuery<T> = {}): Promise<T | null> {
    return this.repository.findOne(query);
  }

  public findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  public aggregate(pipeline: PipelineStage[]) {
    return this.repository.aggregate(pipeline);
  }

  public update(id: string, body: UpdateQuery<T & Document>): Promise<T> {
    return this.repository.update(id, body);
  }

  public updateMany(query: FilterQuery<T>, body: UpdateQuery<T & Document>) {
    return this.repository.updateMany(query, body);
  }

  public delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
