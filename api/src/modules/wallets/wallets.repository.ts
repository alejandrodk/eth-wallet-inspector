import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RepositoryBase } from 'src/components/shared/services/repository';
import { IWallet } from './wallets.types';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './database/wallet.schema';

@Injectable()
export class WalletsRepository extends RepositoryBase<IWallet> {
  constructor(
    @InjectModel(Wallet.name) protected model: Model<WalletDocument>,
  ) {
    super(model);
  }
}
