import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/components/shared/services/service';
import { IWallet } from './wallets.types';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService extends ServiceBase<IWallet> {
  constructor(protected repository: WalletsRepository) {
    super(repository);
  }
}
