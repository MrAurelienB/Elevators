
export class PassengersHandler {
    constructor(parameterHandler, passengersGenerator){
        this.parameterHandler = parameterHandler;
        this.passengersGenerator = passengersGenerator;

        this.passengerWaitingByFloors = [];
        this.passengerByElevators = [];
    }

    update(){
        // remove / add floors
        const floorCount = this.parameterHandler.getFloorCount();
        if (this.passengerWaitingByFloors.length > floorCount)
           this.passengerWaitingByFloors.splice(floorCount);
        else if (this.passengerWaitingByFloors.length < floorCount){
            for (let i = 0; i < floorCount - this.passengerWaitingByFloors.length; i++)
                this.passengerWaitingByFloors.push([]);
        }

        const elevatorCount = this.parameterHandler.elevatorCount;
        if (this.passengerByElevators.length > elevatorCount)
           this.passengerByElevators.splice(elevatorCount);
        else if (this.passengerByElevators.length < elevatorCount){
            for (let i = 0; i < elevatorCount - this.passengerByElevators.length; i++)
                this.passengerByElevators.push([]);
        }

        const newPassengers = this.passengersGenerator.generatePassengersIfNeeded();
        if (newPassengers){
            for (let pax of newPassengers){
                if (pax.originFloorIdx < 0 || pax.originFloorIdx >= this.passengerWaitingByFloors.length)
                    continue;

                this.passengerWaitingByFloors[pax.originFloorIdx].push(pax);
            }
        }
    }

    getPassengersCount(floorIdx){
        if (floorIdx < 0 || floorIdx >= this.passengerWaitingByFloors.length)
            return 0;
        return this.passengerWaitingByFloors[floorIdx].length;
    }

    mustPassengerBoardElevator(passenger, elevator){
        return true; // by default, always
    }

    passengerBoardElevator(passenger, elevator){
        if (elevator.uidx < 0 || elevator.uidx >= this.passengerByElevators.length)
            return;

        this.passengerByElevators[elevator.uidx].push(passenger);

        this.passengerWaitingByFloors = this.passengerWaitingByFloors.filter(pax => {
            return pax.uidx !== passenger.uidx;
        });
    }

} // class PassengersHandler
