"use client"
import { ConnectButton } from "@particle-network/connectkit";
import '@particle-network/connectkit/dist/index.css';
import Image from "next/image";


const AccountInfo = () => {
    return (
        <ConnectButton.Custom>
            {({ account, openAccountModal }) => {
                return (

                    <button className="px-5 grid grid-flow-col gap-[10px] py-[6px]" onClick={openAccountModal} disabled={!account}>
                        <Image
                            src={'/wallet.svg'}
                            alt="wallet"
                            width={24}
                            height={24}
                            className="self-center place-self-center"
                        />
                        <h3 className="text-[21px] self-center place-self-center">
                            {account ? account?.slice(0, 5) : "test.eth"}...{account?.slice(38, 42)}
                        </h3>
                    </button>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default AccountInfo