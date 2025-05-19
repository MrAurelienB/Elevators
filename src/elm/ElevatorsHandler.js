
import {Elevator} from './Elevator.js';

export class ElevatorsHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;

        this.elevators = [];
    }

    update(){
        // remove / add elevators
        if (this.elevators.length > this.parameterHandler.elevatorCount)
           this.elevators.splice(this.parameterHandler.elevatorCount);
        else if (this.elevators.length < this.parameterHandler.elevatorCount){
            for (let i = 0; i < this.parameterHandler.elevatorCount - this.elevators.length; i++)
                this.elevators.push(new Elevator({initial_floor: 0}));
        }

        for (let elevator of this.elevators){
            if (elevator.travelPercentage == 0){
                if (elevator.destination_floor != elevator.current_floor)
                    elevator.travelPercentage += this.parameterHandler.getElevatorSpeed();
            } else {
                elevator.travelPercentage += this.parameterHandler.getElevatorSpeed();
                if (elevator.travelPercentage >= (100 / this.parameterHandler.elevatorSpeedFactor)){
                    elevator.travelPercentage = 0;
                    elevator.current_floor = elevator.destination_floor;
                }
            }
        }

        // Model #1
        for (let i = 0; i < this.elevators.length; i++){
            let elevator = this.elevators[i];
            if (elevator.travelPercentage != 0)
                continue;
            if (elevator.current_floor == this.parameterHandler.getLowestFloor())
                this.goToFloor(i, this.parameterHandler.getHighestFloor());
            else if (elevator.current_floor == this.parameterHandler.getHighestFloor())
                this.goToFloor(i, this.parameterHandler.getLowestFloor());
            else
                this.goToFloor(i, this.parameterHandler.getLowestFloor());
        }
    }

    goToFloor(elevatorIdx, floorIdx){
        if (elevatorIdx < 0 || elevatorIdx >= this.elevators.length)
            return;
        this.elevators[elevatorIdx].destination_floor = floorIdx;
    }
}; // class ElevatorsHandler