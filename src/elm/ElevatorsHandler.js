
import {Elevator} from './Elevator.js';

export class ElevatorsHandler {
    constructor(componentFactory){
        this.componentFactory = componentFactory;

        this.elevators = [];
    }

    onUpdateBefore(){
        // remove / add elevators
        if (this.elevators.length > this.componentFactory.parameterHandler.elevatorCount)
           this.elevators.splice(this.componentFactory.parameterHandler.elevatorCount);
        else if (this.elevators.length < this.componentFactory.parameterHandler.elevatorCount){
            for (let i = 0; i < this.componentFactory.parameterHandler.elevatorCount - this.elevators.length; i++)
                this.elevators.push(new Elevator(this.componentFactory.parameterHandler, this.elevators.length /*uidx*/, {initial_floor: 0}));
        }
    } // updateBefore()

    goToFloor(elevatorIdx, floorIdx){
        if (elevatorIdx < 0 || elevatorIdx >= this.elevators.length)
            return;
        this.componentFactory.eventHandler.goToFloor(floorIdx, this.elevators[elevatorIdx]);
    }
}; // class ElevatorsHandler