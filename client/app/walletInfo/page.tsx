'use client';
import {
  NFTWalletTokenListView,
  TokenBalancesListView,
  TokenTransfersListView
} from '@covalenthq/goldrush-kit';
import React from 'react';
import '@covalenthq/goldrush-kit/styles.css';
import { GoldKitProvider } from '../_components';
import Image from 'next/image';
import { useEthereum } from '@particle-network/auth-core-modal';
import { useAccount } from '@particle-network/connectkit';

const WalletInfoPage = () => {
  const account = useAccount()
  return (
    <div className="px-20 py-16 bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)]">
      <div className="z-30">
        <h1 className="text-start text-[36px] w-[100%] font-bold">
          Token Transfers
        </h1>
        <div className="test-class font-semibold mb-12">
          <TokenTransfersListView
            chain_name={"avalanche-testnet"} //chain name
            address={account} //sample address
            contract_address="0x55104Ed9ab9f3b58dB55D60429091cA203302FaF"
          />
        </div>
      </div>
      <h1 className="text-start text-[36px] w-[100%] font-bold">
        Token Balances
      </h1>
      <div className=" rounded-md font-semibold text-[#000000] p-6 test-class">
        <TokenBalancesListView
          chain_names={['eth-sepolia', 'matic-mumbai', 'avalanche-testnet']} // list of chains
          address={account} //sample address
        />
      </div>
      <h1 className="text-start text-[36px] w-[100%] font-bold">NFTs</h1>
      <div className=" rounded-md font-semibold text-[#000000] p-6 test-class">
        <NFTWalletTokenListView
          address={account} //sample address
          chain_names={['eth-mainnet', 'eth-sepolia', 'matic-mumbai', 'avalanche-testnet']} //sample list of chains
        />
      </div>
      <Image
        src={'/mainLanding/landing-nettop.png'}
        width={1200}
        height={900}
        alt="bg"
        className="fixed top-[100px] opacity-20 self-center z-[0]"
      />
    </div>
  );
};

export default WalletInfoPage;
