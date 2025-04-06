
export class ParameterHandler {
    constructor(){

        // BUILDING - FLOORS
        this.minLowestFloor = -6;
        this.maxLowestFloor =  0;
        this.minHighestFloor = 1;
        this.maxHighestFloor = 11;
        this.lowestFloor = this.maxLowestFloor;
        this.highestFloor = this.minHighestFloor;

        // BUILDING - ELEVATORS
        this.minElevatorCount = 1;
        this.maxElevatorCount = 22;
        this.elevatorCount = this.minElevatorCount;
    }

    getFloorIdx(floor){
        return floor - this.lowestFloor;
    } // getFloorIdx
}  // class ParameterHandler