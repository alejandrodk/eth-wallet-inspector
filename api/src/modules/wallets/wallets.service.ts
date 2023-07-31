import { Injectable } from '@nestjs/common';
import { formatEther } from 'ethers';
import { ServiceBase } from 'src/components/shared/services/service';
import { IWallet } from './wallets.types';
import { WalletsRepository } from './wallets.repository';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';
import { isBefore, subYears } from 'date-fns';

@Injectable()
export class WalletsService extends ServiceBase<IWallet> {
  constructor(
    protected repository: WalletsRepository,
    private etherscanService: EtherscanService,
  ) {
    super(repository);
  }

  override async create(body: Partial<IWallet>): Promise<IWallet> {
    const [firstTx] = await this.getTransactions(body.address);
    if (
      firstTx &&
      isBefore(
        new Date(parseInt(firstTx.timestamp) * 1000),
        subYears(new Date(), 1),
      )
    ) {
      body.old = true;
    }

    return this.repository.create(body);
  }

  async getBalance(address: string[]) {
    const res = await this.etherscanService.getWalletsBalance(address);
    return res.result.map((balance) => ({
      address: balance.account,
      balance: balance.balance,
      balanceInEther: formatEther(balance.balance),
    }));
  }

  async getTransactions(address: string, opts?: { sort?: 'asc' | 'desc' }) {
    const res = await this.etherscanService.getWalletTransactions(
      address,
      opts,
    );
    return res.result.map((tx) => ({
      hash: tx.hash,
      timestamp: tx.timeStamp,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      valueInEther: formatEther(tx.value),
      gas: tx.gas,
      gasPrice: tx.gasPrice,
      gasPriceInEther: formatEther(tx.gasPrice),
    }));
  }
}
