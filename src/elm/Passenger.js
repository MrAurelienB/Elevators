import {ELEVATOR_DIRECTION} from './Enums.js';

export class Passenger {
    constructor(uidx, originFloorIdx, destinationFloorIdx){
        this.uidx = uidx;
        this.originFloorIdx = originFloorIdx;
        this.destinationFloorIdx = destinationFloorIdx;
    }

    getDirection(){
        return this.originFloorIdx < this.destinationFloorIdx ? ELEVATOR_DIRECTION.UP : ELEVATOR_DIRECTION.DOWN;
    }
} // class Passenger
