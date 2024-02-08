import React from 'react';
import { Footer } from '../_components';
import Image from 'next/image';
import { DeductionSection, FundsSection, TransferSection } from '../_container';

const DashboardPage = () => {
  return (
    <>
      <div className="z-0 w-[100vw] flex flex-col bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)]">
        <Image
          src={'/mainLanding/landing-nettop.png'}
          width={1200}
          height={900}
          alt="bg"
          className="absolute top-[100px] opacity-75 self-center z-0"
        />
        <div className="flex flex-row pt-0 z-10">
          <FundsSection />
          <TransferSection />
          <DeductionSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
