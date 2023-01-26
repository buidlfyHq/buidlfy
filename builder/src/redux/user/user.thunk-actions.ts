import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { updateStep } from './user.reducers';
import { toggleModal } from 'redux/modal/modal.reducers';
import { fetchWalletDetailsAsync } from 'redux/web3/web3.thunk-actions';
import { createSiweMessage } from './user.utils';
import { getSigner } from 'redux/web3/web3.utils';
import { ISession } from './user.interfaces';

export const signInWithEthereumAsync = createAsyncThunk('user/signInWithEthereum', async (_, { dispatch, rejectWithValue }) => {
  try {
    const signer = getSigner();
    const address = await signer.getAddress();
    const message = await createSiweMessage(address, 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);
    const walletName = 'Metamask';

    const res = await fetch(`${config.server.SERVER}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature, address, walletName }),
      credentials: 'include',
    });

    const response = JSON.parse(await res.text());
    const sessionRes: ISession = { ...response.session, data: response.data };
    const stringifySession = JSON.stringify(sessionRes);
    localStorage.setItem('session', stringifySession);

    if (sessionRes.data.whitelisted) {
      window.location.href = '/#/dashboard';
    } else if (sessionRes.data.verified) {
      dispatch(updateStep(3));
    } else {
      dispatch(updateStep(2));
    }

    return sessionRes.data;
  } catch (error) {
    console.error('Error in signInWithEthereumAsync --> ', error);
    return rejectWithValue(error);
  }
});

export const verifyTwitterAsync = createAsyncThunk('user/verifyTitter', async (twitterHandle: string, { dispatch, rejectWithValue }) => {
  try {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (session) {
      // signout if sesssion is expired
      if (new Date(session.cookie?.expires) < new Date()) {
        await dispatch(signoutAsync());
        dispatch(toggleModal(false));
      }

      const res = await fetch(`${config.server.SERVER}/verify-tweet`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.nonce}`,
        },
        body: JSON.stringify({ twitterHandle }),
        credentials: 'include',
      });

      if (res.ok === false) {
        if (res.status === 400) {
          const response = JSON.parse(await res.text());
          console.error(response.message);
          return rejectWithValue(response.message);
        }
        console.error(res.statusText);
      } else {
        const response = JSON.parse(await res.text());
        if (response.data?.verified) {
          const updatedSessionData = { ...session.data, verified: true };
          const updatedSession = { ...session, data: updatedSessionData };
          const stringifyUpdatedSession = JSON.stringify(updatedSession);
          localStorage.setItem('session', stringifyUpdatedSession);
          dispatch(updateStep(3));
          dispatch(toggleModal(false));
          return true;
        }
      }
    } else {
      await dispatch(signoutAsync());
      dispatch(toggleModal(false));
    }
  } catch (error) {
    await dispatch(signoutAsync());
    dispatch(toggleModal(false));
    console.error('Error in verifyTwitterAsync --> ', error);
  }
});

export const subscribeNewsletterAsync = createAsyncThunk('user/subscribeNewsletter', async (email: string, { dispatch }) => {
  try {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (session) {
      // signout if sesssion is expired
      if (new Date(session.cookie?.expires) < new Date()) {
        await dispatch(signoutAsync());
        dispatch(toggleModal(false));
      }

      const res = await fetch(`${config.server.SERVER}/subscribe-newsletter`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.nonce}`,
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      if (res.ok === false) {
        console.error(res.statusText);
      } else {
        const response = JSON.parse(await res.text());
        const email: string = response.data?.email;
        if (email) {
          const updatedSessionData = { ...session.data, email };
          const updatedSession = { ...session, data: updatedSessionData };
          const stringifyUpdatedSession = JSON.stringify(updatedSession);
          localStorage.setItem('session', stringifyUpdatedSession);
          return email;
        }
      }
    } else {
      await dispatch(signoutAsync());
    }
  } catch (error) {
    await dispatch(signoutAsync());
    console.error('Error in subscribeNewsletterAsync --> ', error);
  }
});

export const isWhitelistedAsync = createAsyncThunk('user/isWhitelisted', async (_, { dispatch }) => {
  try {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (session) {
      // signout if sesssion is expired
      if (new Date(session.cookie?.expires) < new Date()) {
        await dispatch(signoutAsync());
      }

      dispatch(fetchWalletDetailsAsync(session.data?.address));

      // check if user is authorised
      fetch(`${config.server.SERVER}/user-status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.nonce}`,
        },
        credentials: 'include',
      })
        .then(res => res.text())
        .then(res => {
          if (JSON.parse(res).whitelisted) {
            if (!session.data.whitelisted) {
              const updatedSessionData = { ...session.data, whitelisted: true };
              const updatedSession = { ...session, data: updatedSessionData };
              const stringifyUpdatedSession = JSON.stringify(updatedSession);
              localStorage.setItem('session', stringifyUpdatedSession);
            }
            window.location.href = '/#/dashboard';
          } else if (JSON.parse(res).verified) {
            if (!session.data.verified) {
              const updatedSessionData = { ...session.data, whitelisted: false, verified: true };
              const updatedSession = { ...session, data: updatedSessionData };
              const stringifyUpdatedSession = JSON.stringify(updatedSession);
              localStorage.setItem('session', stringifyUpdatedSession);
            }
            dispatch(updateStep(3));
          } else {
            dispatch(updateStep(2));
          }
        })
        .catch(async () => {
          await dispatch(signoutAsync());
        });
    } else {
      await dispatch(signoutAsync());
    }
  } catch (error) {
    await dispatch(signoutAsync());
    console.error('Error in isWhitelistedAsync --> ', error);
  }
});

export const signoutAsync = createAsyncThunk('user/signout', async (_, { dispatch }) => {
  localStorage.removeItem('session');
  await fetch(`${config.server.SERVER}/signout`, {
    credentials: 'include',
  });
  dispatch(updateStep(1));
  window.location.href = '/#/';
});
