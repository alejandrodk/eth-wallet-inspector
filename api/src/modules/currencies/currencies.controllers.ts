import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('currencies')
@UseInterceptors(CacheInterceptor)
export class CurrenciesController {
  constructor() {}

  @Get('rates')
  @CacheTTL(60 * 60 * 24 * 1000)
  getRates() {
    return [
      {
        currency: 'USD',
        rate: 1,
      },
      {
        currency: 'EUR',
        rate: 0.85,
      },
    ];
  }
}
