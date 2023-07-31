import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletsRepository } from './wallets.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './database/wallet.schema';
import { EtherscanModule } from 'src/components/providers/etherscan/etherscan.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    EtherscanModule,
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository],
})
export class WalletsModule {}
