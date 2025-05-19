
import {Elevator} from './Elevator.js';

export class ElevatorsHandler {
    constructor(parameterHandler, elevatorsEventHandler){
        this.parameterHandler = parameterHandler;
        this.elevatorsEventHandler = elevatorsEventHandler;

        this.elevators = [];
    }

    update(){
        // remove / add elevators
        if (this.elevators.length > this.parameterHandler.elevatorCount)
           this.elevators.splice(this.parameterHandler.elevatorCount);
        else if (this.elevators.length < this.parameterHandler.elevatorCount){
            for (let i = 0; i < this.parameterHandler.elevatorCount - this.elevators.length; i++)
                this.elevators.push(new Elevator(this.parameterHandler, {initial_floor: 0}));
        }

        for (let elevator of this.elevators)
            this.elevatorsEventHandler.onUpdateBefore(elevator);
        for (let elevator of this.elevators)
            this.elevatorsEventHandler.onUpdate(elevator);
        for (let elevator of this.elevators)
            this.elevatorsEventHandler.onUpdateAfter(elevator);
    }

    goToFloor(elevatorIdx, floorIdx){
        if (elevatorIdx < 0 || elevatorIdx >= this.elevators.length)
            return;
        this.elevatorsEventHandler.goToFloor(floorIdx, this.elevators[elevatorIdx]);
    }
}; // class ElevatorsHandler