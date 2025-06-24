import {ELEVATOR_DIRECTION, ELEVATOR_STATE} from './Enums.js';

export class ElevatorsEventHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    // basically to give orders to elevators
    onUpdateBefore(elevator){
        // random: 0.5% chance that a call is made.
        if (Math.random() < 0.005){ // TODO: it should be done by the generation of passengers...
            const nextFloor = this.parameterHandler.getRandomFloor();
            elevator.setNextDestinationFloor(nextFloor);
        }

        if (elevator.currentState() === ELEVATOR_STATE.WAITING){
            if (elevator.next_destination_floors.length > 0){
                elevator.destination_floor = elevator.next_destination_floors.shift();

                const calledFromCurrentFloor = Math.random() < 0.5; // TODO: it should be done by the generation of passengers...
                elevator.setCurrentState(calledFromCurrentFloor ? ELEVATOR_STATE.DOOR_OPENING : ELEVATOR_STATE.MOVING);
            }
        }
    }

    // basically to update numbers
    onUpdate(elevator){
        const state = elevator.currentState();
        if (state == ELEVATOR_STATE.MOVING){
            elevator.floor_position += this.parameterHandler.getElevatorSpeed() * elevator.directionSpeed();
        } else if (state == ELEVATOR_STATE.LOADING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.UNLOADING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_OPENING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_CLOSING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_OPENED){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_CLOSED){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.WAITING){
            // nothing to do
        } else {
            const msg = `Error occured in onUpdate() ${state}`;
            alert(msg, state);
        }
    }

    // basically to update state
    onUpdateAfter(elevator, passengersHandler){
        const state = elevator.currentState();
        if (state == ELEVATOR_STATE.WAITING)
            console.log('waiting', elevator.next_destination_floors)
        if (state == ELEVATOR_STATE.DOOR_OPENING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_OPENED);
        } else if (state == ELEVATOR_STATE.DOOR_OPENED){
            if (elevator.current_idle_time_remaining == 0){
                elevator.setCurrentState(ELEVATOR_STATE.UNLOADING);
                // TODO: determiner le nombre de passagers qui doivent descendre
                // TODO: calculer current_idle_time_remaining = (paxCount * idle time)
            }
        } else if (state == ELEVATOR_STATE.UNLOADING){
            if (elevator.current_idle_time_remaining == 0){
                elevator.setCurrentState(ELEVATOR_STATE.LOADING);
                // TODO: determiner le nombre de passagers qui doivent monter dans l'elevator
                // TODO: calculer current_idle_time_remaining = (paxCount * idle time)
            }
        } else if (state == ELEVATOR_STATE.LOADING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_CLOSING);
        } else if (state == ELEVATOR_STATE.DOOR_CLOSING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_CLOSED);
        } else if (state == ELEVATOR_STATE.DOOR_CLOSED){
            if (elevator.current_idle_time_remaining == 0){
                const mustMove = passengersHandler.hasPassengers(elevator) || elevator.destination_floor !== elevator.current_floor;
                elevator.setCurrentState(mustMove ? ELEVATOR_STATE.MOVING : ELEVATOR_STATE.WAITING);
            }
        } else if (state == ELEVATOR_STATE.MOVING){
            if (elevator.hasReachedDestFloor()){
                elevator.floor_position = this.parameterHandler.getPositionFromFloor(elevator.destination_floor);
                elevator.current_floor = elevator.destination_floor;
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_OPENING);
            }
        } else if (state == ELEVATOR_STATE.WAITING){
            // nothing to do
        } else {
            const msg = `Error occured in onUpdateAfter() ${state}`;
            alert(msg, state);
        }
    }
}; // class ElevatorsEventHandler