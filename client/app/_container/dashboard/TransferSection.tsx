import { ChooseChain } from '@/app/_components';
import { chains } from '@/app/_lib/constants';
import Image from 'next/image';
import React from 'react';

const TransferSection = () => {
  return (
    <div className="w-[694px] bg-[#00000000] rounded-[24px] p-6 flex flex-col gap-4">
      <h1 className="text-center text-[42px] w-[100%] font-bold">
        Transfer funds
      </h1>
      {/* recipient */}
      <div className="w-[100%] grid gap-2">
        <h3 className="text-start text-[21px]">Type Recipient</h3>
        <input
          type="text"
          placeholder="Type address or ens or lens"
          className="p-[10px] bg-[#f1f1f1] text-start text-[21px] rounded-[8px] border-[1px] border-solid border-[#BDCFD0]"
        />
      </div>
      {/* network */}
      <div className="grid gap-2">
        <h3 className="text-start text-[21px]">Select Network</h3>
        <div className="grid grid-flow-col overflow-x-scroll gap-[8px]">
          {chains.map((chain) => (
            <ChooseChain chain={chain.name} key={chain.name} />
          ))}
        </div>
      </div>
      {/* amount */}
      <div className="grid gap-2 w-[100%]">
        <h3 className="text-start text-[21px]">Choose Amount</h3>
        <div className="grid grid-flow-col gap-[8px]">
          <div className="flex  bg-[#f1f1f1] text-start text-[21px] rounded-[8px] w-[470px] border-[1px] border-solid border-[#BDCFD0] ">
            <input
              type="text"
              placeholder="Type amount"
              className="w-[100%] h-[100%] p-[10px] rounded-[12xp]"
            />
            <select name="dropdown" className="">
              <option value={'usdc'}>USDC</option>
              <option value={'fxd'}>FXD</option>
            </select>
          </div>
          {/* btn */}
          <div className="px-[20px] py-[10px] grid grid-flow-col rounded-[8px] gap-2 bg-[#48637C] hover:cursor-pointer hover:border-b-[4px] hover:py-[8px]">
            <h4 className="text-[21px] text-[#ffffff] font-bold place-self-center self-center">
              Preview
            </h4>
          </div>
        </div>
      </div>
      <Image
        src={'/transfer-chest.png'}
        alt="transaction chest"
        width={374}
        height={374}
      />
    </div>
  );
};

export default TransferSection;
