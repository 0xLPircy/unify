"use client"
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
            erc4337: { //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
                name: "SIMPLE",
                version: "1.0.0"
            },
            wallet: { //optional: particle wallet config
                customStyle: {
                    supportChains: [AvalancheTestnet, EthereumSepolia, PolygonMumbai],
                },
            },
        }}>
            {children}
        </ModalProvider>
    )
}

export default ParticleAuthProvider