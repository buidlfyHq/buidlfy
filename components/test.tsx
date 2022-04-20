import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ethers } from "ethers";

declare let window: any;
const CONTRACT_ADDRESS: string = "0x7E2Df0465113d5638CD515F00b7bAa4383FA1a4F";

const Test: NextPage = () => {
  const [abi, setAbi] = useState<string>(""); // for storing abi

  let provider: any, signer: any; // for contract creation
  const loadValues = () => {
    // Check if Metamask exists
    if (window.ethereum === undefined) {
      console.error("Please add Metamask to your browser!");
    } else {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }
  };

  useEffect(() => {
    // Waiting for window property to load
    if (window != undefined) {
      loadValues();
    }
  }, []); // eslint-disable-line

  // Create contract on button click
  const createContract = async (a) => {
    setAbi(a);
    // Create new contract
    const contractAbi = JSON.parse(a);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

    // Test contract
    const adder = await contract.myAddress();
    console.log(adder);
  };

  return (
    <>
      <h3 className="mt-4 text-lg font-bold">ABI</h3>
      <input
        className="px-2 bg-white/90 rounded"
        placeholder="Paste your ABI here..."
        value={abi}
        onChange={(e) => setAbi(e.target.value)}
      />
      <button
        className="px-4 bg-black rounded text-white"
        type="submit"
        onClick={() => createContract(abi)}
      >
        Submit
      </button>
    </>
  );
};

export default Test;

// Test Contract Address
// 0x7E2Df0465113d5638CD515F00b7bAa4383FA1a4F

// Test ABI
// [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"allContributers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEnds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"icoEnds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"icoStarts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"myBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
