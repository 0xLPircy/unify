"use client"
import { ConnectButton } from "@particle-network/connectkit";
import '@particle-network/connectkit/dist/index.css';
import Image from "next/image";

const ConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, openChainModal, accountLoading }) => {
                return (
                    <div>
                        <button
                            onClick={openConnectModal} disabled={!!account}
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
                        </button>
                        {/* <br />
                        <br />
                        <button onClick={openAccountModal} disabled={!account}>
                            Open Account
                        </button>
                        <br />
                        <br />
                        <button onClick={openChainModal} disabled={!account}>
                            Open Switch Network
                        </button>
                        <div>
                            <h3>account</h3>
                            <p>{account}</p>
                        </div> */}
                    </div>
                );
            }}
        </ConnectButton.Custom>
        // <ConnectButton />
    )
}

export default ConnectWallet