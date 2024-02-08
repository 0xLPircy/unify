'use client';
import { curEns, userFunds } from '@/app/_lib/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const TotalFunds = () => {
  const [totalFund, setTotalFund] = useState(0);
  //   useEffect(() => {
  //     userFunds.map((chain) => {
  //       console.log(totalFund);
  //       setTotalFund(chain.amount + totalFund);
  //       console.log(totalFund);
  //     });
  //   }, [userFunds]);
  return (
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
        <h3 className="text-[24px] self-center place-self-start">{curEns}</h3>
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
        <h1 className="text-center text-[54px] leading-[60px]">${totalFund}</h1>
        <h4 className="text-center text-[16px]">*assets represented in USDC</h4>
      </div>
    </div>
  );
};

export default TotalFunds;
