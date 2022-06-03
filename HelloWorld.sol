// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract HelloWorld {
    // Store a message in the smart contract
    string storedMessage;

    // Set the message
    function set(string memory message) public {
        storedMessage = message;
    }

    // Get the message
    function get() public view returns (string memory) {
        return storedMessage;
    }
}