import { useEffect } from "react";
import type { NextPage } from "next";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

declare let window: any;
const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const Navbar: NextPage<{ setInfo: any }> = ({ setInfo }) => {
  let domain: any, origin: any, provider: any, signer: any; // for sign-in message
  const loadValues = () => {
    domain = window.location.host;
    origin = window.location.origin;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  };

  useEffect(() => {
    if (window != undefined) {
      loadValues();
    }
  }, []); // eslint-disable-line

  // Connect Metamask wallet
  const connectWallet = () => {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  };

  // Create sign-in message
  const createSiweMessage = async (address, statement) => {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
      credentials: "include",
    });
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: "1",
      nonce: await res.text(),
    });

    return message.prepareMessage();
  };

  // Authenticate and sign-in
  const signInWithEthereum = async () => {
    const message = await createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    const address = await signer.getAddress();
    const signature = await signer.signMessage(message);

    // Verify user authentication
    const res = await fetch(`${BACKEND_ADDR}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, message, signature }),
      credentials: "include",
    });
    console.log(await res.text());
  };

  // Tests if user is authenticated
  const getInformation = async () => {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
      credentials: "include",
    });
    const response = await res.text();
    console.log(response);
    setInfo(response);
  };

  return (
    <section className="w-full p-4 bg-stone-400/20 absolute flex justify-between items-center shadow-md">
      {/* LOGO */}
      <h2 className="text-xl font-bold">Deflow</h2>
      {/* Authentication Buttons */}
      <aside className="flex justify-around">
        <div>
          <button
            className="m-2 p-2 bg-stone-500 text-white rounded"
            onClick={connectWallet}
          >
            Connect wallet
          </button>
        </div>
        <div>
          <button
            className="m-2 p-2 bg-stone-500 text-white rounded"
            onClick={signInWithEthereum}
          >
            Sign-in with Ethereum
          </button>
        </div>
        <div>
          <button
            className="m-2 p-2 bg-stone-500 text-white rounded"
            onClick={getInformation}
          >
            Get session information
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Navbar;
