'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { DeductionSection, FundsSection, TransferSection } from '../_container';
import { useRouter } from 'next/navigation';
import { useEthereum } from '@particle-network/auth-core-modal';
import { Web3Provider } from '@ethersproject/providers';
import { getTokenBalances } from '../api';
import usePolling from '../hooks/usePolling';
import { useAccount } from '@particle-network/connectkit';

const DashboardPage = () => {
  const [signer, setSigner] = useState(null)
  const router = useRouter();
  const account = useAccount()
  const { provider } = useEthereum()
  const [userFunds, setUserFunds] = useState([])

  const fetchFunds = useCallback(async () => {
    const res = await getTokenBalances(account);
    setUserFunds(res)
    return res
  }, [account])

  usePolling(fetchFunds)

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
        <div className="flex flex-row pt-0 z-10 h-[100%] justify-between px-10">
          <FundsSection userFunds={userFunds} />
          <TransferSection userFunds={userFunds} />

          <DeductionSection signer={signer} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
