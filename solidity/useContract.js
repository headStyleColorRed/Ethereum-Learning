// Library Imports
const Web3 = require('web3');
const compiledContract = require("./build/Greetings.json")

// Connection Initialization
const rpcURL = "http://127.0.0.1:7545";
const web3 = new Web3(rpcURL);

// Data set up
let contractABI = compiledContract.abi
let contractAddress = "0x571e108DEC033bB20982f497a2b3A6bE2a18539b"
let account = '0x2599845311ea8CBee9Da50C1161C2c90a2B06205';

// Contract instance
let MyContract = new web3.eth.Contract(contractABI, contractAddress);

function getGreeting() {
    MyContract.methods.getGreetings().call({
        from: account
    }).then((res) => {
        console.log(res);
    })
}

function setaGreeting() {
    MyContract.methods.setGreetings("Hello world").send({ from: account }).then((res) => {
        console.log(res);
    })
}

getGreeting()