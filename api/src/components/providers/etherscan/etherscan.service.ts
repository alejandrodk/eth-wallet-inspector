import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnvObjects, IEnvObjects } from 'src/components/config/env.config';
import {
  EsAccountBalance,
  EsAccountTx,
  EsActions,
  EsApiResponse,
  EsModules,
} from './etherscan.types';

@Injectable()
export class EtherscanService implements OnModuleInit {
  config: IEnvObjects['EtherscanConfig'];

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  onModuleInit() {
    this.config = this.configService.get<IEnvObjects['EtherscanConfig']>(
      EnvObjects.ETHERSCAN_CONFIG,
    );
  }

  private async callApi<T = any>(
    module: EsModules,
    action: EsActions,
    params?: Record<string, string>,
  ) {
    const { data }: { data: EsApiResponse<T> } = await firstValueFrom(
      this.httpService.get(``, {
        params: {
          module,
          action,
          tag: 'latest',
          apikey: this.config.apiKey,
          ...(params ?? {}),
        },
      }),
    );

    if (data.status === '0') throw new Error(data.result as any);

    return data;
  }

  getETHPrice() {
    return this.callApi<{
      ethbtc: string;
      ethbtc_timestamp: string;
      ethusd: string;
      ethusd_timestamp: string;
    }>('stats', 'ethprice');
  }

  getWalletsBalance(wallets: string[]) {
    return this.callApi<EsAccountBalance[]>('account', 'balancemulti', {
      address: wallets.join(','),
    });
  }

  getWalletTransactions(address: string) {
    return this.callApi<EsAccountTx[]>('account', 'txlist', {
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      limit: '100',
      sort: 'asc',
    });
  }
}
