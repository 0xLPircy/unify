import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <main className="flex flex-row justify-between pt-[40px]">
      <Image
        src={"/mainLanding/landing-boxleft.png"}
        alt="coin input"
        width={350}
        height={469}
        className=""
      />
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-[39px] text-center">
          Transferring Cross-Chain Simplified
        </h3>
        <h1 className="text-[51px] font-semibold text-center">
          ONE CLICK TRANSFERS
        </h1>
        <button className="hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-8 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31]">
          <Image
            src={"/blender.svg"}
            alt="blender"
            height={40}
            width={40}
            className="self-center"
          />
          <h3 className="text-[24px] self-center">Start Transferring</h3>
        </button>
      </div>
      <Image
        src={"/mainLanding/landing-boxright.png"}
        alt="coin input"
        width={450}
        height={450}
        className=""
      />
    </main>
  );
};

export default Hero;
