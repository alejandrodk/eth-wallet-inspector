import { Controller, Get } from '@nestjs/common';

@Controller('currencies')
export class CurrenciesController {
  constructor() {}

  @Get('rates')
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
