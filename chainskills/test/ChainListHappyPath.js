var ChainList = artifacts.require("./ChainList.sol")

// Test suite
contract("ChainList", (accounts) => {
    it("Should be initalized with empty values", async () => {
      let instance = await ChainList.deployed()
      let data = await instance.getArticle()

      assert.equal(data[0], 0x0, "Seller must be empty")
      assert.equal(data[1], "", "Article name must be empty")
      assert.equal(data[2], "", "Description must be empty")
      assert.equal(data[3].toNumber(), 0, "Price must be zero")
    })
});