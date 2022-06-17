// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract TenderPassed {
    struct Stage {
        string stageName;
        uint amount;
        bool completed;
    }

    address private manager;
    address payable private projectDeveloper;
    uint private projectCost;
    uint private amountClaimable;
    uint private amountReleased;
    uint private stagesRemaining;
    bool private completed = false;
    Stage[] public stages;

    event TenderCompleted(uint dateAndTime);

    modifier checkStageRequest(uint amount) {
        require(msg.sender == projectDeveloper, "Request disallow.");
        require(stagesRemaining > 0, "Stage request disallow");
        require(!completed, "Tender completed.");
        require(amount <= amountClaimable, "Invalid amount.");
        _;
    }

    constructor(
        address _manager,
        address payable _projectDeveloper,
        uint _projectCost,
        uint _stagesRemaining
    )
    {
        manager = _manager;
        projectDeveloper = _projectDeveloper;
        projectCost = _projectCost;
        amountClaimable = _projectCost; 
        stagesRemaining = _stagesRemaining;
    }

    function raiseStageRequest(string calldata _stageName, uint _amount)
        external
        checkStageRequest(_amount)
    {
        amountClaimable -= _amount;
        --stagesRemaining;

        newStage(_stageName, _amount);
    }

    function grantStageRequest(uint index) external payable {
        require(msg.sender == manager, "You're not a manager.");
        require(!stages[index].completed, "Stage already granted.");

        stages[index].completed = true;
        amountReleased += msg.value;
        checkCompleted();

        projectDeveloper.transfer(msg.value);
    }

    function getAllDetails() external view returns(address, address, uint, uint, uint, uint, bool) {
        return (
            manager,
            projectDeveloper,
            projectCost,
            amountClaimable,
            amountReleased,
            stagesRemaining,
            completed
        );
    }

    function getAllStages() public view returns(Stage[] memory) {
        return stages;
    }

    function newStage(string calldata _stageName, uint _amount) private {
        Stage memory stage = Stage({
            stageName: _stageName,
            amount: _amount,
            completed: false
        });

        stages.push(stage);
    }

    function checkCompleted() private {
        if (amountReleased >= projectCost) {
            completed = true;
            emit TenderCompleted(block.timestamp);
        }
    }

}