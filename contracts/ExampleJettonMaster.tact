import "@stdlib/deploy";
import "./JettonMaster";
import "./JettonWallet";

contract ExampleJettonMaster with JettonMaster, Deployable {
    total_supply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address;
    jetton_content: Cell;
    init(owner: Address, jetton_content: Cell){
        self.owner = owner;
        self.jetton_content = jetton_content;
    }


    override inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf ExampleJettonWallet(owner_address, myAddress());
    }
}

contract ExampleJettonWallet with JettonWallet {
    balance: Int as coins = 0;
    owner: Address;
    jetton_master: Address;
    init(owner: Address, jetton_master: Address){
        self.owner = owner;
        self.jetton_master = jetton_master;
    }

    override inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf ExampleJettonWallet(owner_address, self.jetton_master);
    }
}