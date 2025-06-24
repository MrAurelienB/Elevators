import {ParameterHandler} from './ParameterHandler.js';

export class DebugParameterHandler extends ParameterHandler {
    constructor(){
        super();

        this.lowestFloor = this.minLowestFloor;
        this.highestFloor = this.maxHighestFloor;

        this.elevatorCount = this.maxElevatorCount;
        this.elevatorSpeed = this.maxElevatorSpeed;
    }
}
