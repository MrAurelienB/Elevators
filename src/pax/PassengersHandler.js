
export class PassengersHandler {
    constructor(componentFactory){
        this.componentFactory = componentFactory;

        this.passengerWaitingByFloors = [];
        this.passengerByElevators = [];
    }

    update(){
        // remove / add floors
        const floorCount = this.componentFactory.parameterHandler.getFloorCount();
        if (this.passengerWaitingByFloors.length > floorCount)
           this.passengerWaitingByFloors.splice(floorCount);
        else if (this.passengerWaitingByFloors.length < floorCount){
            for (let i = 0; i < floorCount - this.passengerWaitingByFloors.length; i++)
                this.passengerWaitingByFloors.push([]);
        }

        const elevatorCount = this.componentFactory.parameterHandler.elevatorCount;
        if (this.passengerByElevators.length > elevatorCount)
           this.passengerByElevators.splice(elevatorCount);
        else if (this.passengerByElevators.length < elevatorCount){
            for (let i = 0; i < elevatorCount - this.passengerByElevators.length; i++)
                this.passengerByElevators.push([]);
        }

        const newPassengers = this.componentFactory.passengersGenerator.generatePassengersIfNeeded();
        if (newPassengers){
            for (let pax of newPassengers){
                if (pax.originFloorIdx < 0 || pax.originFloorIdx >= this.passengerWaitingByFloors.length)
                    continue;

                this.passengerWaitingByFloors[pax.originFloorIdx].push(pax);
            }
        }
    }

    getPassengersInElevator(elevator){
        if (elevator.uidx < 0 || elevator.uidx >= this.passengerByElevators.length)
            return false;
        return this.passengerByElevators[elevator.uidx].length;
    }

    getPassengersWaitingCount(floorIdx){
        if (floorIdx < 0 || floorIdx >= this.passengerWaitingByFloors.length)
            return 0;
        return this.passengerWaitingByFloors[floorIdx].length;
    }

    hasPassengers(elevator){
        return this.getPassengersInElevator(elevator) > 0;
    }

    mustPassengerBoardElevator(passenger, elevator){
        if (!this.componentFactory.parameterHandler.showElevatorDestination)
            return true; // passenger goes inside elevator no matter its direction
        else // passenger goes inside elevator only if it matches its direction
            return passenger.getDirection() === elevator.getDirection();
    }

    loadPassengers(elevator){
        const paxList = this.passengerToLoad(elevator);

        if (elevator.uidx < 0 || elevator.uidx >= this.passengerByElevators.length)
            return;

        const floorIdx = this.componentFactory.parameterHandler.getFloorIdx(elevator.current_floor);

        // TODO: faire en un seul filtre
        for (let passenger of paxList){
            this.passengerByElevators[elevator.uidx].push(passenger);
            this.passengerWaitingByFloors[floorIdx] = this.passengerWaitingByFloors[floorIdx].filter(pax => {
                return pax.uidx !== passenger.uidx;
            });
        }
    }

    passengersToUnload(elevator){
        if (elevator.uidx < 0 || elevator.uidx >= this.passengerByElevators.length)
            return [];

        let paxList = [];
        for (let pax of this.passengerByElevators[elevator.uidx]){
            if (pax.destinationFloorIdx === this.componentFactory.parameterHandler.getFloorIdx(elevator.current_floor))
                paxList.push(pax);
        }
        return paxList;
    }

    passengerToUnloadCount(elevator){
        const paxToUnload = this.passengersToUnload(elevator);
        return paxToUnload.length;
    }

    passengerToLoad(elevator){
        const current_floor_idx = this.componentFactory.parameterHandler.getFloorIdx(elevator.current_floor);
        if (current_floor_idx < 0 || current_floor_idx >= this.passengerWaitingByFloors.length)
            return [];

        let maxPaxToLoad = this.componentFactory.parameterHandler.elevatorCapacity - this.getPassengersInElevator(elevator);
        if (maxPaxToLoad <= 0)
            return [];

        let paxList = [];
        for (let pax of this.passengerWaitingByFloors[current_floor_idx]){
            if (maxPaxToLoad == 0)
                break;

            if (this.mustPassengerBoardElevator(pax, elevator)){
                paxList.push(pax);
                maxPaxToLoad -= 1;
            }
        }

        return paxList;
    }

    passengerToLoadCount(elevator){
        const paxList = this.passengerToLoad(elevator);
        return paxList.length;
    }

    unloadPassengers(elevator){
        const paxList = this.passengersToUnload(elevator);

        if (elevator.uidx < 0 || elevator.uidx >= this.passengerByElevators.length)
            return 0;

        // TODO: faire en un seul filtre
        for (let passenger of paxList){
            this.passengerByElevators[elevator.uidx] = this.passengerByElevators[elevator.uidx].filter(pax => {
                return pax.uidx !== passenger.uidx;
            });
        }

        return paxList.length;
    }

} // class PassengersHandler
