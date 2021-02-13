// Library Imports
const Web3 = require('web3');

// Connection Initialization
const rpcURL = "http://127.0.0.1:7545";
const web3 = new Web3(rpcURL);
const compiledContract = require("./build/Greetings.json")

// Data set up
let contractABI = compiledContract.abi
let bytecode = compiledContract.bytecode;

//Contract object and account info
let deploy_contract = new web3.eth.Contract(contractABI);
let account = '0xA934574Caa1B29F2008f5eb5e1a3b78a3e34443D';


// Function Parameter
let payload = {
    data: bytecode
}

let parameter = {
    from: account,
    gas: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
}

// Function Call
deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
    console.log('Transaction Hash :', transactionHash);
}).on('confirmation', () => {}).then((newContractInstance) => {
    console.log('Deployed Contract Address : ', newContractInstance.options.address);
})