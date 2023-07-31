import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RepositoryBase } from 'src/components/shared/services/repository';
import { InjectModel } from '@nestjs/mongoose';
import { Currency, CurrencyDocument } from './database/currency.schema';

@Injectable()
export class CurrenciesRepository extends RepositoryBase<Currency> {
  constructor(
    @InjectModel(Currency.name) protected model: Model<CurrencyDocument>,
  ) {
    super(model);
  }
}
