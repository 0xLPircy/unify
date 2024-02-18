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

const WalletInfoPage = () => {
  return (
    <div className="px-20 py-16 bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)]">
      <Image
        src={'/mainLanding/landing-nettop.png'}
        width={1200}
        height={900}
        alt="bg"
        className="fixed top-[100px] opacity-30 self-center z-[0]"
      />
      <div className="z-30">
        <h1 className="text-start text-[36px] w-[100%] font-bold">
          Token Transfers
        </h1>
        <div className="test-class font-semibold mb-12">
          <TokenTransfersListView
            chain_name="eth-sepolia" //chain name
            address="0x27923CAB90564c5C195BbFb98f7DA8d3D4F751Fb" //sample address
          />
        </div>
      </div>
      <h1 className="text-start text-[36px] w-[100%] font-bold">
        Token Balances
      </h1>
      <div className=" rounded-md font-semibold text-[#000000] p-6 test-class">
        <TokenBalancesListView
          chain_names={['eth-sepolia', 'matic-mumbai']} // list of chains
          address="0x27923CAB90564c5C195BbFb98f7DA8d3D4F751Fb" //sample address
        />
      </div>
      <h1 className="text-start text-[36px] w-[100%] font-bold">NFTs</h1>
      <div className=" rounded-md font-semibold text-[#000000] p-6 test-class">
        <NFTWalletTokenListView
          address="0xE98ed5C31094ff67b5668B2Ee6164D37B0Cdf40e" //sample address
          chain_names={['eth-mainnet', 'eth-sepolia', 'matic-mumbai']} //sample list of chains
        />
      </div>
    </div>
  );
};

export default WalletInfoPage;
