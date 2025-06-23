
export class PassengersHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;

        this.passengerByFloors = [];
    }

    update(){
        // remove / add floors
        if (this.passengerByFloors.length > this.parameterHandler.elevatorCount)
           this.passengerByFloors.splice(this.parameterHandler.elevatorCount);
        else if (this.passengerByFloors.length < this.parameterHandler.elevatorCount){
            for (let i = 0; i < this.parameterHandler.elevatorCount - this.passengerByFloors.length; i++)
                this.passengerByFloors.push(0);
        }
    }

}
