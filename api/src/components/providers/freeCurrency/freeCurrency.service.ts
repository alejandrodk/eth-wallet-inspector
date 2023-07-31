import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FcApiResponse } from './freeCurrency.types';

@Injectable()
export class FreeCurrencyService {
  constructor(private httpService: HttpService) {}

  /**
   * @see https://freecurrencyapi.com/docs/latest#latest-exchange-rates
   */
  async getCurrencyRates(currency: string) {
    const { data, status } = await firstValueFrom(
      this.httpService.get<FcApiResponse<{ USD: number; EUR: number }>>(
        `/v1/latest`,
        {
          params: {
            base_currency: currency,
            currencies: 'USD,EUR',
          },
        },
      ),
    );

    if (status !== 200) throw new Error();

    return data.data;
  }
}
