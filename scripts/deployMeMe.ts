import { beginCell, Cell, toNano } from '@ton/core';
import { ExampleJettonMaster } from '../wrappers/ExampleJettonMaster';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../wrappers/buildOnchain';

export async function run(provider: NetworkProvider) {
    let metaData = buildOnchainMetadata({ name: "J545dfdfF34", description: "243423fdfdf", symbol: "mi", image: "https://github.com/lly6661/website/blob/main/GBC.png?raw=true" });
    const jettonMaster = provider.open(await ExampleJettonMaster.fromInit(provider.sender().address!!, metaData));

    await jettonMaster.send(
        provider.sender(),
        {
            value: toNano('0.2') + toNano("0.1"),
        },
        {
            $$type: 'JettonMint',
            origin: provider.sender().address!!,
            receiver: provider.sender().address!!,
            amount: toNano('1000000000'),
            custom_payload: null,
            forward_ton_amount: toNano("0.1"),
            forward_payload: beginCell().endCell().beginParse(),
        }
    );

    await provider.waitForDeploy(jettonMaster.address);

    // run methods on `meMe`
}
