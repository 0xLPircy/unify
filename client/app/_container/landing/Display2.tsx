import Image from 'next/image';
import React from 'react';

const Display2 = () => {
  return (
    <div className="flex flex-row gap-[24px] py-[48px] font-semibold px-6 z-10">
      <div className="flex pr-8 gap-6 rounded-[32px] bg-[radial-gradient(1508.38%_141.42%_at_0%_100%,_#D2FFA6_0%,_rgba(210,_255,_166,_0.20)_100%)]">
        <Image
          src={'/mainLanding/wallet.png'}
          alt="wallet"
          width={280}
          height={140}
        />
        <div className="py-12 self-center">
          <h5 className="text-[24px]">Experience the power of</h5>
          <h3 className="text-[39px] leading-10">Smart wallets</h3>
        </div>
      </div>
      <div className="flex pr-8 gap-4 rounded-[32px] bg-[radial-gradient(1508.38%_141.42%_at_0%_100%,_#D8A6FF_0%,_rgba(216,_166,_255,_0.20)_100%)]">
        <Image
          src={'/mainLanding/landing-ethusd.png'}
          alt="wallet"
          width={280}
          height={140}
        />
        <div className="py-12 self-center">
          <h5 className="text-[24px]">Start transferring</h5>
          <h3 className="text-[39px] leading-10">Between chains</h3>
        </div>
      </div>
    </div>
  );
};

export default Display2;
