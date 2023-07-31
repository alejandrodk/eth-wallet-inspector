import { Injectable } from '@nestjs/common';
import { formatEther } from 'ethers';
import { ServiceBase } from 'src/components/shared/services/service';
import { IWallet } from './wallets.types';
import { WalletsRepository } from './wallets.repository';
import { EtherscanService } from 'src/components/providers/etherscan/etherscan.service';

@Injectable()
export class WalletsService extends ServiceBase<IWallet> {
  constructor(
    protected repository: WalletsRepository,
    private etherscanService: EtherscanService,
  ) {
    super(repository);
  }

  async getBalance(address: string[]) {
    const res = await this.etherscanService.getWalletsBalance(address);
    const [result] = res.result;
    return {
      address: result.account,
      balance: result.balance,
      balanceInEther: formatEther(result.balance),
    };
  }

  async getTransactions(address: string) {
    const res = await this.etherscanService.getWalletTransactions(address);
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
