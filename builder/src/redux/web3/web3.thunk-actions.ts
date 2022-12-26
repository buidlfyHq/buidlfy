import { BigNumber, ethers } from 'ethers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { getERC20Contract, getSigner } from './web3.utils';

export const connectWalletAsync = createAsyncThunk('web3/connectWallet', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.error('MetaMask not installed, please install!');
      return '';
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send('eth_requestAccounts', []); // requesting access to accounts
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // yield put(fetchOwnedTemplates());
    // yield put(fetchOwnedReviewTemplates());
    // yield put(fetchOwnedListedTemplates());

    await changeNetworkAsync();
    await dispatch(fetchTokenBalanceAsync(address));

    return address;
  } catch (error) {
    // eslint-disable-next-line no-console
    // yield put(
    //   addNotification({
    //     message: walletRes.errorMessage,
    //     timestamp: new Date(),
    //     type: NotificationType.Error,
    //   }),
    // );
    console.error('Error in connectWalletAsync --> ', error);
    return rejectWithValue(error);
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
    // yield put(
    //   addNotification({
    //     message: networkRes.errorMessage,
    //     timestamp: new Date(),
    //     type: NotificationType.Error,
    //   }),
    // );
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
    return 0;
  }
});
