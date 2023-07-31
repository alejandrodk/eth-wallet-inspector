export type EsModules = 'account' | 'stats';
export type EsActions = 'balancemulti' | 'txlist' | 'ethprice';

export interface EsApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

export interface EsAccountBalance {
  account: string;
  balance: string;
}

export interface EsAccountTx {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: '0' | '1';
  txreceipt_status: '0' | '1';
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}
