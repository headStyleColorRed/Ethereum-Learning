// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract NumberStorage {
    uint storedNumber;

    constructor() {
        storedNumber = 5;
    }
    function setNumber(uint x) public {
        storedNumber = x;
    }
    function getNumber() public view returns (uint) {
        return storedNumber;
    }
}