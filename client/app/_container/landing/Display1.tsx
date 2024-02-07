import Image from 'next/image';
import React from 'react';

const Display1 = () => {
  return (
    <div className="bg-[#091D31] px-16 flex w-[100vw] pt-8 justify-around z-10">
      <Image
        src={'/mainLanding/landing-boxes.png'}
        alt="lanign"
        height={280}
        width={380}
        className="rounded-[16px]"
      />
      <div className="flex flex-col gap-6 px-16 self-center items-center justify-centers">
        <h1 className="text-[45px] text-[#ffffff] font-semibold text-center">
          Transfer between any chain.
        </h1>
        <div className="flex flex-row justify-center items-center gap-4 font-semibold">
          <div className="rounded-full w-fit border-solid border-[1px] border-[#ffffff] px-4 py-1 flex justify-center items-center gap-[10px]">
            <Image
              src={'/mainLanding/icon-people.png'}
              alt="landing"
              height={24}
              width={61}
              className="max-h-[24px] min-w-[61]"
            />
            <h4 className="text-[21px] text-[#ffffff] ">To anyone</h4>
          </div>
          <div className="rounded-full w-fit border-solid border-[1px] border-[#ffffff] px-4 py-1 flex gap-[10px]">
            <Image
              src={'/mainLanding/icon-globe.svg'}
              alt="landing"
              height={30}
              width={30}
              className=""
            />
            <h4 className="text-[21px] text-[#ffffff] ">Anywhere</h4>
          </div>
          <div className="rounded-full w-fit border-solid border-[1px] border-[#ffffff] px-4 py-1 flex gap-[10px]">
            <Image
              src={'/mainLanding/icon-time.svg'}
              alt="landing"
              height={24}
              width={33}
              className=""
            />
            <h4 className="text-[21px] text-[#ffffff] ">At Anytime</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display1;
