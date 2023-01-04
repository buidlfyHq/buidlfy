import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const domain = window.location.host;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();
const BACKEND_ADDR = 'http://localhost:8000/users';

const Signin = () => {
  const createSiweMessage = async (address, statement) => {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
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
    const message = await createSiweMessage(await signer.getAddress(), 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include',
    });
    console.log(await res.text());
  };

  const getInformation = async () => {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
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
      <button className="block bg-yellow-200 p-2 border border-black rounded" onClick={getInformation}>
        Info
      </button>
    </main>
  );
};

export default Signin;
