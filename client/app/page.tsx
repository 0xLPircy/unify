import Image from 'next/image';
import { Navbar } from './_components';
import Link from 'next/link';
import { Display1, Display2, Hero, HeroBottom } from '@/app/_container/index';

export default function Home() {
  return (
    <div className="w-[100vw] bg-[linear-gradient(299deg,_#FFFCEA_0%,_#FFF8D4_0.01%,_#F8FCFF_100%)] flex flex-col items-center justify-center">
      <Image
        src={'/mainLanding/landing-nettop.png'}
        width={1200}
        height={900}
        alt="bg"
        className="absolute top-0 opacity-75"
      />
      <Hero />
      <Display1 />
      <Display2 />
      <HeroBottom />
    </div>
  );
}
