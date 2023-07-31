import { Module } from '@nestjs/common';
import { EtherscanModule } from 'src/components/providers/etherscan/etherscan.module';
import { CurrenciesController } from './currencies.controllers';

@Module({
  imports: [EtherscanModule],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}
