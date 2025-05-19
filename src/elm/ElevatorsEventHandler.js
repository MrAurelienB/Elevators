import {ELEVATOR_DIRECTION, ELEVATOR_STATE} from './Enums.js';

export class ElevatorsEventHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    goToFloor(elevator, floor){
        elevator.destination_floor = floor;
        if (elevator.destination_floor != elevator.current_floor){
            elevator.current_state = ELEVATOR_STATE.MOVING;
            elevator.current_direction = elevator.destination_floor < elevator.current_floor ? ELEVATOR_DIRECTION.DOWN : ELEVATOR_DIRECTION.UP;
        }
    }

    // basically to give orders to elevators
    onUpdateBefore(elevator){
        // default behavior is to go up and down.
        if (elevator.isReadyToMove())
            this.goToFloor(elevator, this.parameterHandler.getRandomFloor());
    }

    // basically to update numbers
    onUpdate(elevator){
        const state = elevator.currentState();
        if (state == ELEVATOR_STATE.MOVING){
            elevator.floor_position += this.parameterHandler.getElevatorSpeed() * elevator.directionSpeed();
        } else if (state == ELEVATOR_STATE.WAITING){
            // TODO: il faudra gerer le unloading/loading
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.LOADING){
            // TODO: do nothing for now
        } else if (state == ELEVATOR_STATE.UNLOADING){
            // TODO: do nothing for now
        } else if (state == ELEVATOR_STATE.DOOR_OPENING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_CLOSING){
            elevator.current_idle_time_remaining -= 1;
        } else if (state == ELEVATOR_STATE.DOOR_OPENED){
            // TODO: do nothing for now
        } else if (state == ELEVATOR_STATE.DOOR_CLOSED){
            // TODO: do nothing for now
        } else {
            alert('error occured in onUpdate()', state);
        }
    }

    // basically to update state
    onUpdateAfter(elevator){
        const state = elevator.currentState();
        if (state == ELEVATOR_STATE.MOVING){
            if (elevator.hasReachedDestFloor()){
                elevator.floor_position = this.parameterHandler.getPositionFromFloor(elevator.destination_floor);
                elevator.current_floor = elevator.destination_floor;
                elevator.current_direction = ELEVATOR_DIRECTION.NONE;
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_OPENING);
            }
        } else if (state == ELEVATOR_STATE.WAITING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_CLOSING);
        } else if (state == ELEVATOR_STATE.LOADING){
            // TODO: do nothing for now
        } else if (state == ELEVATOR_STATE.UNLOADING){
            // TODO: do nothing for now
        } else if (state == ELEVATOR_STATE.DOOR_OPENING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_OPENED);
        } else if (state == ELEVATOR_STATE.DOOR_CLOSING){
            if (elevator.current_idle_time_remaining == 0)
                elevator.setCurrentState(ELEVATOR_STATE.DOOR_CLOSED);
        } else if (state == ELEVATOR_STATE.DOOR_OPENED){
            elevator.setCurrentState(ELEVATOR_STATE.WAITING);
        } else if (state == ELEVATOR_STATE.DOOR_CLOSED){
            // TODO: do nothing for now
        } else {
            alert('error occured in onUpdate()');
        }
    }
}; // class ElevatorsEventHandler