// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ChainList {
    // State variables
    address payable seller;
    address buyer;
    string name;
    string description;
    uint256 price;

    // Events
    event LogSellArticle(address indexed _seller, string name, uint256 price);
    event LogBuyArticle(address indexed _seller, address indexed _buyer, string name, uint256 price);

    // Methods
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
      seller = payable(msg.sender);
      name = _name;
      description = _description;
      price = _price;

      emit LogSellArticle(seller, name, price);
    }

    function buyArticle() payable public {
      require(seller != address(0x0));
      require(buyer == address(0x0));
      require(msg.sender != seller);
      require(msg.value >= price);

      buyer = msg.sender;
      seller.transfer(msg.value);

      emit LogBuyArticle((seller), buyer, name, price);
    }


    function getArticle() public view returns (address _seller, address _buyer, string memory _name, string memory _description, uint256 _price) {
      return (seller, buyer, name, description, price);
    }
}
