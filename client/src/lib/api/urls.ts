const api = `${process.env.API_HOST}`;

export const apiUrls = {
  wallets: {
    getWallets: () => `${api}/wallets`,
    createWallet: () => `${api}/wallets`,
    updateWallet: (id: string) => `${api}/wallets/${id}`,
    balance: () => `${api}/wallets/balance`,
    transactions: (address: string) => `${api}/wallets/${address}/transactions`,
  },
  currencies: {
    rates: () => `${api}/currencies`,
    updateRate: (id: string) => `${api}/currencies/${id}`,
  },
};
