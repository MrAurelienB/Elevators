
import {Elevator} from './Elevator.js';

export class ElevatorsHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;

        this.elevators = [];
    }

    update(){
        if (this.elevators.length > this.parameterHandler.elevatorCount)
           this.elevators.splice(this.parameterHandler.elevatorCount);
        else if (this.elevators.length < this.parameterHandler.elevatorCount){
            for (let i = 0; i < this.parameterHandler.elevatorCount - this.elevators.length; i++)
                this.elevators.push(new Elevator({initial_floor: this.elevators.length}));
        }

        for (let elevator of this.elevators){
            if (elevator.travelPercentage == 0){
                if (elevator.destination_floor != elevator.current_floor)
                    elevator.travelPercentage += 0.5;
            } else if (elevator.travelPercentage >= 100){
                elevator.travelPercentage = 0;
                elevator.current_floor = elevator.destination_floor;
            } else {
                // TODO: il faudrait mettre à jour le current_floor
                elevator.travelPercentage += 0.5;
            }
        }
    }
}; // class ElevatorsHandler