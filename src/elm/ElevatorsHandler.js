
import {Elevator} from './Elevator.js';

export class ElevatorsHandler {
    constructor(parameterHandler, eventHandler, passengersHandler){
        this.parameterHandler = parameterHandler;
        this.eventHandler = eventHandler;
        this.passengersHandler = passengersHandler;

        this.elevators = [];
    }

    update(){
        // remove / add elevators
        if (this.elevators.length > this.parameterHandler.elevatorCount)
           this.elevators.splice(this.parameterHandler.elevatorCount);
        else if (this.elevators.length < this.parameterHandler.elevatorCount){
            for (let i = 0; i < this.parameterHandler.elevatorCount - this.elevators.length; i++)
                this.elevators.push(new Elevator(this.parameterHandler, this.elevators.length /*uidx*/, {initial_floor: 0}));
        }

        for (let elevator of this.elevators)
            this.eventHandler.onUpdateBefore(elevator);
        for (let elevator of this.elevators)
            this.eventHandler.onUpdate(elevator);
        for (let elevator of this.elevators)
            this.eventHandler.onUpdateAfter(elevator, this.passengersHandler);
    }

    goToFloor(elevatorIdx, floorIdx){
        if (elevatorIdx < 0 || elevatorIdx >= this.elevators.length)
            return;
        this.eventHandler.goToFloor(floorIdx, this.elevators[elevatorIdx]);
    }
}; // class ElevatorsHandler