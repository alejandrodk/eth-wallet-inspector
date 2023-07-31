import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ControllerBase } from 'src/components/shared/services/controller';
import { IWallet } from './wallets.types';

@Controller('wallets')
@UseInterceptors(CacheInterceptor)
export class WalletsController extends ControllerBase<IWallet> {
  constructor(private walletsService: WalletsService) {
    super(walletsService);
  }

  @Get('balance')
  @CacheTTL(60 * 15 * 1000)
  getWalletsBalance(@Query('address') address: string) {
    if (!address) return [];
    return this.walletsService.getBalance(address.split(','));
  }

  @Get(':address/transactions')
  @CacheTTL(60 * 60 * 1000)
  getWalletTransactions(@Param('address') address: string) {
    return this.walletsService.getTransactions(address, { sort: 'desc' });
  }
}
