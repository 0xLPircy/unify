"use client";
import Image from "next/image";
import { Navbar } from "./_components";
import { Hero } from "@/app/_containers";

export default function Home() {
  return (
    <div className="w-[100vw] bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)] flex flex-col items-center justify-center">
      <Navbar />
      <Hero />

      <div className="bg-[#091D31] px-16 flex w-[100vw] pt-8 justify-around">
        <Image
          src={"/mainLanding/landing-boxes.png"}
          alt="lanign"
          height={280}
          width={380}
          className="rounded-[16px]"
        />
        <div className="flex flex-col gap-8">
          <h1 className="text-[54px] text-[#ffffff] font-semibold">
            Transfer between any chain
          </h1>
          <div>
            <div className="rounded-full border-solid border-[1px] border-[#ffffff] px-4 py-2 flex gap-[10px]">
              <Image
                src={"/mainLanding/icon-people.png"}
                alt="lanign"
                height={280}
                width={380}
                className="rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
