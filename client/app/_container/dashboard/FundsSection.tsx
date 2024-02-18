"use client"
import { ChainFund, TotalFunds } from '@/app/_components';
import { chains } from '@/app/_lib/constants';
import { getTokenBalances } from '@/app/api';
import usePolling from '@/app/hooks/usePolling';
import { useEthereum } from '@particle-network/auth-core-modal';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

const FundsSection = () => {
  const [userFunds, setUserFunds] = useState([])
  const { address } = useEthereum()

  const fetchFunds = useCallback(async () => {
    const res = await getTokenBalances(address);
    setUserFunds(res)
    return res
  }, [address])

  usePolling(fetchFunds)


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
          {chains.length} chains in total
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
