import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';
import { CurrenciesService } from './currencies.service';
import { ControllerBase } from 'src/components/shared/services/controller';
import { ICurrencyRate } from './currencies.types';

@Controller('currencies')
export class CurrenciesController
  extends ControllerBase<ICurrencyRate>
  implements OnModuleInit
{
  constructor(
    protected currenciesService: CurrenciesService,
    private etherscanService: EtherscanService,
  ) {
    super(currenciesService);
  }

  async onModuleInit() {
    const [ethPrice] = await Promise.all([
      this.etherscanService.getETHPrice(),
      this.currenciesService.drop(),
    ]);
    await Promise.all([
      this.currenciesService.create({
        currency: 'BTC',
        ethPrice: ethPrice.result.ethbtc,
      }),
      this.currenciesService.create({
        currency: 'USD',
        ethPrice: ethPrice.result.ethusd,
      }),
      this.currenciesService.create({
        currency: 'EUR',
        ethPrice: (parseFloat(ethPrice.result.ethusd) * 0.91).toFixed(4),
      }),
    ]);
  }
}
