// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ChainList {
    // State variables
    address seller;
    string name;
    string description;
    uint256 price;

    // Events
    event LogSellArticle(address indexed _seller, string name, uint256 price);

    // Methods
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
      seller = msg.sender;
      name = _name;
      description = _description;
      price = _price;

      emit LogSellArticle(seller, name, price);
    }

    function getArticle() public view returns (address _seller, string memory _name, string memory _description, uint256 _price) {
      return (seller, name, description, price);
    }
}
