import { userFunds } from '@/app/_lib/constants';
import Image from 'next/image';
import React from 'react';

const ChainFund = ({ chain, bgCol }: any) => {
  return (
    <div
      className={`text-[#1C1B1F] grid grid-flow-col pt-2 pr-4 rounded-[16px] mr-3
    ${bgCol}`}
    >
      <Image
        src={`/chainFund/${chain}.png`}
        alt="eth chain"
        width={90}
        height={90}
        className="rounded-l-[24px]"
      />
      <div className="grid">
        <h4 className="text-[16px] capitalize font-semibold">{chain}</h4>
        <h2 className="text-[32px]">
          $
          {userFunds.map((chainName, index) => {
            if (chainName.chain == chain) {
              return <span key={index}>{chainName.amount.toString(10)}</span>;
            }
          })}
          <span className="text-[21px]"> usdc</span>
        </h2>
      </div>
    </div>
  );
};

export default ChainFund;

const chains = ['base', 'celo', 'eth', 'optimism'];
