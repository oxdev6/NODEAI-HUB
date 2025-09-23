// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UsageReceipts {
    event Receipt(address indexed user, bytes32 jobId, uint256 tokens, uint256 ms);

    function record(bytes32 jobId, uint256 tokens, uint256 ms) external {
        emit Receipt(tx.origin, jobId, tokens, ms);
    }
}


