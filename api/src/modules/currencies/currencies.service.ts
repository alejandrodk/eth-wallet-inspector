import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/components/shared/services/service';
import { ICurrencyRate } from './currencies.types';
import { CurrenciesRepository } from './currencies.repository';

@Injectable()
export class CurrenciesService extends ServiceBase<ICurrencyRate> {
  constructor(protected repository: CurrenciesRepository) {
    super(repository);
  }
}
