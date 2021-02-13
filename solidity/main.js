const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
const fs = require("fs")


// List of accounts

// Creating and compiling smart contract
let compiledContract = require("./build/Greetings.json")
let contractABI = compiledContract.abi
let uploadContract = new web3.eth.Contract(contractABI)
let byteCode = compiledContract.bytecode
let deployedContract = uploadContract.deploy({
    data: byteCode,
    from: web3.eth.accounts.coinbase,
    gas: 47000000
})
console.log(deployedContract);


console.log("Done")