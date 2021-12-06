const ChainList = artifacts.require("./ChainList.sol")
const web3 = require("web3")

// Test suite
contract("ChainList", (accounts) => {
    var chainListInstance;
    var seller = accounts[1];
    var buyer = accounts[2];
    var articleName1 = "article 1";
    var articleDescription1 = "Description for article 1";
    var articlePrice1 = "1";
    var articleName2 = "article 2";
    var articleDescription2 = "Description for article 2";
    var articlePrice2 = "3";
    var sellerBalanceBeforeBuy, sellerBalanceAfterBuy;
    var buyerBalanceBeforeBuy, buyerBalanceAfterBuy;

    before(async () => {
      chainListInstance = await ChainList.deployed()
    })

    it("Test contract instantiation", async () => {
      let data = await chainListInstance.getArticlesForSale()
      assert.equal(data.length, 0, "There should be no articles created")
    })

    it("Sell first artcile", async () => {
      await chainListInstance.sellArticle(articleName1, articleDescription1, web3.utils.toWei(articlePrice1, "ether"), { from: seller });
      let articles = await chainListInstance.getArticlesForSale()
      assert.equal(articles.length, 1, "There should be one article")
      
      let id = articles[0].toNumber()
      assert.equal(id, 1, "Article Id should be 1")
      let article = await chainListInstance.articles(id)
      assert.equal(article.seller, seller, "Seller data isn't save when creating article")
      assert.equal(article.buyer, "0x0000000000000000000000000000000000000000", "Byer data should be 0x0")
      assert.equal(article.name, articleName1, "Article name should be " + articleName1)
      assert.equal(article.description, articleDescription1, "Article description should be " + articleDescription1)
      assert.equal(article.price.toNumber(), "9007199254740991", "Article price should be " + articlePrice1)
    })

    it("Sell second artcile", async () => {
      await chainListInstance.sellArticle(articleName2, articleDescription2, web3.utils.toWei(articlePrice2, "ether"), { from: seller });
      let articles = await chainListInstance.getArticlesForSale()
      let article = await chainListInstance.articles(articles[1].toNumber())

      assert.equal(articles.length, 2, "There should be one article")
      assert.equal(articles[1].toNumber(), 2, "Article Id should be 2")
      assert.equal(article.seller, seller, "Seller data isn't save when creating article")
      assert.equal(article.buyer, "0x0000000000000000000000000000000000000000", "Byer data should be 0x0")
      assert.equal(article.name, articleName2, "Article name should be " + articleName2)
      assert.equal(article.description, articleDescription2, "Article description should be " + articleDescription2)
      assert.equal(article.price.toNumber(), "9007199254740991", "Article price should be " + articlePrice2)
    })

    it("Buy article", async() => {
      let receipt = await chainListInstance.buyArticle(1, { from: buyer, value: web3.utils.toWei(articlePrice1, "ether")})
      let article = await chainListInstance.articles(receipt.logs[0].args._id.toNumber())
      let articlesForBuy = await chainListInstance.getArticlesForSale()
      let numberOfArticles = await chainListInstance.getNumberOfArticles()

      assert.equal(article.buyer, buyer, "Buyer data should be " + buyer)
      assert.equal(article.name, articleName1, "Article name should be " + articleName1)
      assert.equal(article.description, articleDescription1, "Article description should be " + articleDescription1)
      assert.equal(article.price.toNumber(), "9007199254740991", "Article price should be " + articlePrice1)
      assert.equal(articlesForBuy.length, 1, "There should be only one article left")
      assert.equal(articlesForBuy[0].toNumber(), 2, "The article left should be the one with id 2")
      assert.equal(numberOfArticles, 2, "There should be still 2 articles on the list")
    })
});