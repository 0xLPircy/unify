'use client';
import { useEthereum } from '@particle-network/auth-core-modal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ClientOnly from '../ClientOnly';

const TotalFunds = ({ userFunds }: any) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { address } = useEthereum()

  useEffect(() => {
    // Calculate the sum of amounts whenever 'deductions' change
    const newTotalAmount = userFunds.reduce(
      (acc: number, { amount }: any) => acc + amount,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [userFunds]);
  return (
    <div className="w-[288px] bg-[#FECE00] rounded-[16px] p-4 grid gap-4 border-[0.9px] border-[#e2c02a]">
      {/* profile */}
      <div className="self-center place-self-center w-[100%] text-[#f1f1f1] grid grid-flow-col gap-4 rounded-[8px] bg-[#0BD262]">
        <Image
          src={'/defaultpfp.png'}
          alt="pfp"
          width={72}
          height={72}
          className="self-center place-self-start p-2"
        />
        {address && (
          <ClientOnly>
            <div className="text-[24px] self-center place-self-start">{address?.slice(0, 5)}...{address?.slice(38, 42)}</div>
          </ClientOnly>)}
        {/* <Image
          className="self-center place-self-start mr-6 hover:border-[1px] border-solid border-[#48637C]"
          src={'/copy.svg'}
          alt="copy"
          height={24}
          width={24}
        /> */}
      </div>
      {/* total FundsSection */}
      <div className="flex flex-col self-center place-self-center font-normal">
        {' '}
        <h2 className="text-left text-[27px]">Total Funds:</h2>
        <h1 className="text-center text-[54px] leading-[60px]">
          ${totalAmount}
        </h1>
      </div>
    </div>
  );
};

export default TotalFunds;
