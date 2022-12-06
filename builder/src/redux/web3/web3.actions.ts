import web3ActionTypes from './web3.types';

export const connectWallet = () => ({
  type: web3ActionTypes.CONNECT_WALLET,
});

export const fetchWalletBalance = () => ({
  type: web3ActionTypes.FETCH_WALLET_BALANCE,
});
