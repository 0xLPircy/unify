'use client';
import Image from 'next/image';
import { ConnectWallet, Footer, Navbar } from '../_components';
import Link from 'next/link';
import { useAccount, useParticleProvider } from '@particle-network/connectkit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GetStartedPage = () => {
  const account = useAccount();
  const provider = useParticleProvider();
  const router = useRouter();

  useEffect(() => {
    if (account && provider) {
      router.push('/dashboard');
    }
  }, [account, provider, router]);

  return (
    <>
      <main className="w-[100vw] h-[90vh] bg-[#F1F1F1] grid md:grid-cols-2 grid-flow-row">
        <div className="md:w-[600px] w-[510px] py-4 flex flex-col justify-center gap-4 px-[64px] place-self-center">
          {/* <Link
            href={'/login'}
            className="hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-8 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31]"
          >
            <Image
              src={'/walletConnectB.svg'}
              alt="wallet connect"
              height={40}
              width={40}
              className="self-center"
            />
            <h3 className="text-[24px] self-center">Wallet Connect</h3>
          </Link>
          <Link
            href={'/login'}
            className="hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-8 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31]"
          >
            <Image
              src={'/metamask.svg'}
              alt="metamask"
              height={40}
              width={40}
              className="self-center"
            />
            <h3 className="text-[24px] self-center">Metamask</h3>
          </Link>
          <h2 className="text-[24px] self-center place-self-center">or</h2> */}
          {/* <Link
            href={'/dashboard'}
            className="hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-8 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31]"
          >
            <Image
              src={'/wallet.svg'}
              alt="login email"
              height={40}
              width={40}
              className="self-center"
            />
            <h3 className="text-[24px] self-center">Connect</h3>
          </Link> */}
          {/* TODO: CONNECT BUTTON */}
          <div className="place-self-center ">
            <Image
              src={'/mainLanding/landing-nettop.png'}
              alt="net"
              className="absolute left-0 top-0 z-0 max-w-[50vw] max-h-[100%]"
              width={900}
              height={900}
            />
            <div className="z-10">
              <ConnectWallet style={"hover:shadow-[0px_6px_0px_0px_#091D31] h-fit rounded-[8px] px-12 py-3 flex gap-4 justify-center border-[1px] border-solid border-[#091D31] bg-[#f1f1f1] text-[24px] text-center"} isNav={true} />
            </div>
            <Image
              src={'/landing32.png'}
              alt="net"
              className="absolute left-0 bottom-0 z-0 max-w-[50vw] max-h-[100%]"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%]">
          <Image
            src={'/landing.png'}
            width={1200}
            height={1200}
            alt="mixers"
            className="min-h-[96%]"
          />
          <div className="grid bg-[#f1f1f133] backdrop-blur-[25px] mt-[-147px] rounded-ee-[32px] p-4">
            {/* LOGO NAME */}
            <div className="flex flex-row justify-center gap-6 self-center">
              <Image
                className="place-self-center self-center"
                src={'/logo.svg'}
                alt="logo"
                width={100}
                height={100}
              />
              <h1 className="text-8xl self-center">UNIFY</h1>
            </div>
            {/* Caption */}
            <h3 className="self-center place-self-center text-[32px]">
              Start transfering CrossChain
            </h3>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default GetStartedPage;
