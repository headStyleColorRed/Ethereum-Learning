const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
const solc = require("solc")
const fs = require("fs")


// List of accounts
console.log(web3.eth.accounts);

// Creating and compiling smart contract
let smartContract = fs.readFileSync("./greetings.sol").toString()
let compiledContract = solc.compile(smartContract)
console.log(compiledContract);

console.log("Done")