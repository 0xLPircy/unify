'use client';
import { ConnectButton } from '@particle-network/connectkit';
import '@particle-network/connectkit/dist/index.css';
import Image from 'next/image';

const ConnectWallet = ({ style, isNav }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        accountLoading
      }) => {
        return (
          <div>
            <button
              onClick={openConnectModal}
              disabled={!!account}
              className={style}
            >
              {isNav && (<Image
                src={'/wallet.svg'}
                alt="login email"
                height={40}
                width={40}
                className="self-center"
              />)}
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
  );
};

export default ConnectWallet;
