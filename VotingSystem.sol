// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    mapping(address => bool) public hasVoted;
    mapping(address => string) public addressToName;
    mapping(string => uint256) public candidateVotes;

    function register(string memory _name) public {
        require(bytes(addressToName[msg.sender]).length == 0, "Already registered");
        addressToName[msg.sender] = _name;
    }

    function vote() public {
        require(bytes(addressToName[msg.sender]).length != 0, "Not registered");
        require(!hasVoted[msg.sender], "Already voted");
        
        // Consider using candidate IDs instead of names for security reasons
        candidateVotes["Candidate1"]++; // Example candidate
        hasVoted[msg.sender] = true;
    }
}