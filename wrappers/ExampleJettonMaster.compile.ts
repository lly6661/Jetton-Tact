import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/ExampleJettonMaster.tact',
    options: {
        debug: true,
    },
};
