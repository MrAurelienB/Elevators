import {ELEVATOR_SPEED_POSITION_FACTOR} from './Constants.js';
import {ELEVATOR_STATE} from './Enums.js';

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

        // ELEVATOR
        this.minElevatorSpeed = 1;
        this.maxElevatorSpeed = 20;
        this.elevatorSpeed = 5;
        this.elevatorSpeedFactor = 0.35;

        // ELEVATOR IDLE TIMES
        this.idleTimes = new Array(ELEVATOR_STATE.MAX).fill(0);
        this.idleTimes[ELEVATOR_STATE.LOADING] = 20; // per people
        this.idleTimes[ELEVATOR_STATE.UNLOADING] = 20; // per people
        this.idleTimes[ELEVATOR_STATE.DOOR_OPENING] = 50;
        this.idleTimes[ELEVATOR_STATE.DOOR_CLOSING] = 50;
        this.idleTimes[ELEVATOR_STATE.WAITING] = 50; // TODO temporaire le temps que l'on gere le loading/unloading
    }

    getElevatorSpeed(){
        return this.elevatorSpeed * this.elevatorSpeedFactor;
    }

    getFloorIdx(floor){
        return floor - this.lowestFloor;
    } // getFloorIdx

    getHighestFloor(){
        return this.highestFloor;
    }

    getIdleTime(state){
        return this.idleTimes[state];
    }

    getLowestFloor(){
        return this.lowestFloor;
    }

    getPositionFromFloor(floor){
        return ELEVATOR_SPEED_POSITION_FACTOR * this.getFloorIdx(floor);
    }

    getRandomFloor(){
        return Math.floor(Math.random() * (this.highestFloor - this.lowestFloor + 1) + this.lowestFloor);
    }
}  // class ParameterHandler