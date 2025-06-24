
export class StatsHandler {
    constructor(){
        this.floorTraveled = 0;
        this.passengerTransported = 0;
    }

    onElevatorReachedDestination(elevator){
        this.floorTraveled += Math.abs(elevator.current_floor - elevator.destination_floor);
    }

    onPassengerUnloaded(paxCount){
        this.passengerTransported += paxCount;
    }
} // StatsHandler
