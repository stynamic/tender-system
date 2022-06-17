// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './TenderPassed.sol';

contract Tender {
    struct Proposal {
        address bidderAddress;
        uint amount;
        uint totalStages;
    }

    address private manager;
    address private tenderPassed;
    uint private biddingEndTime;
    string private name;
    Proposal[] public proposals;

    constructor(address _manager, uint _biddingOpenFor, string memory _name) {
        manager = _manager;
        biddingEndTime = block.timestamp + _biddingOpenFor;
        name = _name;
    }

    function placeBid(uint _amount, uint _totalStages) external {
        require(block.timestamp <= biddingEndTime, "Bidding ended.");
        require(_amount > 0, "Invalid bid.");

        newProposal(_amount, _totalStages);
    }

    function allocateTender(uint index) external {
        require(msg.sender == manager, "You're not a manager.");
        require(proposals.length > 0, "No proposals found.");
        require(tenderPassed == address(0), "Tender already allocated");

        passTheTender(index);        
    }

    function getAllDetails() external view returns(address, address, uint, string memory) {
        return (manager, tenderPassed, biddingEndTime, name);
    }

    function getAllProposals() public view returns(Proposal[] memory) {
        return proposals;
    }

    function newProposal(uint _amount, uint _totalStages) private {
        Proposal memory proposal = Proposal({
            bidderAddress: payable(msg.sender),
            amount: _amount,
            totalStages: _totalStages
        });

        proposals.push(proposal);
    } 

    function passTheTender(uint index) private {
        TenderPassed _tenderPassed = new TenderPassed(
            manager,
            payable(proposals[index].bidderAddress),
            proposals[index].amount,
            proposals[index].totalStages
        );

        tenderPassed = address(_tenderPassed);
    }
}