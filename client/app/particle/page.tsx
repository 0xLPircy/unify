"use client"
import { ConnectButton } from "@particle-network/connectkit";
import '@particle-network/connectkit/dist/index.css';

const ParticleAuth = () => {
    return (
        <ConnectButton />
        // <ConnectButton.Custom>
        //     {({ account, chain, openAccountModal, openConnectModal, openChainModal, accountLoading }) => {
        //         return (
        //             <div>
        //                 <button onClick={openConnectModal} disabled={!!account}>
        //                     Open Connect
        //                 </button>
        //                 <br />
        //                 <br />
        //                 <button onClick={openAccountModal} disabled={!account}>
        //                     Open Account
        //                 </button>
        //                 <br />
        //                 <br />
        //                 <button onClick={openChainModal} disabled={!account}>
        //                     Open Switch Network
        //                 </button>
        //                 <div>
        //                     <h3>account</h3>
        //                     <p>{account}</p>
        //                 </div>
        //             </div>
        //         );
        //     }}
        // </ConnectButton.Custom>
    );
}

export default ParticleAuth