import { BigNumber, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { getERC20Contract, getSigner } from './web3.utils';
import { fetchOwnedListedTemplatesAsync, fetchOwnedReviewTemplatesAsync, fetchOwnedTemplatesAsync } from 'redux/minted/minted.thunk-actions';

export const connectWalletAsync = createAsyncThunk('web3/connectWallet', async (walletAddress: string, { dispatch, rejectWithValue }) => {
  try {
    let address: string = '';
    if (walletAddress) {
      address = walletAddress;
    } else {
      const { ethereum } = window as any;

      if (!ethereum) {
        console.error('MetaMask not installed, please install!');
        return '';
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send('eth_requestAccounts', []); // requesting access to accounts
      const signer = provider.getSigner();
      address = await signer.getAddress();
    }

    await changeNetworkAsync();
    await dispatch(fetchTokenBalanceAsync(address));

    return address;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in connectWalletAsync --> ', error);
    return rejectWithValue(error);
  }
});

export const fetchWalletDetailsAsync = createAsyncThunk('web3/fetchWalletDetails', async (walletAddress: string, { dispatch }) => {
  try {
    await dispatch(connectWalletAsync(walletAddress));
    await dispatch(fetchOwnedTemplatesAsync());
    await dispatch(fetchOwnedReviewTemplatesAsync());
    await dispatch(fetchOwnedListedTemplatesAsync());
    return;
  } catch (error) {
    console.error('Error in fetchWalletDetailsAsync --> ', error);
  }
});

export const changeNetworkAsync = async () => {
  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: config.network.DEFAULT_NETWORK.chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [config.network.DEFAULT_NETWORK],
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in changeNetworkAsync --> ', error);
      }
    }
    // eslint-disable-next-line no-console
    console.error('Error in changeNetworkAsync --> ', switchError);
  }
};

export const fetchTokenBalanceAsync = createAsyncThunk('web3/fetchTokenBalance', async (walletAddress: string) => {
  try {
    const signer = getSigner();
    const erc20Contract = getERC20Contract(config.address.usdt, signer);

    const walletBalance: BigNumber = await erc20Contract.balanceOf(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);

    return parseFloat(balanceInEth);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchTokenBalanceAsync --> ', error);
  }
});
