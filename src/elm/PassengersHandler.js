
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
                this.passengerByFloors.push([]);
        }

        const newPassengers = this.passengersGenerator.generatePassengersIfNeeded();
        if (newPassengers){
            for (let pax of newPassengers)
                this.passengerByFloors[pax.originFloor].push(pax);
        }
    }

    getPassengersCount(floorIdx){
        if (floorIdx < 0 || floorIdx >= this.passengerByFloors.length)
            return 0;
        return this.passengerByFloors[floorIdx].length;
    }

} // class PassengersHandler
