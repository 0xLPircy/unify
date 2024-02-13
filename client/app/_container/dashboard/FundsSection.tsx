import { ChainFund, TotalFunds } from '@/app/_components';
import { chains, userFunds } from '@/app/_lib/constants';
import Image from 'next/image';
import React from 'react';

const FundsSection = () => {
  return (
    <div className="flex flex-col gap-4 self-start place-self-end p-4">
      <TotalFunds userFunds={userFunds} />
      {/* chain number */}
      <div className="w-[100%] bg-[#FECE00] font-normal rounded-[16px] px-4 py-[12px] grid grid-flow-col gap-4 h-fit">
        <Image
          className="self-center place-self-end"
          src={'/web.svg'}
          alt="web"
          width={24}
          height={24}
        />
        <h3 className=" text-[24px] self-center place-self-start">
          13 chains in total
        </h3>
      </div>
      {/* chains and their funds */}
      <div className="w-[288px] grid gap-[16px] overflow-scroll max-h-[413px]">
        {chains.map((chain) => (
          <ChainFund chain={chain.name} bgCol={chain.bgProp} key={chain.name} />
        ))}
      </div>
    </div>
  );
};

export default FundsSection;
