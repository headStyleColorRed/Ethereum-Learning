// "SPDX-License-Identifier: MIT"
pragma solidity 0.4.18;

// Declare contract
contract Greetings {
    string message;

    // Acts like a static singleton when called from outside
    function Greetings() public {
        message = "I'm ready!";
    }

    function setGreetings(string memory _message) public {
        message = _message;
    }

    function getGreetings() public view returns (string memory) {
        return message;
    }
}