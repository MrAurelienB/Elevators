
export class ParameterHandler {
    constructor(){
        this.minLowestFloor = -5;
        this.maxLowestFloor =  0;
        this.minHighestFloor = 1;
        this.maxHighestFloor = 8;
        this.lowestFloor = this.maxLowestFloor;
        this.highestFloor = this.minHighestFloor;

        this.minElevatorCount = 1;
        this.maxElevatorCount = 22;
        this.elevatorCount = this.minElevatorCount;
    }

    getFloorIdx(floor){
        return floor - this.lowestFloor;
    } // getFloorIdx
}  // class ParameterHandler