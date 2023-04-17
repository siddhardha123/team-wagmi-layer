// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract therapy {
    
    struct Therapist {
        string name;
        string image;
        address walletAddress;
        string qualification;
        string description;
        string achievements;
        uint payPerSlot;
    }
    
   struct Slot{
    uint index;
    uint date;
    uint slotTime;
    address createdBy;
    address bookedBy;
    bool isAvailable;
    bool isCompleted;
}
    
    Therapist[] public therapists;
    Slot[] public slots;
    mapping (address => uint[]) public therapistToSlots;
    mapping (address => uint[]) public userToBookedSlots;
    
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }
    
    modifier onlyTherapist() {
        bool isTherapist = false;
        for (uint i = 0; i < therapists.length; i++) {
            if (therapists[i].walletAddress == msg.sender) {
                isTherapist = true;
                break;
            }
        }
        require(isTherapist == true, "Only a therapist can call this function");
        _;
    }
    
    function addTherapist(string memory _name, string memory _image,address _walletAddress,string memory _qualification, string memory _description, string memory _achievements, uint _payPerSlot) public onlyAdmin {
        Therapist memory newTherapist = Therapist(_name,_image, _walletAddress, _qualification, _description, _achievements, _payPerSlot);
        therapists.push(newTherapist);
    }
    
    // function addSlot(uint _date, uint _slotTime) public onlyTherapist {
    //     Slot memory newSlot = Slot(_date, _slotTime, msg.sender, address(0), true, false);
    //     slots.push(newSlot);
    //     therapistToSlots[msg.sender].push(slots.length - 1);
    // }
    function addSlot(uint _date, uint _slotTime) public onlyTherapist {
    Slot memory newSlot = Slot(slots.length, _date, _slotTime, msg.sender, address(0), true, false);
    slots.push(newSlot);
    therapistToSlots[msg.sender].push(slots.length - 1);
}
    
    function bookSlot(uint _slotIndex) public payable {
        require(slots[_slotIndex].isAvailable == true, "Slot not available");
        require(msg.value == therapists[getTherapistIndex(slots[_slotIndex].createdBy)].payPerSlot, "Invalid payment amount");
        slots[_slotIndex].bookedBy = msg.sender;
        slots[_slotIndex].isAvailable = false;
        userToBookedSlots[msg.sender].push(_slotIndex);
        payable(slots[_slotIndex].createdBy).transfer(msg.value);
    }
    
    function getAllTherapists() public view returns (Therapist[] memory) {
        return therapists;
    }
     function getAllSlots() public view returns (Slot[] memory) {
        return slots;
    }
    
    // function getAllSlotsByCreatedBy() public view returns (Slot[] memory) {
    //     uint[] memory slotIndices = therapistToSlots[msg.sender];
    //     Slot[] memory createdSlots = new Slot[](slotIndices.length);
    //     for (uint i = 0; i < slotIndices.length; i++) {
    //         createdSlots[i] = slots[slotIndices[i]];
    //     }
    //     return createdSlots;
    // }
    function getAllSlotsByCreatedBy(address _createdBy) public view returns (Slot[] memory) {
    uint[] memory slotIndices = therapistToSlots[_createdBy];
    Slot[] memory createdSlots = new Slot[](slotIndices.length);
    for (uint i = 0; i < slotIndices.length; i++) {
        createdSlots[i] = slots[slotIndices[i]];
    }
    return createdSlots;
}
    
    function getAllSlotsByBookedBy() public view returns (Slot[] memory) {
        uint[] memory slotIndices = userToBookedSlots[msg.sender];
        Slot[] memory bookedSlots = new Slot[](slotIndices.length);
        for (uint i = 0; i < slotIndices.length; i++) {
            bookedSlots[i] = slots[slotIndices[i]];
        }
        return bookedSlots;
    }
    
    function getTherapistIndex(address _walletAddress) private view returns (uint) {
for (uint i = 0; i < therapists.length; i++) {
if (therapists[i].walletAddress == _walletAddress) {
return i;
}
}
revert("Therapist not found");
}
}
