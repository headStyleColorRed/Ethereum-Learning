// ************************************************************************************************* //
//
//  In order to upload a Smart contract we have to follow a series of steps:
//
//      1. Library imports
//          a) solc: .sol file's extension compiler
//          b) fs: Node native file reader
//          c) web3: A new web3 instance that connects to Ganache's default port
//
//      2.  Smart Contract compilation 
//          a) Language: Source code language, such as "Solidity", "Vyper", etc.
//          b) Sources: File name with file's stringed content underneath
//          c) Settings: Other settings to enable metadata, abi output, etc.
//          d) CompiledContract: Stringed, compiled and parsed json file with ready output
//
//      3. Data preparation
//          a) ContractABI: Application binary interface that sets the instructions for the EVM
//          b) Bytecode: Unreadable low-level programming language interpreted by the EVM
//
//      4. Contract object and account address
//          a) DeployedContract: Contract object you feed it the ABI calls from contractABI.
//          b) Account: Ganache's account that signs the contract transaction
//      
//      5. Parameters:
//          a) Payload: Is an object that contains the bytecode created on compile
//          b) Parameter.from: Ganache's account that signs the contract transaction
//          c) Gas: The maximum gas provided for a transaction (gas limit).
//          d) GasPrice: The gas price in wei to use for transactions.
//
//      6. Deploying:
//          a) First we call deploy with the payload (aka the bytecode object)
//          b) Then we send the config parameters and wait for the creation success
//
// ************************************************************************************************* //

// 1. Library Imports
const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");

async function compileContract(contractFileName, contractName, account) {
  // 2. Smart Contract compilation
  var input = {
    language: "Solidity",
    sources: {
      'template': {
        content: fs.readFileSync(`./${contractFileName}`, "utf8").toString()
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };

  input.sources[contractFileName] = input.sources['template']
  delete input.sources['template']

  const CompiledContract = JSON.parse(solc.compile(JSON.stringify(input)));


  // 3. Data preparation
  if (CompiledContract["errors"]) {
    console.log(CompiledContract["errors"]);
    return
  }

  let contractABI = CompiledContract.contracts[contractFileName][contractName].abi
  let bytecode = CompiledContract.contracts[contractFileName][contractName].evm.bytecode.object

  // 4. Contract object and account address
  let deployedContract = new web3.eth.Contract(contractABI);

  // 5. Parameters we are going to pass
  let payload = {
    data: bytecode
  }

  let parameter = {
    from: account,
    gas: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
  }

  // 6. Deploying the smart contract!
  deployedContract.deploy(payload).send(parameter, (err, transactionHash) => {
    console.log('Transaction Hash :', transactionHash);
  }).on('confirmation', () => { }).then((newContractInstance) => {
    console.log('Deployed Contract Address : ', newContractInstance.options.address);
    process.exit()
  })
}

module.exports = {
  compileContract,
}