import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';

@Controller('currencies')
@UseInterceptors(CacheInterceptor)
export class CurrenciesController {
  constructor(private etherscanService: EtherscanService) {}

  @Get('rates')
  @CacheTTL(60 * 60 * 24 * 1000)
  getRates() {
    return {
      usdRate: 1,
      euroRate: 0.85,
    };
  }

  @Get('rates/eth')
  @CacheTTL(60 * 60 * 1000)
  async getEthPrice() {
    const ethPrice = await this.etherscanService.getETHPrice();
    return ethPrice.result;
  }
}
