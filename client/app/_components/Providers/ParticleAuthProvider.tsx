"use client"
import { USDC_ADDRESS } from '@/app/api/constant';
import { AvalancheTestnet, EthereumSepolia, PolygonMumbai } from '@particle-network/chains';
import { ModalProvider } from '@particle-network/connectkit';
import '@particle-network/connectkit/dist/index.css';
import { evmWallets } from '@particle-network/connectors';


const ParticleAuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalProvider options={{
            projectId: "722185e3-22fe-442e-94a8-a18c33684e3e",
            clientKey: "cgu9dTnRfMAlC5cHZviuOCaElveW3OKTU65Zm0Aq",
            appId: "02a4aeed-0626-4edd-9e4e-cbd59749a48a",
            chains: [AvalancheTestnet, EthereumSepolia, PolygonMumbai],
            connectors: [
                ...evmWallets({ projectId: "2f6b4ed8651cde26d63d26308aa7edb4", showQrModal: true }),
            ],
            // erc4337: { //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
            //     name: "SIMPLE",
            //     version: "1.0.0"
            // },
            wallet: { //optional: particle wallet config
                visible: true,
                customStyle: {
                    supportChains: [AvalancheTestnet, EthereumSepolia, PolygonMumbai],
                    fiatCoin: 'USD',
                    displayTokenAddresses: [USDC_ADDRESS.toLocaleLowerCase()],
                    supportAddToken: true,
                    evmSupportWalletConnect: true
                }, preload: true, topMenuType: 'close'
                // entryPosition: 
            },
            promptSettingConfig: { //optional: particle security account config
                //prompt set payment password. 0: None, 1: Once(default), 2: Always
                promptPaymentPasswordSettingWhenSign: 0,
                //prompt set master password. 0: None(default), 1: Once, 2: Always
                promptMasterPasswordSettingWhenLogin: 0
            },
        }}
            language={'en'}   //optional：localize, default en
            walletSort={['Particle Auth', 'Wallet']} //optional：walelt order
        >
            {children}
        </ModalProvider>
    )
}

export default ParticleAuthProvider