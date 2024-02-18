'use client';
import { ChooseChain } from '@/app/_components';
import { chains } from '@/app/_lib/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferSection = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<number>();
  const [currency, setCurrency] = useState('USDC');
  const [network, setNetwork] = useState('');
  const previewHandler = () => {
    console.log(recipient);
    console.log(amount);
    console.log(currency);
    console.log(network);
    setTimeout(() => {
      // FUNCTION FOR DEDUCTION
      // INTEGRA
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: 'Calculating Deductions',
        success: 'Deductions Calculated',
        error: 'Not Enough Funds'
      });
    }, 100);

    setRecipient('');
    setAmount(0);
    setCurrency('USDC');
  };
  return (
    <div className="w-[694px] bg-[#00000000] rounded-[24px] p-6 flex flex-col gap-4">
      <h1 className="text-center text-[42px] w-[100%] font-bold">
        Transfer funds
      </h1>
      {/* recipient */}
      <div className="w-[100%] grid gap-2">
        <h3 className="text-start text-[21px]">Type Recipient</h3>
        <input
          onChange={(e) => {
            setRecipient(e.target.value);
          }}
          value={recipient}
          type="text"
          placeholder="Type address or ens or lens"
          className="p-[10px] bg-[#f1f1f1] text-start text-[21px] rounded-[8px] border-[1px] border-solid border-[#BDCFD0]"
        />
      </div>
      {/* network */}
      <div className="grid gap-2">
        <h3 className="text-start text-[21px]">Select Network</h3>
        <div className="grid grid-flow-col overflow-x-scroll gap-[8px] place-content-start">
          {chains.map((chain) => (
            <div
              key={chain.name}
              onClick={() => {
                setNetwork(chain.name == network ? '' : chain.name);
              }}
              className={
                `bg-[#CFE3E2] rounded-[8px] px-[7px] grid w-[70px] h-[70px] 
                hover:border-b-[4px] hover:border-t-[4px] border-solid border-[#2f2f2f] mb-3 border-[0.1px]` +
                (network == chain.name ? ' border-b-[5px] border-[2px]' : '')
              }
            >
              <ChooseChain chain={chain.name} key={chain.name} />
            </div>
          ))}
        </div>
      </div>
      {/* amount */}
      <div className="grid gap-2 w-[100%]">
        <h3 className="text-start text-[21px]">Choose Amount</h3>
        <div className="grid grid-flow-col gap-[8px]">
          <div className="flex  bg-[#f1f1f1] text-start text-[21px] rounded-[8px] w-[470px] border-[1px] border-solid border-[#BDCFD0] ">
            <input
              onChange={(e) => {
                setAmount(parseInt(e.target.value, 10));
              }}
              value={amount}
              type="number"
              placeholder="Type amount"
              className="w-[100%]  p-[9px] rounded-[12px] m-[3px] border-[0.3px] border-solid border-[#BDCFD0]"
            />
            <select
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              value={currency}
              name="dropdown"
              className="rounded-[12px] m-[3px] border-[0.3px] border-solid border-[#BDCFD0] hover:text-[18px] hover:px-[4px]"
            >
              <option value={'USDC'}>USDC</option>
              <option value={'FXD'}>FXD</option>
            </select>
          </div>
          {/* btn */}
          <button
            onClick={() => {
              previewHandler();
            }}
            className="px-[20px] py-[10px] grid grid-flow-col rounded-[8px] gap-2 bg-[#48637C] hover:cursor-pointer hover:border-b-[4px] border-[#000000] border-[0.6px] hover:py-[8px]"
          >
            <h4 className="text-[21px] text-[#ffffff] font-bold place-self-center self-center">
              Preview
            </h4>
          </button>
        </div>
      </div>
      <Image
        src={'/transfer-chest.png'}
        alt="transaction chest"
        width={374}
        height={374}
        className="z-[-10] fixed bottom-0 place-self-center"
      />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TransferSection;
