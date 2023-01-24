import { useState } from 'react';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import config from 'config';

const domain = window.location.host;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

const Waitlist = () => {
  const [twitterHandle, setTwitterHandle] = useState('');

  const createSiweMessage = async (address: string, statement: string) => {
    const res = await fetch(`${config.server.SERVER}/nonce`, {
      credentials: 'include',
    });
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  };

  const connectWallet = () => {
    provider.send('eth_requestAccounts', []).catch(() => console.log('user rejected request'));
  };

  const signInWithEthereum = async () => {
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
    console.log(await res.text());
  };

  const signout = async () => {
    const res = await fetch(`${config.server.SERVER}/signout`, {
      credentials: 'include',
    });
    console.log(await res.text());
  };

  const verify = async () => {
    const res = await fetch(`${config.server.SERVER}/verify_tweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ twitterHandle }),
      credentials: 'include',
    });
    console.log(await res.text());
  };

  return (
    <main className="w-screen h-screen m-10">
      <button className="block bg-blue-200 p-2 border border-black rounded mb-4" onClick={connectWallet}>
        Connect Wallet
      </button>
      <button className="block bg-green-200 p-2 border border-black rounded mb-4" onClick={signInWithEthereum}>
        SIWE
      </button>
      <button className="block bg-red-200 p-2 border border-black rounded mb-4" onClick={signout}>
        Signout
      </button>
      <div>
        <input
          className="border mb-2 px-2 py-1"
          type="text"
          placeholder="twitter handle"
          value={twitterHandle}
          onChange={e => setTwitterHandle(e.target.value)}
        />
        <button className="block bg-cyan-200 p-2 border border-black rounded" onClick={verify}>
          Verify User
        </button>
      </div>
    </main>
  );
};

export default Waitlist;
