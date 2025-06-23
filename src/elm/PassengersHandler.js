
export class PassengersHandler {
    constructor(parameterHandler, passengersGenerator){
        this.parameterHandler = parameterHandler;
        this.passengersGenerator = passengersGenerator;

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

        const newPassengers = this.passengersGenerator.generatePassengersIfNeeded();
        if (newPassengers){
            for (let pax of newPassengers)
                this.passengerByFloors[pax.floor] += pax.count;
        }
    }

    getPassengersCount(floorIdx){
        return this.passengerByFloors[floorIdx];
    }

} // class PassengersHandler
