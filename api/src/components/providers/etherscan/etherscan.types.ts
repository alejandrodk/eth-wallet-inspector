export type EsModules = 'account';
export type EsActions = 'balancemulti' | 'txlist';

export interface EsApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

export interface EsAccountBalance {
  account: string;
  balance: string;
}
