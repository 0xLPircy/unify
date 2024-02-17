'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const DeductionTotal = ({ deductions }: any) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Calculate the sum of amounts whenever 'deductions' change
    const newTotalAmount = deductions.reduce(
      (acc: number, { amount }: any) => acc + amount,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [deductions]);
  return (
    <div
      className="font-normal bg-[#f1f1f1] border-[#1c1b1f1b] border-solid border-[1px] rounded-[8px] 
    w-[100%] h-[100%] flex flex-col p-2 items-center justify-center"
    >
      <div className="grid grid-flow-col gap-[10px] pb-[0px] font-semibold">
        <Image
          src={'/logo.svg'}
          alt="logo"
          width={30}
          height={30}
          className="self-center place-self-center"
        />
        <h1 className="text-[24px] self-center place-self-center">
          Unify Total
        </h1>
      </div>
      <h2 className="text-[27px]">
        ${totalAmount}
        usdc
      </h2>
    </div>
  );
};

export default DeductionTotal;
