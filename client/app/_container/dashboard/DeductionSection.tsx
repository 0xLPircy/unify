'use client';
import { IERC20, MainContract } from '@/abi';
import { ChainSubtotal, DeductionTotal } from '@/app/_components';
import { useAppContext } from '@/app/hooks/context/AppContext';
import { parseUnits } from '@ethersproject/units';
import { useEthereum } from '@particle-network/auth-core-modal';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeductionSection = ({ signer }) => {
  const { sendTransaction } = useEthereum()
  const { deductions, recipient, amount, destinationChainId, deductionAmount, deductionChainId } = useAppContext()


  const transferHandler = async () => {
    const contractInstance = new ethers.Contract(MainContract.contractAddress, MainContract.abi, signer)
    const bigNumberChainId = ethers.BigNumber.from(destinationChainId)
    const data = await contractInstance.populateTransaction.sendAssets(
      recipient,
      parseUnits(amount.toString(), 'ether'),
      bigNumberChainId,
      deductionChainId,
      deductionAmount
    )
    // const contractInstance = new ethers.Contract(IERC20.contractAddress, IERC20.abi, signer)
    // const data = await contractInstance.populateTransaction.approve("0x35343628C66991404ecE443083b90B0d1CDDe4Fa", parseUnits("1000000000000000", 'ether'))
    // await contractInstance.populateTransaction.sendAssets("0x79fDC8EC923aE2d6B0CC3757b476422e01DAbE7d", 200, 80001, [], [])
    console.log(">>>>>>>>>>>>>>>>>. data", data)
    // TRANSFER CLICKED
    const txnx = await sendTransaction({
      to: MainContract.contractAddress,
      data: data.data
    })
    console.log("transaction", txnx)
    setTimeout(() => {
      // FUNCTION FOR TRANSFER
      // INTEGRA
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: 'Transfer Initiated',
        success: 'Transfer Successfull',
        error: 'Transfer Unsuccessfull'
      });
    }, 100);
  };
  return (
    <div className="h-fit flex flex-col gap-3 justify-start items-start m-4 p-4 rounded-[16px] bg-[#FECE00] border-[0.9px] border-[#e2c02a]">
      <h2 className="text-center text-[21px]">Deduction detailed by chain:</h2>
      {/* deduction content */}
      <div className=" flex flex-col items-center ">
        {/* deduction*/}
        <div className="w-[366px] ">
          {/* heading */}
          <div className="grid grid-flow-col bg-[#ffffff] w-[366px] rounded-[8px] mb-[8px] border-[0.3px] border-solid border-[#000000]">
            <h4 className="w-[220px] p-[6px] text-center text-[18px]  border-r-[1px] border-solid border-[#1C1B1F]">
              Chain
            </h4>
            <h4 className="text-center text-[18px] p-[6px] w-[146px]">
              Subtotal
            </h4>
          </div>
          {/* chain - subtotal */}
          <div
            className="flex flex-col overflow-y-scroll max-h-[210px] 
          rounded-md mb-[6px] border-[0.1px] border-solid border-[#000000]"
          >
            {deductions && deductions.map((chain, index) => (
              <ChainSubtotal chain={chain} key={index} />
            ))}
          </div>
        </div>
        {/* deduction total */}
        <DeductionTotal deductions={deductions} />
        <button
          onClick={async () => {
            await transferHandler();
          }}
          className="mt-2 w-[100%] text-[21px] font-normal 
          bg-[#0BD262] text-[#000000] 
          hover:shadow-[0px_6px_0px_0px_#091D31] hover:mb-1 h-fit rounded-[8px] px-8 py-2 hover:pt-[6px] flex items-center justify-center gap-4 border-[1px] border-solid border-[#091D31] z-50"
        >
          <h4>Transfer Now</h4>
          <Image
            src={'/rocket.svg'}
            alt="transfer"
            width={21}
            height={21}
            className=""
          />
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
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

export default DeductionSection;
