import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
@UseInterceptors(CacheInterceptor)
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Get('balance')
  @CacheTTL(60 * 15 * 1000)
  getWalletsBalance(@Query('address') address: string) {
    return this.walletsService.getBalance(address.split(','));
  }

  @Get(':address/transactions')
  @CacheTTL(60 * 60 * 1000)
  getWalletTransactions(@Param('address') address: string) {
    return this.walletsService.getTransactions(address);
  }
}
