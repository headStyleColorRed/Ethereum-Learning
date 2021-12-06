// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ChainList {
    // Custom types
    struct Article {
      uint id;
      address payable seller;
      address buyer;
      string name;
      string description;
      uint256 price;
    }

    // Variables
    uint articleCounter;
    address payable contractOwner;
    mapping (uint => Article) public articles;

    // Events
    event LogSellArticle(uint indexed _id, address indexed _seller, string name, uint256 price);
    event LogBuyArticle(uint indexed _id, address indexed _seller, address indexed _buyer, string name, uint256 price);

    // Modifiers
    modifier onlyOwner() {
      require(msg.sender == contractOwner, "Only the contract owner can deactivate this contract");
      _;
    }

    // Init
    constructor() {
      contractOwner = payable(msg.sender);
    }

    // Deactivate
    function kill() public onlyOwner {
      selfdestruct(contractOwner);
    }

    // + + + + + + + + + + + + + + + + + + +  M E T H O D S + + + + + + + + + + + + + + + + + + + + //
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {      // Update Index
      articleCounter++;

      // Create article at new index position
      articles[articleCounter] = Article(articleCounter, payable(msg.sender), address(0), _name, _description, _price);

      // Emit event
      emit LogSellArticle(articleCounter, payable(msg.sender), _name, _price);
    }

    function buyArticle(uint _id) payable public {
      require(articleCounter > 0, "There are no articles yet");                // There are articles
      require(articleCounter >= _id, "This article doesn't exist yet");             // Article exists on mapping

      // Retrieve article
      Article storage article = articles[_id];
      
      require(article.buyer == address(0x0), "This product has already been purchased");     // There must be no buyer
      require(msg.sender != article.seller, "Buyer and sender cannot be the same address");      // The buyer cannot be the same address that sold it
      require(msg.value >= article.price, "Send value must be greater that article's price");        // The value sent cannot be lower than the expected price

      // Update buyer and send money
      article.buyer = msg.sender;
      article.seller.transfer(msg.value);

      // Emit event
      emit LogBuyArticle(article.id, article.seller, article.buyer, article.name, article.price);
    }

    function getArticleWithId(uint _id) public view returns (Article memory article) {
      require(articleCounter >= _id, "This article doesn't exist");             // Article exists on mapping
      return (articles[_id]);
    }

    function getArticlesForSale() public view returns(uint[] memory) {
      // Output Array
      uint[] memory articleIds = new uint[](articleCounter);
      uint numberofArticlesForSale = 0;
      
      // Iterate over articles and push not sold ones
      for(uint i = 1; i <= articleCounter; i++) {
        if (articles[i].buyer == address(0)) {
          articleIds[numberofArticlesForSale] = articles[i].id;
          numberofArticlesForSale++;
        }
      }

      // Copy articleIds array into a smaller forSale array
      uint[] memory forSale = new uint[](numberofArticlesForSale);
      for(uint i = 0; i < numberofArticlesForSale; i++) {
        forSale[i] = articleIds[i];
      }

      return(forSale);
    }
}
