
// Starting Truffle BlockChain
    1. Truffle init
    2. Truffle develop

// Migration flags when nothing works :))
    1. migrate
    2.  migrate --compile-all --reset

// Greetings
    1. Greetings
    2. Greetings.Greetings.address
    3. Greetings.deployed().then((instance) => { 
        console.log(instance)  // Here you can access the smart Contract
        instance.getGreeting() // "Hello world
    })


// C O N N E C T   T O    G A N A C H E

// Under networks you should add this object (remember not to use develop, but ganache):
   ganache: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

// Then run this command where we added the network parameter
    1. truffle migrate --compile-all --reset --network ganache
    2. truffle console --network ganache
    3. await web3.eth.getAccounts() // get accounts
    4. web3.eth.getTransaction("0x94d68a8a04fe085c51f35a9c105d352a9e887a69f28afabb287de544445d5c8e")
    5. web3.eth.getBlock("0x353339597d47d5ee94b25ef044d5f6b784e03fe5e7708d5c42b8173f31e2cae8")


// Usefull functionalities
    1. web3.eth.getCoinbase()
    2. await web3.eth.getAccounts()
    3. Get contract instance = Greetings.deployed().then((instance) => { app = instance })
    4. app.getGreeting() or app.getGreeting(from: "enter an account") // REading doesn't require gas, nor transaction. 