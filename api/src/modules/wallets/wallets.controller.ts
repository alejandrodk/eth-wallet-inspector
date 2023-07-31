import { Controller, Get, Query } from '@nestjs/common';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';

@Controller('wallets')
export class WalletsController {
  constructor(private etherscanService: EtherscanService) {}

  @Get('balance')
  getWalletsBalance(@Query('address') address: string) {
    return this.etherscanService.getWalletsBalance(address.split(','));
  }

  @Get('transactions')
  getWalletTransactions(@Query('address') address: string) {
    return this.etherscanService.getWalletTransactions(address);
  }
}
