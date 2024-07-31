import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MeMe } from '../wrappers/ExampleJettonMaster';
import '@ton/test-utils';

describe('MeMe', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let meMe: SandboxContract<MeMe>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        meMe = blockchain.openContract(await MeMe.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await meMe.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: meMe.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and meMe are ready to use
    });
});
