import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';
import { CurrenciesService } from './currencies.service';
import { ControllerBase } from 'src/components/shared/services/controller';
import { ICurrencyRate } from './currencies.types';
import { FreeCurrencyService } from 'src/components/providers/freeCurrency/freeCurrency.service';

@Controller('currencies')
export class CurrenciesController
  extends ControllerBase<ICurrencyRate>
  implements OnModuleInit
{
  logger: Logger = new Logger(CurrenciesController.name);

  constructor(
    protected currenciesService: CurrenciesService,
    private etherscanService: EtherscanService,
    private freeCurrencyService: FreeCurrencyService,
  ) {
    super(currenciesService);
  }

  async onModuleInit() {
    try {
      const [ethPrice] = await Promise.all([
        this.etherscanService.getETHPrice(),
        this.currenciesService.drop(),
      ]);
      const { EUR } = await this.freeCurrencyService.getCurrencyRates('USD');
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
          ethPrice: (parseFloat(ethPrice.result.ethusd) * EUR).toFixed(4),
        }),
      ]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
