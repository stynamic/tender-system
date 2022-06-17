// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './Tender.sol';

contract TenderFactory {
    address[] public tenders;
    address public manager = msg.sender;

    function newTender(uint _biddingOpenFor, string calldata _name) external {
        require(msg.sender == manager, "You're not a manager.");

        Tender tender = new Tender(msg.sender, _biddingOpenFor, _name);
        tenders.push(address(tender));
    }

    function getAllTenders() public view returns(address[] memory) {
        return tenders;
    }
}