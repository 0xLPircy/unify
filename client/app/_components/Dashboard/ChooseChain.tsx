import Image from 'next/image';
import React from 'react';

const ChooseChain = ({ chain }: any) => {
  return (
    <Image
      src={`/chooseChain/${chain}.png`}
      height={40}
      width={40}
      alt="eth"
      className="self-center place-self-center"
    />
  );
};

export default ChooseChain;
