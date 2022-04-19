import { useEffect } from "react";
import type { NextPage } from "next";
import Router from "next/router";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

declare let window: any;
const BACKEND_ADDR = "http://localhost:8000/api"; // backend url

const SignIn: NextPage<{ setInfo: any }> = ({ setInfo }) => {
  let domain: any, origin: any, provider: any, signer: any; // for sign-in message
  const loadValues = () => {
    domain = window.location.host;
    origin = window.location.origin;

    // Check if Metamask exists
    if (window.ethereum === undefined) {
      console.error("Please add Metamask to your browser!");
    } else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      connectWallet();
    }
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
      .catch(() => console.error("User rejected the request!"));
  };

  // Create sign-in message
  const createSiweMessage = async (address: any, statement: any) => {
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

    if (res.ok) {
      Router.push("/dashboard");
    }
  };

  // Tests if user is authenticated
  // const getInformation = async () => {
  //   const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
  //     credentials: "include",
  //   });
  //   const response = await res.text();
  //   console.log(response);
  //   setInfo(response);
  // };

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="w-1/2">
        <h2 className="text-4xl text-cyan-900 font-bold">
          Welcome to the future of building dApps
        </h2>
        <div className="my-10">
          <button
            className="w-full p-3 bg-cyan-900 text-white rounded"
            onClick={signInWithEthereum}
          >
            Sign-in with Ethereum
          </button>
        </div>
        <h5 className="text-gray-500">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </h5>
      </section>
    </main>
  );
};

export default SignIn;
