'use client';
import React, { useEffect, useState } from 'react';
import { Footer } from '../_components';
import Image from 'next/image';
import { DeductionSection, FundsSection, TransferSection } from '../_container';
import GoldRushComp from '../_components/Dashboard/GoldRushComp';
import { useCovalent, useSearch } from '@covalenthq/goldrush-kit';
import { useAccount, useAccountInfo } from '@particle-network/connectkit';
import { useRouter } from 'next/navigation';
import { getSmartAccountAddress } from '@particle-network/auth-core';
import { useEthereum } from '@particle-network/auth-core-modal';
import { Web3Provider } from '@ethersproject/providers';

const DashboardPage = () => {
  const [signer, setSigner] = useState(null)
  const account = useAccount();
  const router = useRouter();
  const { provider } = useEthereum()

  useEffect(() => {
    if (!account) {
      router.push('/getStarted');
    }
    (async () => {
      // const user = await getSmartAccountAddress({ //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
      //   name: "SIMPLE",
      //   version: "1.0.0"
      // })
      // console.log("user>>>>>>", user)
    })()
  }, [account, router])
  useEffect(() => {
    const ethSigner = new Web3Provider(provider).getSigner()
    setSigner(ethSigner)
  }, [provider, account])
  return (
    <>
      <div className="z-0 w-[100vw] h-[91vh] flex flex-col bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)]">
        <Image
          src={'/mainLanding/landing-nettop.png'}
          width={1200}
          height={900}
          alt="bg"
          className="absolute top-[100px] opacity-75 self-center z-0"
        />
        <div className="flex flex-row pt-0 z-10 h-[100%]">
          <FundsSection />
          <TransferSection />

          <DeductionSection signer={signer} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
