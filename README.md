# Learning Solidity Development

###  Basics
Data on the internet is transfered and duplicated constantly and it mutates along the way.
This data has value and this value cannot be spent twice. Doublespending! That's the reason in the physical world we use things as bills or coins that are difficult to conterfait.
Another way to avoid double spending is by registering every transaction that is made. AKA.. a ledger.


### Genesis Block
1. The command ```puppeth``` will start a genesis block generation.
    - Add network name
    - Configure new genesis (2)
    - Create from scratch (1)
    - We want a proof-of-work cosensus engine (1)
    - No pre-funded account, press enter
    - 1 wei per addres (yes)
    - Chain/ newtork Id? Let's go with 4224
    - Manage existing genesis (2)
    - Export genesis configuration (2)
    - Where to save genesis? current, just enter

### Start Private Node
1. Command ```geth --datadir . init <nameOfGenesisBlock.json>```
2. Create accounts:
    - geth --datadir . account new
    - password: 1234
3. Show accounts :
    - geth --datadir . account list
4. Create startnode.sh with command:
    ```  geth --networkid 4224 --mine --minerthreads 1 --datadir "/Users/rodrigolabradorserrano/Documents/coding/Ethereum/private" --nodiscover --http --http.port "8545" --port "30303" --http.corsdomain "*" --nat "any" --http.api eth,web3,personal,net --unlock 0 --password "/Users/rodrigolabradorserrano/Documents/coding/Ethereum/private/password.sec" --allow-insecure-unlock --ipcpath "~/Library/Ethereum/geth.ipc" ```
    
    Where:
        -networkid: The network id (could be main net, goerli...)
        -mine: To start mining right away
        -minerthreads: Threads we want it using on our pc, (1 is more than enough)
        -datadir: Folder where all info is
        -nodiscover: So it doesn't attach and look for other nodes
        -http: Allow rpc connection
        -http.port: Standard port is 8545
        -port: Discovery port
        -http.corsdomain: to allow or not connections
        -nat: network configuration
        -http.api: Modules we want to use
        -unlock: which account we want to unlock (it passes index)
        -password: unlocked account password file
        -allow-insecure-unlock: To be able to acces account without using https
        -ipcpath: A file endpoint for other tools to connect to the running node.

### Attach to Node
    -geth attach: Attach to Node
    -eth.accounts: Array of accounts
    -eth.coinbase: Mining account
    -eth.getBalance(eth.accounts[1])
    -web3.fromWei(eth.getBalance(eth.coinbase), "ether"): Converting wei to ether using web3 api
    -miner.stop()
    -miner.start(<numberOfthreads>)
    -net.version: Will return the network id
    -personal.unlockAccount(eth.accounts[1], "1234", 300): 300 is the time in seconds that keeps unlocked,
                                                            it's used to unlock private key for transactions

### Sending ether
    -eth.sendTransaction({from: eth.coinbase, to: eth.accounts[1], value: web3.toWei(10, "ether")})