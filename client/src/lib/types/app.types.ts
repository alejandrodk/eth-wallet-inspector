export interface IWallet {
  id: string;
  address: string;
  name?: string;
  favorite?: boolean;
  old?: boolean;
}

export interface ICurrencyRate {
  id: string;
  currency: string;
  ethPrice: string;
}

export interface IWalletBalance {
  address: string;
  balance: string;
  balanceInEther: string;
}

export interface IWalletTx {
  hash: string;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  valueInEther: string;
  gas: string;
  gasPrice: string;
  gasPriceInEther: string;
}
