// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Parent {
  address payable contractOwner;

    // Modifiers
  modifier onlyOwner() {
    require(msg.sender == contractOwner, "Only the contract owner can deactivate this contract");
    _;
  }

  constructor() {
      contractOwner = payable(msg.sender);
  }
}