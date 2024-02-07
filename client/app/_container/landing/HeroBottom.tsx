import Image from 'next/image';
import React from 'react';

const HeroBottom = () => {
  return (
    <>
      <div className="flex flex-col gap-[10px] z-10">
        <div className="flex flex-col gap-2 justify-center items-center text-center">
          <h3 className="text-[48px] font-normal">
            Time to chill and stop worrying
          </h3>
          <h1 className="text-[80px] font-bold">SOCIAL RECOVERY</h1>
          <h3 className="text-[48px] font-normal">for your wallet and funds</h3>
        </div>
        <Image
          src={'/mainLanding/shaking-hands.png'}
          alt="hanshake"
          height={500}
          width={666}
          className="self-center"
        />
      </div>
      <Image
        src={'/mainLanding/landing-netbtm.png'}
        alt="bg"
        height={900}
        width={1200}
        className="absolute pt-[1200px] opacity-50 self-center z-0"
      />
    </>
  );
};

export default HeroBottom;
