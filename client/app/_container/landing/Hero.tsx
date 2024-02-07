import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <main className="flex flex-row justify-between pt-[40px] z-10 min-h-[75vh]">
      <Image
        src={'/mainLanding/landing-boxleft.png'}
        alt="coin input"
        width={350}
        height={469}
        className="absolute left-0"
      />
      <div className="flex flex-col justify-start items-center z-20 pt-12 gap-6">
        <h3 className="text-[39px] text-center font-normal">
          Transferring Cross-Chain Simplified
        </h3>
        <h1 className="text-[66px] font-bold text-center">
          ONE CLICK TRANSFERS
        </h1>
        <button className="hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-12 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31] bg-[#f1f1f1]">
          <Image
            src={'/blender.svg'}
            alt="blender"
            height={30}
            width={30}
            className="self-center"
          />
          <Link href={'/getStarted'} className="text-[24px] self-center">
            Start Transferring
          </Link>
        </button>
      </div>
      <Image
        src={'/mainLanding/landing-boxright.png'}
        alt="coin input"
        width={450}
        height={450}
        className="absolute right-0"
      />
    </main>
  );
};

export default Hero;
