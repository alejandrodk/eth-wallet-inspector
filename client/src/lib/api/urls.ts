const api = `${process.env.API_HOST}`;

export const apiUrls = {
  wallets: {
    getWallets: () => `${api}/wallets`,
    createWallet: () => `${api}/wallets`,
    balance: () => `${api}/wallets/balance`,
    transactions: (address: string) => `${api}/wallets/${address}/transactions`,
  },
  currencies: {
    rates: () => `${api}/currencies/rates`,
    ethPrice: () => `${api}/currencies/rates/eth`,
  },
};
