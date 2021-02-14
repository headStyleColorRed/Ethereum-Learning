// "SPDX-License-Identifier: MIT"
pragma solidity 0.7.4;
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