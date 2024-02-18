"use client"
import { ChainFund, TotalFunds } from '@/app/_components';
import { chains } from '@/app/_lib/constants';
import Image from 'next/image';

const FundsSection = ({ userFunds }) => {

  return (
    <div className="flex flex-col gap-4 self-start place-self-end p-4 max-h-[100%] items-start justify-start">
      <TotalFunds userFunds={userFunds} />
      {/* chain number */}
      <div className="w-[100%] border-[0.9px] border-[#e2c02a] bg-[#FECE00] font-normal rounded-[16px] px-4 py-[12px] grid grid-flow-col gap-4 h-fit">
        <Image
          className="self-center place-self-end"
          src={'/web.svg'}
          alt="web"
          width={24}
          height={24}
        />
        <h3 className=" text-[24px] self-center place-self-start">
          {chains.length} chains supported
        </h3>
      </div>
      {/* chains and their funds */}
      <div className="w-[288px] grid gap-[16px] overflow-scroll max-h-[330px]">
        {chains.map((chain) => (
          <ChainFund chain={chain.name} bgCol={chain.bgProp} key={chain.name} userFunds={userFunds} />
        ))}
      </div>
    </div>
  );
};

export default FundsSection;
