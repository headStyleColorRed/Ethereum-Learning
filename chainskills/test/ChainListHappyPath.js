const ChainList = artifacts.require("./ChainList.sol")
const web3 = require("web3")

// Test suite
contract("ChainList", (accounts) => {
    var chainListInstance
    var seller = accounts[1]
    var articleName = "article 1"
    var articleDescription = "Description for article 1"
    var articlePrice = "10"

    it("Should be initalized with empty values", async () => {
      let instance = await ChainList.deployed()
      let data = await instance.getArticle()

      assert.equal(data[0], 0x0, "Seller must be empty")
      assert.equal(data[1], "", "Article name must be empty")
      assert.equal(data[2], "", "Description must be empty")
      assert.equal(data[3].toNumber(), 0, "Price must be zero")
    })

    it("Should sell an article", async () => {
      instance = await ChainList.deployed()
      let data = await instance.sellArticle(articleName, articleDescription, articlePrice, web3.utils.toWei(articlePrice, "ether"), { from: seller })
      
      assert.equal(data[0], seller, "Seller must be " + seller)
      assert.equal(data[1], articleName, "Article name must be " + articleName)
      assert.equal(data[2], articleDescription, "Description must be " + articleDescription)
      assert.equal(data[3].toNumber(), web3.utils.toWei(articlePrice, "ether"), "Price must be " + web3.utils.toWei(articlePrice, "ether"))
    })
});