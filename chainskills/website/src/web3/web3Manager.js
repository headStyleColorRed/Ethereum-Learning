// Documentation
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md
import Web3 from "web3"
import RawContract from "../assets/ChainList.json"

let web3 = null
let contract = null
let coinbase = null

// Should be called right when the view loads
async function connectToWeb3(ethereum) {
  // First we ask for a web3 provider (could metamask, brave, etc...)
  if (!ethereum) { throw "You need a web3 provider" }

  // Then we request authorization to connect to those accounts
  return await ethereum.request({ method: "eth_requestAccounts" })
    .then((res) => {
      // When connection is succesfull it returns an array with all the accounts allowed
      // Example: ['0xa3ecc7991b21236b309fc136b1b61894e8034857]
      web3 = new Web3(ethereum)
      coinbase = res[0]
      return res[0]
    })
    .catch((err) => {
      if (err.code == 4001) {
        throw "User didn't accept provider connection"
      } else if (err.code == -32002) {
        throw "User has already a pending provider connection request"
      } else {
        throw err
      }
    })
}

// It returns an array with all the accounts allowed
// Example: ['0xa3ecc7991b21236b309fc136b1b61894e8034857]
async function getUserAccounts() {
  return await web3.eth.getAccounts()
}

async function getBalanceForAccount(address) {
  let balance = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balance, "ether")
}

async function sendMoneyToAnotherAccount(senderAccount, recipientAccount, amount) {
  if (Number(amount) <= 0) { throw "Value not allowed" }

  if (!web3.utils.isAddress(recipientAccount)) { throw "The account you are trying to send money doesn't exist" }

  return await web3.eth.sendTransaction({
    from: senderAccount,
    to: recipientAccount,
    value: amount
  }).then((res) => {
    console.log(res);
    return true
  }).catch((err) => {
    console.log(err);
    return false
  })
}

async function connectToContract() {
  let contract_abi = RawContract.abi
  let contract_address = RawContract.networks["5777"].address
  contract = await new web3.eth.Contract(contract_abi, contract_address);
  sellEventListener()
  buyEventListener()
  return
}

async function getArticlesForSale() {
  let rawArticle = await contract.methods.getArticlesForSale().call()
  // if (isNullAddress(rawArticle._seller)) return null

  // return {
  //   description: rawArticle._description,
  //   name: rawArticle._name,
  //   price: rawArticle._price,
  //   seller: rawArticle._seller,
  //   buyer: isNullAddress(rawArticle._buyer) ? null : rawArticle._buyer
  // }
}

function parseArticles(rawArticles) {
  console.log(rawArticles);
}

function publishArticle(name, description, price, account) {
  contract.methods.sellArticle(name, description, price).send({ from: account, gas: 500000 }).catch((err) => { throw err.message })
}

function buyArticle(value) {
  contract.methods.buyArticle().send({ from: coinbase, value: web3.utils.toWei(value, "ether") }).catch((err) => { throw err.message })
}

async function sellEventListener() {
  await contract.events.LogSellArticle({  
    filter: {}, fromBlock: 0
  }, () => { })
    .on('data', (event) => {
      console.log("Log Sell Article");
      console.log(event);
      // Called at begining, not change);
    })
    .on('changed', (event) => {
      console.log("Log Sell Article changed");
      console.log(event);
    })
    .on('error', (error) => {
      console.log(`Sell event error => ${error.message}`)
    });
}

async function buyEventListener() {
  await contract.events.LogBuyArticle({
    filter: {}, fromBlock: 0
  }, () => { })
    .on('data', (event) => {
      console.log("Log Buy Article");
      console.log(event);
    })
    .on('changed', (event) => {
      console.log("Log Buy Article changed");
      console.log(event);
    })
    .on('error', (error) => {
      console.log(`Buy Event error => ${error.message}`)
    });
}

function isNullAddress(address) {
  if (address == undefined || address == null) return true
  return address == "0x0000000000000000000000000000000000000000"
}


export default {
  connectToWeb3,
  getUserAccounts,
  sendMoneyToAnotherAccount,
  getBalanceForAccount,
  connectToContract,
  getArticlesForSale,
  publishArticle,
  buyArticle,
  isNullAddress,
}