const prompts = require('prompts');
const compiler = require("./compiler.js")

const questions = [
  {
    type: 'text',
    name: 'contractFileName',
    message: `What's the filename where your contract is? [greeting.sol]`
  },
  {
    type: 'text',
    name: 'contractName',
    message: `What's the name of the contract [GreetingContract]?`
  },
  {
    type: 'text',
    name: 'account',
    message: `From which address should be this contract be sent? [0x079b90...]`
  }
];

(async () => {
  const response = await prompts(questions);
  compiler.compileContract(response.contractFileName, response.contractName, response.account)
})();