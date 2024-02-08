import { ChainFund } from '@/app/_components';
import { chains } from '@/app/_lib/constants';
import Image from 'next/image';
import React from 'react';

const FundsSection = () => {
  return (
    <div className="flex flex-col gap-4 self-start place-self-end p-4">
      <div className="w-[288px] bg-[#FECE00] rounded-[16px] p-4 grid gap-4">
        {/* profile */}
        <div className="self-center place-self-center w-[100%] text-[#f1f1f1] grid grid-flow-col gap-4 rounded-[8px] bg-[#0BD262]">
          <Image
            src={'/defaultpfp.png'}
            alt="pfp"
            width={72}
            height={72}
            className="self-center place-self-start"
          />
          <h3 className="text-[24px] self-center place-self-start">
            vitalik.ens
          </h3>
          <Image
            className="self-center place-self-start mr-6 hover:border-[1px] border-solid border-[#48637C]"
            src={'/copy.svg'}
            alt="copy"
            height={24}
            width={24}
          />
        </div>
        {/* total FundsSection */}
        <div className="flex flex-col self-center place-self-center font-normal">
          {' '}
          <h2 className="text-left text-[27px]">Total Funds:</h2>
          <h1 className="text-center text-[54px] leading-[60px]">$25.000</h1>
          <h4 className="text-center text-[16px]">
            *assets represented in USDC
          </h4>
        </div>
      </div>
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
