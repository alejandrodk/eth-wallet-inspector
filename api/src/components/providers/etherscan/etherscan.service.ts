import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnvObjects, IEnvObjects } from 'src/components/config/env.config';
import {
  EsAccountBalance,
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

  private callApi(
    module: EsModules,
    action: EsActions,
    params?: Record<string, string>,
  ) {
    return firstValueFrom(
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
  }

  async getWalletsBalance(
    wallets: string[],
  ): Promise<EsApiResponse<EsAccountBalance[]>> {
    const { data } = await this.callApi('account', 'balancemulti', {
      address: wallets.join(','),
    });
    return data;
  }

  async getWalletTransactions(address: string) {
    const { data } = await this.callApi('account', 'txlist', {
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      sort: 'desc',
    });

    return data;
  }
}
